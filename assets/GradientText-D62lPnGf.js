import{r as i,j as u}from"./iframe-D1A6zj-g.js";const d=({text:r,colors:t=["#ff00cc","#cc00ff","#9900ff","#6600ff","#3333ff","#0066ff","#00ccff","#00ffff","#00ffcc","#00ff99","#00ff66","#00ff33","#ccff00","#ffff00","#ffcc00","#ff9900","#ff00cc"],speed:n="normal",fontSize:a="inherit",fontWeight:l="normal",className:o="",shadow:e={color:"rgba(0, 0, 0, 0.3)",blur:4,offsetX:2,offsetY:2,enabled:!1}})=>{const c=(f=>({"very-slow":40,slow:25,normal:15,fast:8,"very-fast":3})[f])(n);i.useEffect(()=>{const f=document.createElement("style");return f.textContent=`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `,document.head.append(f),()=>f.remove()},[]);const s={fontSize:a,fontWeight:l,backgroundImage:`linear-gradient(90deg, ${t.join(", ")})`,backgroundSize:`${t.length*200}% 100%`,animation:`gradientShift ${c}s linear infinite`,WebkitBackgroundClip:"text",backgroundClip:"text",MozBackgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",display:"inline-block",textShadow:e.enabled?`${e.offsetX}px ${e.offsetY}px ${e.blur}px ${e.color}`:"none"};return u.jsx("span",{className:`gradient-text ${o}`,style:s,"aria-label":r,children:r})};d.__docgenInfo={description:"",methods:[],displayName:"GradientText",props:{colors:{defaultValue:{value:`[\r
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
}`,computed:!1},required:!1}}};export{d as G};
