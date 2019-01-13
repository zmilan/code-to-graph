const { default: generate } = require("@babel/generator");
const fp = require("lodash/fp");

function makeIdFromAstNode(astNode) {
  return `statementfroml${astNode.loc.start.line}c${
    astNode.loc.start.column
  }tol${astNode.loc.end.line}c${astNode.loc.end.column}`;
}

function transformStatementSequenceToGraph(statements) {
  return fp.reduce(
    (
      { nodes, edges, entryNodes, exitNodes, breakNodes },
      {
        nodes: currentNodes,
        edges: currentEdges,
        entryNodes: currentEntryNodes,
        exitNodes: currentExitNodes,
        breakNodes: currentBreakNodes
      }
    ) => ({
      nodes: [...nodes, ...currentNodes],
      edges: fp.compact([
        ...edges,
        ...currentEdges,
        ...fp.flatten(
          fp.map(
            exitNode =>
              fp.map(
                entryNode => ({
                  from: exitNode.id,
                  to: entryNode.id,
                  name: "",
                  style: "solid",
                  arrow: true
                }),
                currentEntryNodes
              ),
            exitNodes
          )
        )
      ]),
      entryNodes: fp.isEmpty(entryNodes) ? currentEntryNodes : entryNodes,
      exitNodes: currentExitNodes,
      breakNodes: [...breakNodes, ...currentBreakNodes]
    }),
    { nodes: [], edges: [], entryNodes: [], exitNodes: [], breakNodes: [] },
    fp.map(transformStatementToGraph, statements)
  );
}

function transformStatementToGraph(statement) {
  switch (statement.type) {
    case "BlockStatement": {
      return transformStatementSequenceToGraph(statement.body);
    }
    case "VariableDeclaration": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: generate(statement).code,
        shape: "round"
      });
      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [node],
        breakNodes: []
      };
    }
    case "ExpressionStatement": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: generate(statement).code,
        shape: "round"
      });
      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [node],
        breakNodes: []
      };
    }
    case "EmptyStatement": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: `Empty statement at line ${statement.loc.start.line} column ${
          statement.loc.start.column
        }`,
        shape: "round"
      });
      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [node],
        breakNodes: []
      };
    }
    case "ReturnStatement": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: generate(statement).code,
        shape: "asymetric",
        style: { fill: "#99FF99" }
      });
      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [],
        breakNodes: []
      };
    }
    case "ThrowStatement": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: generate(statement).code,
        shape: "asymetric",
        style: { fill: "#FF9999" }
      });

      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [],
        breakNodes: []
      };
    }
    case "BreakStatement": {
      const node = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: generate(statement).code,
        shape: "square"
      });
      return {
        nodes: [node],
        edges: [],
        entryNodes: [node],
        exitNodes: [],
        breakNodes: [node]
      };
    }
    case "IfStatement": {
      const thisNode = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: `if ${generate(statement.test).code}`,
        shape: "rhombus"
      });
      const {
        nodes: consequentNodes,
        edges: consequentEdges,
        entryNodes: consequentEntryNodes,
        exitNodes: consequentExitNodes
      } = transformStatementToGraph(statement.consequent);
      const {
        nodes: alternateNodes,
        edges: alternateEdges,
        entryNodes: alternateEntryNodes,
        exitNodes: alternateExitNodes
      } = transformStatementToGraph(statement.alternate);

      const thisEdges = [
        ...fp.map(
          node => ({
            from: thisNode.id,
            to: node.id,
            name: "true",
            style: "solid",
            arrow: true
          }),
          consequentEntryNodes
        ),
        ...fp.map(
          node => ({
            from: thisNode.id,
            to: node.id,
            name: "false",
            style: "solid",
            arrow: true
          }),
          alternateEntryNodes
        )
      ];
      return {
        nodes: [thisNode, ...consequentNodes, ...alternateNodes],
        edges: [...thisEdges, ...consequentEdges, ...alternateEdges],
        entryNodes: [thisNode],
        exitNodes: [...consequentExitNodes, ...alternateExitNodes],
        breakNodes: []
      };
    }
    case "SwitchStatement": {
      const thisNode = cleanGraphNode({
        id: makeIdFromAstNode(statement),
        name: `switch ${generate(statement.discriminant).code} `,
        shape: "rhombus"
      });

      const scopeGraph = fp.reduce(
        (
          { nodes, edges, entryNodes, exitNodes, breakNodes },
          caseAstElement
        ) => {
          const {
            nodes: caseNodes,
            edges: caseEdges,
            entryNodes: caseEntryNodes,
            exitNodes: caseExitNodes,
            breakNodes: caseBreakNodes
          } = transformStatementSequenceToGraph(caseAstElement.consequent);
          const caseEntryEdges = fp.map(
            node => ({
              from: thisNode.id,
              to: node.id,
              name: fp.isEmpty(caseAstElement.test)
                ? "default"
                : generate(caseAstElement.test).code,
              style: "solid",
              arrow: true
            }),
            caseEntryNodes
          );
          const caseFollowEdges = fp.flatten(
            fp.map(
              exitNode =>
                fp.map(
                  entryNode => ({
                    from: exitNode.id,
                    to: entryNode.id,
                    name: "",
                    style: "solid",
                    arrow: true
                  }),
                  caseEntryNodes
                ),
              exitNodes
            )
          );
          // console.log("caseNodes", caseNodes);
          return {
            nodes: [...nodes, ...caseNodes],
            edges: fp.compact([
              ...edges,
              ...caseEdges,
              ...caseEntryEdges,
              ...caseFollowEdges
            ]),
            entryNodes: [...entryNodes],
            exitNodes: [...caseExitNodes],
            breakNodes: [...breakNodes, ...caseBreakNodes]
          };
        },
        {
          nodes: [thisNode],
          edges: [],
          entryNodes: [thisNode],
          exitNodes: [],
          breakNodes: []
        },
        statement.cases
      );

      return {
        nodes: [...scopeGraph.nodes],
        edges: [...scopeGraph.edges],
        entryNodes: [...scopeGraph.entryNodes],
        exitNodes: [...scopeGraph.breakNodes],
        breakNodes: []
      };
    }

    default:
      throw new Error(
        `Statements of type ${statement.type} are not yet supported`
      );
  }
}

function cleanGraphNode({ name, ...rest }) {
  return {
    ...rest,
    name: `"${fp.compose([
      // fp.replace(/(;)|(\n)|(\{)|(\})/g, ""),
      // fp.replace(/(===)|(==)/g, "=")
      fp.replace(/(\")/g, "'")
    ])(name)}"`
  };
}

module.exports = { transformStatementToGraph };
