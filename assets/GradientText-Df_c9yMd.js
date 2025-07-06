import{r as c,j as u}from"./iframe-DqfnGlCG.js";const d=({text:f,colors:n=["#ff00cc","#cc00ff","#9900ff","#6600ff","#3333ff","#0066ff","#00ccff","#00ffff","#00ffcc","#00ff99","#00ff66","#00ff33","#ccff00","#ffff00","#ffcc00","#ff9900","#ff00cc"],speed:a="normal",fontSize:r="inherit",fontWeight:l="normal",className:s="",shadow:e={color:"rgba(0, 0, 0, 0.3)",blur:4,offsetX:2,offsetY:2,enabled:!1}})=>{const o=(t=>({"very-slow":40,slow:25,normal:15,fast:8,"very-fast":3})[t])(a);c.useEffect(()=>{const t=document.createElement("style");return t.textContent=`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `,document.head.append(t),()=>t.remove()},[]);const i={fontSize:r,fontWeight:l,backgroundImage:`linear-gradient(90deg, ${n.join(", ")})`,backgroundSize:`${n.length*200}% 100%`,animation:`gradientShift ${o}s linear infinite`,WebkitBackgroundClip:"text",backgroundClip:"text",MozBackgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",display:"inline-block",textShadow:e.enabled?`${e.offsetX}px ${e.offsetY}px ${e.blur}px ${e.color}`:"none"};return u.jsx("span",{className:`gradient-text ${s}`,style:i,"aria-label":f,children:f})};d.__docgenInfo={description:"",methods:[],displayName:"GradientText",props:{text:{required:!0,tsType:{name:"string"},description:""},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:`[
  "#ff00cc",
  "#cc00ff",
  "#9900ff",
  "#6600ff",
  "#3333ff",
  "#0066ff",
  "#00ccff",
  "#00ffff",
  "#00ffcc",
  "#00ff99",
  "#00ff66",
  "#00ff33",
  "#ccff00",
  "#ffff00",
  "#ffcc00",
  "#ff9900",
  "#ff00cc",
]`,computed:!1}},speed:{required:!1,tsType:{name:"union",raw:"'very-slow' | 'slow' | 'normal' | 'fast' | 'very-fast'",elements:[{name:"literal",value:"'very-slow'"},{name:"literal",value:"'slow'"},{name:"literal",value:"'normal'"},{name:"literal",value:"'fast'"},{name:"literal",value:"'very-fast'"}]},description:"",defaultValue:{value:"'normal'",computed:!1}},fontSize:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"inherit"',computed:!1}},fontWeight:{required:!1,tsType:{name:'CSSProperties["fontWeight"]',raw:'CSSProperties["fontWeight"]'},description:"",defaultValue:{value:'"normal"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},shadow:{required:!1,tsType:{name:"ShadowConfig"},description:"",defaultValue:{value:`{
  color: "rgba(0, 0, 0, 0.3)",
  blur: 4,
  offsetX: 2,
  offsetY: 2,
  enabled: false,
}`,computed:!1}}}};export{d as G};
