(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{190:function(e,t,n){e.exports=n(455)},195:function(e,t,n){},455:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(179),i=n.n(r),l=(n(195),n(24)),s=n(25),c=n(27),d=n(26),u=n(28),h=(n(93),n(14)),m=n(189),f=n(54),p=n(180),g=n.n(p),b=n(21),x=n(22);function y(e,t,n){try{f.mermaidAPI.initialize({startOnLoad:!0}),f.mermaidAPI.parseError=function(e,t){},f.mermaidAPI.render(e,t,function(e){n({diagram:e,input:t})})}catch(a){console.log("Failed to generate diagram"),console.log(a)}}var v=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={diagram:{__html:""}},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;y(this.props.title,this.props.diagram,function(t){var n=t.diagram,a=t.input;e.setState({diagram:{__html:n},input:a})})}},{key:"shouldComponentUpdate",value:function(e,t){var n=this;return e.diagram!==this.props.diagram?(y(this.props.title,e.diagram,function(e){var t=e.diagram,a=e.input;n.setState({diagram:{__html:t},input:a})}),!1):t.diagram!==this.state.diagram}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{onClick:function(){var e=new Blob([document.getElementsByClassName("mermaid-code-to-graph")[0].innerHTML],{type:"image/svg+xml;charset=utf-8"});g.a.saveAs(e,"graph.svg")},style:{color:"white",borderRadius:"0",border:"none",outline:"none",backgroundColor:"#FF44FF",flexBasis:"30px",flexShrink:0,flexGrow:1,width:"100%",minHeight:"30px",zIndex:1}},o.a.createElement(b.a,{icon:x.a}),"    "," ","    ",(this.state.status,"Download SVG File")),o.a.createElement("div",{dangerouslySetInnerHTML:this.state.diagram,className:"mermaid-code-to-graph",style:Object(m.a)({display:"flex",alignItems:"center",justifyContent:"center"},this.props.style)}))}}]),t}(o.a.Component);v.defaultProps={title:"diagram",frameBorder:0};var w=v,S=n(181),k=n.n(S),E=n(182),j=n(183),O=n.n(j),C=(n(89),n(55)),F=n.n(C),B=n(188),D=(n(443),n(445),n(446),n(447),n(448),n(449),n(450),n(91)),I=n(185),G=n.n(I),z=function(e){var t=e.location;try{var n=t.search,a=G.a.parse(n).code;return{code:D.Base64.decode(a)}}catch(o){return console.log("Using default code"),{code:'const myFunction = (x) => {\n  if(x>0){\n    return "ok"\n  } else {\n    throw "not ok"\n  }\n}'}}},A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).onDrop=function(e,t){e.forEach(function(e){var t=new FileReader;t.onload=function(){var e=t.result;n.handleChange(e)},t.onabort=function(){return console.log("file reading was aborted")},t.onerror=function(){return console.log("file reading has failed")},t.readAsBinaryString(e)})},n.state={source:"graph TB; Init;",error:null,status:"init"},n.handleChange=n.handleChange.bind(Object(h.a)(Object(h.a)(n))),n.handleSubmitDirect=n.handleSubmitDirect.bind(Object(h.a)(Object(h.a)(n))),n.handleSubmit=k()(200,n.handleSubmitDirect).bind(Object(h.a)(Object(h.a)(n))),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){var t=D.Base64.encodeURI(e);this.props.history.push("./?code=".concat(t)),this.handleSubmit()}},{key:"handleSubmitDirect",value:function(){var e=this;setTimeout(function(){var t=z({location:e.props.location}).code;e.setState({source:"graph TB; Loading;",status:"loading"},function(){setTimeout(function(){try{var n=Object(E.transformJsStringToMermaidString)(t);e.setState({source:n,status:"loaded",error:null})}catch(a){e.setState({status:"error",error:a})}},0)})},0)}},{key:"componentDidMount",value:function(){try{var e=z({location:this.props.location}).code;this.handleChange(e)}catch(t){this.setState({status:"error",error:t})}}},{key:"render",value:function(){var e=this,t=z({location:this.props.location}).code;return o.a.createElement(B.a,{onDrop:this.onDrop},function(n){var a=n.getRootProps,r=n.getInputProps,i=n.isDragActive,l=r();return o.a.createElement("div",Object.assign({},a(),{onClick:void 0,style:{display:"flex",flexDirection:"row",height:"100vh",alignItems:"stretch",flexWrap:"wrap"}}),i?o.a.createElement("div",{style:{position:"absolute",color:"white",fontSize:"2em",display:"flex",alignItems:"center",justifyContent:"center",left:0,right:0,top:0,bottom:0,backgroundColor:"rgba(0,0,0,0.8)",zIndex:99999}},"Drop file anywhere"):null,o.a.createElement("div",{style:{flexBasis:"50%",flexShrink:1,flexGrow:1,height:"100%",display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"stretch"}},o.a.createElement(F.a,{mode:"javascript",theme:"monokai",onChange:e.handleChange,name:"code-ace-editor",editorProps:{$blockScrolling:!0},value:t,style:{flexBasis:"100vh",flexShrink:1,flexGrow:1,width:"100%"},setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,showLineNumbers:!0,tabSize:2}}),o.a.createElement("div",{style:{color:"white",borderRadius:"0",border:"none",outline:"none",backgroundColor:"#FF44FF",flexBasis:"30px",flexShrink:0,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",flexGrow:1,width:"100%",minHeight:"30px"}},o.a.createElement("span",{style:{fontSize:"11px",marginRight:"1em"}},o.a.createElement(b.a,{icon:x.e,style:{flexShrink:1,flexGrow:1}}),"   ","Drop code files anywhere or"),"   ",o.a.createElement("input",Object.assign({},l,{style:{color:"white",borderRadius:"0",border:"none",outline:"none",backgroundColor:"#FF44FF",flexBasis:"fit-content",flexShrink:1,flexGrow:0,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}})))),o.a.createElement("button",{onClick:e.handleSubmitDirect,style:{position:"relative",fontWeight:600,outline:"none",color:"white",fontSize:"1.2em",borderRadius:"100%",border:"none",backgroundColor:"#FF44FF",width:60,height:60,marginLeft:-30,marginRight:-30,alignSelf:"center",zIndex:9999}},"loading"!==e.state.status?o.a.createElement(b.a,{icon:x.b}):o.a.createElement(b.a,{icon:x.d,spin:!0})),null===e.state.error||void 0===e.state.error?o.a.createElement("div",{style:{flexBasis:"50%",flexShrink:1,flexGrow:0,height:"100%",display:"flex",flexDirection:"column"}},o.a.createElement(w,{diagram:e.state.source,style:{flexBasis:"80%",flexShrink:1,flexGrow:1}}),o.a.createElement("button",{onClick:function(){O()(e.state.source,{debug:!0,message:"Press #{key} to copy"}),e.setState({status:"copied"})},style:{color:"white",borderRadius:"0",border:"none",outline:"none",backgroundColor:"#FF44FF",flexBasis:"30px",flexShrink:0,flexGrow:1,width:"100%",minHeight:"30px"}},"copied"!==e.state.status?o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a,{icon:x.c}),"   ","Copy graph code to clipboard"):"Copied!"),o.a.createElement(F.a,{mode:"text",theme:"github",wrapEnabled:!1,readOnly:!0,name:"result-ace-editor",editorProps:{$blockScrolling:!0},value:e.state.source,style:{flexBasis:"20%",flexShrink:0,flexGrow:0,width:"100%",height:"20%"},setOptions:{enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,enableSnippets:!1,showLineNumbers:!1,tabSize:2}})):o.a.createElement("div",{style:{flexBasis:"50%",flexShrink:0,flexGrow:0,height:"100%",display:"flex",flexDirection:"column"}},o.a.createElement(F.a,{mode:"text",theme:"github",readOnly:!0,wrapEnabled:!0,name:"error-ace-editor",editorProps:{$blockScrolling:!0},value:e.state.error.message,style:{flexBasis:"100%",flexShrink:0,flexGrow:0,width:"100%",height:"100%",color:"red"},setOptions:{enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,enableSnippets:!1,showLineNumbers:!1,tabSize:2}})))})}}]),t}(a.Component),L=n(186),P=n.n(L),R=n(457),T=n(458),_=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(P.a,{href:"https://github.com/crubier/code-to-graph",style:{zIndex:20},svgStyle:{zIndex:20}}),o.a.createElement(R.a,null,o.a.createElement(T.a,{component:A})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},93:function(e,t,n){}},[[190,2,1]]]);
//# sourceMappingURL=main.24f52432.chunk.js.map