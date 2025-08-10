import{r as e,j as r}from"./iframe-BC7DeeL6.js";import{A as j}from"./Announce-BcX6v2AV.js";import{v as w,S as C}from"./index-RHBF0zT8.js";import{u as S,r as F}from"./index-BW6dIR7N.js";import{m as I,A as L}from"./proxy-CxheS_dW.js";import"./index-B_SPtptC.js";import"./index-Chjiymov.js";import"./index-BhlHwfix.js";import"./react-BJl0BmN6.js";const T=[["#667eea","#764ba2"],["#f093fb","#f5576c"],["#4facfe","#00f2fe"],["#43e97b","#38f9d7"],["#fa709a","#fee140"],["#a8edea","#fed6e3"],["#ff9a9e","#fecfef"],["#ffecd2","#fcb69f"],["#ff9a9e","#fad0c4"],["#a18cd1","#fbc2eb"],["#fad0c4","#ffd1ff"],["#ffecd2","#fcb69f"],["#ff9a9e","#fecfef"],["#a8edea","#fed6e3"],["#d299c2","#fef9d7"]];function k({message:t,onComplete:d}){const o=e.useRef(null),a=S(s=>s.parser),p=S(s=>s.parseToLink),h=e.useMemo(()=>{const s=Math.floor(Math.random()*T.length),[i,c]=T[s];return`linear-gradient(135deg, ${i} 0%, ${c} 100%)`},[]);e.useEffect(()=>(o.current=setTimeout(()=>{d()},8e3),()=>{o.current&&clearTimeout(o.current)}),[d]);const b=a&&p?F({text:t,parser:a,newParser:p}):t;return r.jsx(I.div,{initial:{x:400,opacity:0},animate:{x:0,opacity:1,boxShadow:["0 10px 30px rgba(0, 0, 0, 0.3)","0 15px 40px rgba(255, 255, 255, 0.4)","0 20px 50px rgba(0, 0, 0, 0.2)","0 15px 40px rgba(255, 255, 255, 0.4)","0 10px 30px rgba(0, 0, 0, 0.3)"]},exit:{x:400,opacity:0,scale:.8},transition:{type:"spring",stiffness:100,damping:20,duration:.5,boxShadow:{duration:1.5,repeat:1/0,ease:"easeInOut"}},style:{position:"absolute",top:"50%",right:"20px",transform:"translateY(-50%)",width:"350px",background:h,borderRadius:"15px",padding:"20px",color:"white",fontFamily:'"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',fontWeight:600,fontSize:"16px",lineHeight:1.4,textAlign:"center",border:"2px solid rgba(255, 255, 255, 0.2)",overflow:"visible",whiteSpace:"break-spaces",zIndex:1e3},children:r.jsxs("div",{style:{wordWrap:"break-word",hyphens:"auto",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)",margin:0,padding:0,fontWeight:700},children:[b,r.jsx("style",{children:`
          .emote {
            display: inline-block !important;
            vertical-align: middle !important;
            height: 1.2em !important;
            width: auto !important;
            margin: 0 2px !important;
            border-radius: 4px !important;
            transition: all 0.3s ease !important;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) !important;
            animation: emoteFloat 2s ease-in-out infinite !important;
          }
          
          .emote:hover {
            transform: scale(1.1) rotate(5deg) !important;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) brightness(1.1) !important;
          }
          
          @keyframes emoteFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2px);
            }
          }
        `})]})})}k.__docgenInfo={description:"",methods:[],displayName:"AutoMessageAlert",props:{message:{required:!0,tsType:{name:"string"},description:""},onComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function A({messages:t}){const[d,o]=e.useState([]),[a,p]=e.useState(null),[h,b]=e.useState(!1),s=e.useRef(null),i=e.useRef(!1);e.useEffect(()=>{if(t&&t.length>0){const n=t.map(m=>({id:w(),message:m,timestamp:Date.now()}));o(n)}},[t]);const c=e.useCallback(()=>{i.current||o(n=>{if(n.length===0)return n;i.current=!0;const m=n[0];return p(m),s.current=setTimeout(()=>{p(null),i.current=!1,setTimeout(()=>{c()},2e3)},8e3),n.slice(1)})},[]);e.useEffect(()=>{d.length>0&&!a&&!i.current&&c()},[d.length,a,c]);const M=e.useCallback(n=>{if(t)return;const m={id:w(),message:n,timestamp:Date.now()};o(E=>{const y=[...E,m];return y.length>10?y.slice(-10):y})},[t]),R=e.useCallback(()=>{p(null),i.current=!1,s.current&&(clearTimeout(s.current),s.current=null),setTimeout(()=>{c()},2e3)},[c]);return C.useSignalREffect("AutoMessage",M,[M]),e.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]),r.jsxs(r.Fragment,{children:[!h&&r.jsx(j,{title:"AutoMessage",callback:()=>b(!0)}),r.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:1e3,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:r.jsx(L,{mode:"wait",children:a&&r.jsx(k,{message:a.message,onComplete:R},a.id)})})]})}A.__docgenInfo={description:"",methods:[],displayName:"AutoMessageBillboard",props:{messages:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""}}};const H={title:"OBS Components/AutoMessageBillboard",component:A,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{}},v=["Привет всем! Как дела?","Не забудьте подписаться на канал!","Спасибо за поддержку!","Сегодня отличный день для стрима!","Донатеры - вы лучшие!"],u={args:{messages:v},parameters:{docs:{description:{story:"Компонент показывает сообщения по одному с задержкой 2 секунды между ними. Сообщения вылетают справа по центру экрана."}}}},l={args:{messages:v},parameters:{docs:{description:{story:"Компонент для отображения автоматических сообщений в виде билборда, вылетающего справа по центру экрана. Показывает только одно сообщение за раз с очередью."}}}},f={args:{messages:["Kappa это круто!","PogChamp момент!","FeelsGoodMan","monkaS","LUL","PepeHands"]},parameters:{docs:{description:{story:"Демонстрация работы компонента с поддержкой эмодзи 7TV, BTTV, FFZ и Twitch. Эмодзи отображаются как изображения."}}}},g={args:{messages:["Это очень длинное сообщение, которое может содержать много текста и проверяет, как компонент обрабатывает перенос строк","Короткое сообщение","Еще одно длинное сообщение с множеством слов и деталей, чтобы проверить адаптивность компонента","Финальное сообщение"]},parameters:{docs:{description:{story:"Демонстрация работы с длинными сообщениями. Компонент автоматически переносит текст и адаптируется под размер."}}}},x={args:{},parameters:{docs:{description:{story:"Режим для реального использования через SignalR. Сообщения будут приходить с сервера."}}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    messages: mockMessages
  },
  parameters: {
    docs: {
      description: {
        story: "Компонент показывает сообщения по одному с задержкой 2 секунды между ними. Сообщения вылетают справа по центру экрана."
      }
    }
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    messages: mockMessages
  },
  parameters: {
    docs: {
      description: {
        story: "Компонент для отображения автоматических сообщений в виде билборда, вылетающего справа по центру экрана. Показывает только одно сообщение за раз с очередью."
      }
    }
  }
}`,...l.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    messages: ["Kappa это круто!", "PogChamp момент!", "FeelsGoodMan", "monkaS", "LUL", "PepeHands"]
  },
  parameters: {
    docs: {
      description: {
        story: "Демонстрация работы компонента с поддержкой эмодзи 7TV, BTTV, FFZ и Twitch. Эмодзи отображаются как изображения."
      }
    }
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    messages: ["Это очень длинное сообщение, которое может содержать много текста и проверяет, как компонент обрабатывает перенос строк", "Короткое сообщение", "Еще одно длинное сообщение с множеством слов и деталей, чтобы проверить адаптивность компонента", "Финальное сообщение"]
  },
  parameters: {
    docs: {
      description: {
        story: "Демонстрация работы с длинными сообщениями. Компонент автоматически переносит текст и адаптируется под размер."
      }
    }
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Режим для реального использования через SignalR. Сообщения будут приходить с сервера."
      }
    }
  }
}`,...x.parameters?.docs?.source}}};const N=["Default","WithMockMessages","WithEmotes","LongMessages","SignalRMode"];export{u as Default,g as LongMessages,x as SignalRMode,f as WithEmotes,l as WithMockMessages,N as __namedExportsOrder,H as default};
