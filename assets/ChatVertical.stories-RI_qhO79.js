import{r as p,j as s}from"./iframe-B_oz8dKo.js";import{S as C}from"./v4-BBZMrhdn.js";import{A as v}from"./Announce-CIliHre1.js";import{S as w,a as R,F as B,M as I}from"./Message-ogbYQH8x.js";import{A as _,m as D}from"./proxy-v4XVXOnf.js";import{c as q}from"./testMessageUtils-2nqLNjTs.js";import"./index-BU3mIPC_.js";import"./animate.module-CI42XwLX.js";import"./index-P3iobJrg.js";import"./GradientText-ZL1yfK3Q.js";import"./baza-BnLwLixe.js";const j="_chatContainer_11kht_1",E={chatContainer:j};function M({messages:t,onRemoveMessage:l}){const[m,i]=p.useState([]),[u,g]=p.useState(!1),h=t!==void 0?t:m,d=l||(e=>{i(f=>f.filter(a=>a.id!==e))}),[r,n]=p.useState(0);p.useEffect(()=>{h.length>0&&n(e=>e+1)},[h.length]);const c=p.useRef(null);p.useEffect(()=>{const e=setTimeout(()=>{c.current&&c.current.scrollIntoView(w)},R);return()=>clearTimeout(e)},[h.length]),C.useSignalREffect("NewMessage",(e,f)=>{if(t)return null;f.id??=e,i(a=>{for(;a.length>=15;)a.pop();return a.find(T=>T.id===f.id)?a:[f,...a]})},[]);const x=e=>{i(f=>f.map(a=>a.id===e?{...a,_pendingRemove:!0}:a))};return C.useSignalREffect("deletemessage",e=>{x(e)},[]),s.jsxs(s.Fragment,{children:[!u&&s.jsx(v,{title:"Chat Vertical",callback:()=>g(!0)}),s.jsx("div",{className:E.chatContainer,children:s.jsx(_,{initial:!1,children:m.map(e=>s.jsx(D.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0,scale:r?[1,1.05,1]:1},exit:{opacity:0,y:-40},transition:B,layout:!0,children:s.jsx(I,{message:e,onRemove:e._pendingRemove?()=>d(e.id):void 0})},e.id))})}),s.jsx("div",{ref:c})]})}M.__docgenInfo={description:"",methods:[],displayName:"ChatVertical",props:{messages:{required:!1,tsType:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},description:""},onRemoveMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};function S({children:t}){const[l,m]=p.useState([]),[i,u]=p.useState(0),g=()=>{const d=q("demo",i);d.forEach((r,n)=>{setTimeout(()=>{m(c=>{for(;c.length>=15;)c.pop();return c.find(x=>x.id===r.id)?c:[r,...c]})},n*300)}),u(r=>r+d.length)},h=d=>{m(r=>r.filter(n=>n.id!==d))};return s.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[s.jsx("button",{onClick:g,style:{position:"absolute",top:"20px",right:"20px",zIndex:1e3,padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px"},children:"Generate Messages"}),t(l,h)]})}S.__docgenInfo={description:"",methods:[],displayName:"MessageManager",props:{children:{required:!0,tsType:{name:"signature",type:"function",raw:`(\r
  messages: ChatMessage[],\r
  removeMessage: (id: string) => void,\r
) => React.ReactNode`,signature:{arguments:[{type:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},name:"messages"},{type:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},name:"removeMessage"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};const{expect:o}=__STORYBOOK_MODULE_TEST__,z={title:"Chat/ChatVertical",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Вертикальный чат с сообщениями, которые появляются снизу и исчезают сверху."}}},tags:["autodocs"],decorators:[t=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(t,{})})]},y={render:()=>s.jsx(S,{children:(t,l)=>s.jsx(M,{messages:t,onRemoveMessage:l})}),play:async({canvasElement:t})=>{await new Promise(n=>setTimeout(n,100)),o(t).toBeInTheDocument();const l=t.querySelector('[class*="chatContainer"]');o(l).toBeInTheDocument();const m=window.getComputedStyle(l);o(m.display).toBe("flex"),o(m.flexDirection).toBe("column-reverse");const i=t.querySelector("button");o(i).toBeInTheDocument(),o(i).toHaveTextContent("Generate Messages"),i?.click(),await new Promise(n=>setTimeout(n,1500));let u=t.querySelectorAll('[class*="container"]');u.length===0&&(await new Promise(n=>setTimeout(n,1e3)),u=t.querySelectorAll('[class*="container"]')),o(u.length).toBeGreaterThan(0);const g=u[0];o(g.className).toContain("container");const h=g.querySelector('[class*="left"]');o(h).toBeInTheDocument();const d=g.querySelector('[class*="right"]');o(d).toBeInTheDocument();const r=g.querySelector('[class*="nickname"]');o(r).toBeInTheDocument()}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};const H=["Default"];export{y as Default,H as __namedExportsOrder,z as default};
