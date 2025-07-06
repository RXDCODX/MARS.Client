import{r as m,j as s}from"./iframe-Cc9wzQT7.js";import{w as R,e as o}from"./index-BnesSBbZ.js";import{S as v}from"./v4-Bi0dVoRz.js";import{A as q}from"./Announce-BmbYK6Ie.js";import{M as D}from"./Message-DsGPR0zs.js";import{A as I,m as j}from"./proxy-DgGD-yJK.js";import{c as P}from"./testMessageUtils-2nqLNjTs.js";import"./index-D9M-HuQA.js";import"./index-B9TlbZJD.js";import"./GradientText-bRXrQhKi.js";import"./animate.module-CI42XwLX.js";import"./baza-BnLwLixe.js";const k="_chatContainer_11kht_1",A={chatContainer:k};function M({messages:e,onRemoveMessage:u}){const[y,n]=m.useState([]),[g,d]=m.useState(!1),p=e!==void 0?e:y,h=u||(t=>{n(i=>i.filter(c=>c.id!==t))}),[r,a]=m.useState(0);m.useEffect(()=>{p.length>0&&a(t=>t+1)},[p.length]);const f=m.useRef(null);return m.useEffect(()=>{const t=setTimeout(()=>{var i;(i=f.current)==null||i.scrollIntoView({behavior:"smooth"})},250);return()=>clearTimeout(t)},[p.length]),m.useEffect(()=>{if(!e){v.useSignalREffect("newmessage",(i,c)=>{c.id??(c.id=i),n(l=>{for(;l.length>=15;)l.pop();return l.find(B=>B.id===c.id)?l:[c,...l]})},[]);const t=i=>{n(c=>c.map(l=>l.id===i?{...l,_pendingRemove:!0}:l))};v.useSignalREffect("deletemessage",i=>{t(i)},[])}},[e]),s.jsxs(s.Fragment,{children:[!g&&s.jsx(q,{title:"Chat Vertical",callback:()=>d(!0)}),s.jsx("div",{className:A.chatContainer,children:s.jsx(I,{initial:!1,children:p.map(t=>s.jsx(j.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0,scale:r?[1,1.05,1]:1},exit:{opacity:0,y:-40},transition:{type:"spring",stiffness:300,damping:30,scale:{duration:.3}},layout:!0,children:s.jsx(D,{message:t,onRemove:t._pendingRemove?()=>h(t.id):void 0})},t.id))})}),s.jsx("div",{ref:f})]})}M.__docgenInfo={description:"",methods:[],displayName:"ChatVertical",props:{messages:{required:!1,tsType:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},description:""},onRemoveMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};function T({children:e}){const[u,y]=m.useState([]),[n,g]=m.useState(0),d=()=>{const h=P("demo",n);h.forEach((r,a)=>{setTimeout(()=>{y(f=>{for(;f.length>=15;)f.pop();return f.find(t=>t.id===r.id)?f:[r,...f]})},a*300)}),g(r=>r+h.length)},p=h=>{y(r=>r.filter(a=>a.id!==h))};return s.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[s.jsx("button",{onClick:d,style:{position:"absolute",top:"20px",right:"20px",zIndex:1e3,padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px"},children:"Generate Messages"}),e(u,p)]})}T.__docgenInfo={description:"",methods:[],displayName:"MessageManager",props:{children:{required:!0,tsType:{name:"signature",type:"function",raw:"(messages: ChatMessage[], removeMessage: (id: string) => void) => React.ReactNode",signature:{arguments:[{type:{name:"Array",elements:[{name:"ChatMessage"}],raw:"ChatMessage[]"},name:"messages"},{type:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},name:"removeMessage"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};const L={title:"Chat/ChatVertical",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Вертикальный чат с сообщениями, которые появляются снизу и исчезают сверху."}}},tags:["autodocs"],decorators:[e=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(e,{})})]},x={render:()=>s.jsx(T,{children:(e,u)=>s.jsx(M,{messages:e,onRemoveMessage:u})}),play:async({canvasElement:e})=>{R(e),await new Promise(a=>setTimeout(a,100)),o(e).toBeInTheDocument();const u=e.querySelector('[class*="chatContainer"]');o(u).toBeInTheDocument();const y=window.getComputedStyle(u);o(y.display).toBe("flex"),o(y.flexDirection).toBe("column-reverse");const n=e.querySelector("button");o(n).toBeInTheDocument(),o(n).toHaveTextContent("Generate Messages"),n==null||n.click(),await new Promise(a=>setTimeout(a,1500));let g=e.querySelectorAll('[class*="container"]');g.length===0&&(await new Promise(a=>setTimeout(a,1e3)),g=e.querySelectorAll('[class*="container"]')),o(g.length).toBeGreaterThan(0);const d=g[0];o(d.className).toContain("container");const p=d.querySelector('[class*="left"]');o(p).toBeInTheDocument();const h=d.querySelector('[class*="right"]');o(h).toBeInTheDocument();const r=d.querySelector('[class*="nickname"]');o(r).toBeInTheDocument()}};var w,C,S;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <MessageManager>\r
      {(messages, removeMessage) => <ChatVertical messages={messages} onRemoveMessage={removeMessage} />}\r
    </MessageManager>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем контейнер чата
    const chatContainer = canvasElement.querySelector('[class*="chatContainer"]');
    expect(chatContainer).toBeInTheDocument();

    // Проверяем стили контейнера
    const containerStyle = window.getComputedStyle(chatContainer!);
    expect(containerStyle.display).toBe('flex');
    expect(containerStyle.flexDirection).toBe('column-reverse');

    // Проверяем наличие кнопки генерации
    const generateButton = canvasElement.querySelector('button');
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toHaveTextContent('Generate Messages');

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
    expect(firstMessage.className).toContain('container');

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
}`,...(S=(C=x.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};const Q=["Default"];export{x as Default,Q as __namedExportsOrder,L as default};
