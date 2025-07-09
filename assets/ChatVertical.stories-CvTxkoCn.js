import{r as h,j as s}from"./iframe-DP1K2Eq5.js";import{S as v}from"./v4-BZBaoDxX.js";import{A as R}from"./Announce-DLRLhSY5.js";import{M as D}from"./Message-B-LOZECQ.js";import{A as q,m as I}from"./proxy-BzZOX4vW.js";import{c as _}from"./testMessageUtils-2nqLNjTs.js";import"./index-y9Nr13TW.js";import"./animate.module-CI42XwLX.js";import"./index-CBKuLTKt.js";import"./GradientText-BZeitbZ8.js";import"./baza-BnLwLixe.js";const j="_chatContainer_11kht_1",P={chatContainer:j};function M({messages:t,onRemoveMessage:l}){const[m,a]=h.useState([]),[u,g]=h.useState(!1),f=t!==void 0?t:m,d=l||(e=>{a(n=>n.filter(r=>r.id!==e))}),[c,o]=h.useState(0);h.useEffect(()=>{f.length>0&&o(e=>e+1)},[f.length]);const p=h.useRef(null);h.useEffect(()=>{const e=setTimeout(()=>{var n;(n=p.current)==null||n.scrollIntoView({behavior:"smooth"})},250);return()=>clearTimeout(e)},[f.length]),v.useSignalREffect("NewMessage",(e,n)=>{if(t)return null;n.id??(n.id=e),a(r=>{for(;r.length>=15;)r.pop();return r.find(B=>B.id===n.id)?r:[n,...r]})},[]);const x=e=>{a(n=>n.map(r=>r.id===e?{...r,_pendingRemove:!0}:r))};return v.useSignalREffect("deletemessage",e=>{x(e)},[]),s.jsxs(s.Fragment,{children:[!u&&s.jsx(R,{title:"Chat Vertical",callback:()=>g(!0)}),s.jsx("div",{className:P.chatContainer,children:s.jsx(q,{initial:!1,children:m.map(e=>s.jsx(I.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0,scale:c?[1,1.05,1]:1},exit:{opacity:0,y:-40},transition:{type:"spring",stiffness:300,damping:30,scale:{duration:.3}},layout:!0,children:s.jsx(D,{message:e,onRemove:e._pendingRemove?()=>d(e.id):void 0})},e.id))})}),s.jsx("div",{ref:p})]})}M.__docgenInfo={description:"",methods:[],displayName:"ChatVertical",props:{messages:{required:!1,tsType:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},description:""},onRemoveMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};function T({children:t}){const[l,m]=h.useState([]),[a,u]=h.useState(0),g=()=>{const d=_("demo",a);d.forEach((c,o)=>{setTimeout(()=>{m(p=>{for(;p.length>=15;)p.pop();return p.find(x=>x.id===c.id)?p:[c,...p]})},o*300)}),u(c=>c+d.length)},f=d=>{m(c=>c.filter(o=>o.id!==d))};return s.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[s.jsx("button",{onClick:g,style:{position:"absolute",top:"20px",right:"20px",zIndex:1e3,padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px"},children:"Generate Messages"}),t(l,f)]})}T.__docgenInfo={description:"",methods:[],displayName:"MessageManager",props:{children:{required:!0,tsType:{name:"signature",type:"function",raw:`(\r
  messages: ChatMessage[],\r
  removeMessage: (id: string) => void,\r
) => React.ReactNode`,signature:{arguments:[{type:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},name:"messages"},{type:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},name:"removeMessage"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};const{expect:i}=__STORYBOOK_MODULE_TEST__,H={title:"Chat/ChatVertical",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Вертикальный чат с сообщениями, которые появляются снизу и исчезают сверху."}}},tags:["autodocs"],decorators:[t=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(t,{})})]},y={render:()=>s.jsx(T,{children:(t,l)=>s.jsx(M,{messages:t,onRemoveMessage:l})}),play:async({canvasElement:t})=>{await new Promise(o=>setTimeout(o,100)),i(t).toBeInTheDocument();const l=t.querySelector('[class*="chatContainer"]');i(l).toBeInTheDocument();const m=window.getComputedStyle(l);i(m.display).toBe("flex"),i(m.flexDirection).toBe("column-reverse");const a=t.querySelector("button");i(a).toBeInTheDocument(),i(a).toHaveTextContent("Generate Messages"),a==null||a.click(),await new Promise(o=>setTimeout(o,1500));let u=t.querySelectorAll('[class*="container"]');u.length===0&&(await new Promise(o=>setTimeout(o,1e3)),u=t.querySelectorAll('[class*="container"]')),i(u.length).toBeGreaterThan(0);const g=u[0];i(g.className).toContain("container");const f=g.querySelector('[class*="left"]');i(f).toBeInTheDocument();const d=g.querySelector('[class*="right"]');i(d).toBeInTheDocument();const c=g.querySelector('[class*="nickname"]');i(c).toBeInTheDocument()}};var S,C,w;y.parameters={...y.parameters,docs:{...(S=y.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <MessageManager>\r
      {(messages, removeMessage) => <ChatVertical messages={messages} onRemoveMessage={removeMessage} />}\r
    </MessageManager>,
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем контейнер чата
    const chatContainer = canvasElement.querySelector('[class*="chatContainer"]');
    expect(chatContainer).toBeInTheDocument();

    // Проверяем стили контейнера
    const containerStyle = window.getComputedStyle(chatContainer!);
    expect(containerStyle.display).toBe("flex");
    expect(containerStyle.flexDirection).toBe("column-reverse");

    // Проверяем наличие кнопки генерации
    const generateButton = canvasElement.querySelector("button");
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toHaveTextContent("Generate Messages");

    // Нажимаем кнопку для генерации сообщений
    generateButton?.click();

    // Ждем появления сообщений
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Проверяем, что сообщения появились
    let messages = canvasElement.querySelectorAll('[class*="container"]');

    // Если сообщения еще не появились, ждем еще немного
    if (messages.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      messages = canvasElement.querySelectorAll('[class*="container"]');
    }
    expect(messages.length).toBeGreaterThan(0);

    // Проверяем структуру первого сообщения
    const firstMessage = messages[0];
    expect(firstMessage.className).toContain("container");

    // Проверяем наличие левой части (никнейм и бейджи)
    const leftPart = firstMessage.querySelector('[class*="left"]');
    expect(leftPart).toBeInTheDocument();

    // Проверяем наличие правой части (текст сообщения)
    const rightPart = firstMessage.querySelector('[class*="right"]');
    expect(rightPart).toBeInTheDocument();

    // Проверяем никнейм
    const nickname = firstMessage.querySelector('[class*="nickname"]');
    expect(nickname).toBeInTheDocument();
  }
}`,...(w=(C=y.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};const J=["Default"];export{y as Default,J as __namedExportsOrder,H as default};
