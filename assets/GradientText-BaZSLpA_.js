import{r as d,j as o}from"./iframe-Bw5_no3n.js";const p=({text:r,children:t,colors:n=["#ff00cc","#cc00ff","#9900ff","#6600ff","#3333ff","#0066ff","#00ccff","#00ffff","#00ffcc","#00ff99","#00ff66","#00ff33","#ccff00","#ffff00","#ffcc00","#ff9900","#ff00cc"],speed:s="normal",fontSize:c="inherit",fontWeight:i="normal",className:a="",shadow:e={color:"rgba(0, 0, 0, 0.3)",blur:4,offsetX:2,offsetY:2,enabled:!1}})=>{const u=(f=>({"very-slow":40,slow:25,normal:15,fast:8,"very-fast":3})[f])(s);d.useEffect(()=>{const f=document.createElement("style");return f.textContent=`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `,document.head.append(f),()=>f.remove()},[]);const l={fontSize:c,fontWeight:i,backgroundImage:`linear-gradient(90deg, ${n.join(", ")})`,backgroundSize:`${n.length*200}% 100%`,animation:`gradientShift ${u}s linear infinite`,WebkitBackgroundClip:"text",backgroundClip:"text",MozBackgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",display:"inline-flex",alignItems:"center",textShadow:e.enabled?`${e.offsetX}px ${e.offsetY}px ${e.blur}px ${e.color}`:"none"};return typeof r=="string"&&!t?o.jsx("span",{className:`gradient-text ${a}`,style:l,"aria-label":r,children:r}):o.jsx("span",{className:`gradient-text ${a}`,style:l,children:t})};p.__docgenInfo={description:"",methods:[],displayName:"GradientText",props:{colors:{defaultValue:{value:`[\r
  "#ff00cc",\r
  "#cc00ff",\r
  "#9900ff",\r
  "#6600ff",\r
  "#3333ff",\r
  "#0066ff",\r
  "#00ccff",\r
  "#00ffff",\r
  "#00ffcc",\r
  "#00ff99",\r
  "#00ff66",\r
  "#00ff33",\r
  "#ccff00",\r
  "#ffff00",\r
  "#ffcc00",\r
  "#ff9900",\r
  "#ff00cc",\r
]`,computed:!1},required:!1},speed:{defaultValue:{value:'"normal"',computed:!1},required:!1},fontSize:{defaultValue:{value:'"inherit"',computed:!1},required:!1},fontWeight:{defaultValue:{value:'"normal"',computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1},shadow:{defaultValue:{value:`{\r
  color: "rgba(0, 0, 0, 0.3)",\r
  blur: 4,\r
  offsetX: 2,\r
  offsetY: 2,\r
  enabled: false,\r
}`,computed:!1},required:!1}}};export{p as G};
