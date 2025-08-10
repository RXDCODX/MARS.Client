import{r as S,j as l}from"./iframe-DfjFra_E.js";import"./SignalRHubWrapper-BMh2Frid.js";import{C as c,a as M}from"./data-contracts-97ndRDDy.js";import{M as v}from"./Message-uQNYCKUj.js";import"./index-eIvpPVhI.js";import"./animate.module-CI42XwLX.js";import"./index-DDUjKJzf.js";import"./index-73zqftOg.js";import"./index-Chjiymov.js";import"./index-oSaGBWdX.js";import"./react-dRZq-Y5g.js";import"./GradientText-DVW52kod.js";const{expect:s}=__STORYBOOK_MODULE_TEST__,H={title:"Stream Components/ChatVertical/Message",component:v,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение вертикального чата с анимацией появления."}}},tags:["autodocs"],argTypes:{message:{control:"object"},onRemove:{action:"message removed"}}},u={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:M.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:c.Viewer,username:void 0};function g(o,e){return Math.floor(Math.random()*(e-o+1))+o}const f=["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff","#ffa500","#800080","#008000","#000000"],h=["Alice","Bob","Charlie","Diana","Eve","Frank","Grace","Heidi","Ivan","Judy","Mallory","Niaj","Olivia","Peggy","Rupert","Sybil","Trent","Victor","Walter","Zara"],y=["Привет!","Как дела?","Это тестовое сообщение.","Всем хорошего дня!","Проверка связи.","Случайный текст.","Вау, круто!","Что нового?","Погода отличная!","Ура!","Тестируем чат.","Смайлик 😊","Ссылка: https://twitch.tv/rxdcodx","VIP тут!","Модератор на месте.","Бот активен.","Пользователь подключился.","Проверка цвета.","Случайный ник.","Рандомный текст.","Последнее сообщение!"];function b(o){return Array.from({length:o},(e,r)=>{const a=Math.random()<.2,t=!a&&Math.random()<.2,i=!a&&!t&&Math.random()<.1,n=f[g(0,f.length-1)],p=h[g(0,h.length-1)]+(r+1),x=y[g(0,y.length-1)];return{...u,id:`${Date.now()}_${r}_${Math.random().toString(36).slice(2,8)}`,message:x,displayName:p,colorHex:n,isVip:a,isModerator:t,isBroadcaster:i,userType:i?c.Broadcaster:t?c.Moderator:a?c.Viewer:c.Viewer,color:{...u.color,r:parseInt(n.slice(1,3),16),g:parseInt(n.slice(3,5),16),b:parseInt(n.slice(5,7),16)}}})}const m={args:{message:u,onRemove:()=>console.log("Message removed")},play:async({canvasElement:o})=>{await new Promise(p=>setTimeout(p,100)),s(o).toBeInTheDocument();const e=o.querySelector('[class*="container"]');s(e).toBeInTheDocument();const r=e?.querySelector('[class*="left"]');s(r).toBeInTheDocument();const a=e?.querySelector('[class*="right"]');s(a).toBeInTheDocument();const t=e?.querySelector('[class*="nickname"]');s(t).toBeInTheDocument(),s(t).toHaveTextContent("TestUser");const i=window.getComputedStyle(t);s(i.color).toBe("rgb(255, 0, 0)");const n=window.getComputedStyle(e);s(n.display).toBe("flex"),s(n.minHeight).toBe("60px"),s(e.className).toContain("container"),s(e.className).toContain("animated")}},d={render:()=>{const[o,e]=S.useState([]),r=()=>{e(b(20))},a=t=>{e(i=>i.filter(n=>n.id!==t))};return l.jsxs("div",{style:{position:"relative",width:"100%",minHeight:300},children:[l.jsx("button",{style:{position:"absolute",top:20,right:20,zIndex:1e3,padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px"},onClick:r,children:"Сгенерировать 20 сообщений"}),l.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:60},children:o.map(t=>l.jsx(v,{message:t,onRemove:()=>a(t.id)},t.id))})]})},parameters:{docs:{description:{story:"Генератор 20 случайных сообщений с разными параметрами. Кнопка в правом верхнем углу генерирует новые сообщения."}}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    message: defaultMessage,
    onRemove: () => console.log("Message removed")
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем структуру сообщения
    const messageElement = canvasElement.querySelector('[class*="container"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем левую часть (никнейм и бейджи)
    const leftPart = messageElement?.querySelector('[class*="left"]');
    expect(leftPart).toBeInTheDocument();

    // Проверяем правую часть (текст сообщения)
    const rightPart = messageElement?.querySelector('[class*="right"]');
    expect(rightPart).toBeInTheDocument();

    // Проверяем никнейм
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toBeInTheDocument();
    expect(nickname).toHaveTextContent("TestUser");

    // Проверяем цвет никнейма
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(255, 0, 0)");

    // Проверяем стили контейнера
    const containerStyle = window.getComputedStyle(messageElement!);
    expect(containerStyle.display).toBe("flex");
    expect(containerStyle.minHeight).toBe("60px");

    // Проверяем, что элемент имеет нужные классы
    expect(messageElement!.className).toContain("container");
    expect(messageElement!.className).toContain("animated");
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const handleGenerate = () => {
      setMessages(generateRandomMessages(20));
    };
    const handleRemove = (id: string) => {
      setMessages(prev => prev.filter(m => m.id !== id));
    };
    return <div style={{
      position: "relative",
      width: "100%",
      minHeight: 300
    }}>\r
        <button style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
      }} onClick={handleGenerate}>\r
          Сгенерировать 20 сообщений\r
        </button>\r
        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 60
      }}>\r
          {messages.map(msg => <Message key={msg.id} message={msg} onRemove={() => handleRemove(msg.id!)} />)}\r
        </div>\r
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Генератор 20 случайных сообщений с разными параметрами. Кнопка в правом верхнем углу генерирует новые сообщения."
      }
    }
  }
}`,...d.parameters?.docs?.source}}};const j=["Default","Generator"];export{m as Default,d as Generator,j as __namedExportsOrder,H as default};
