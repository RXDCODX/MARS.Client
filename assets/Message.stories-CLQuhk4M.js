import{C as I,a as b}from"./baza-BnLwLixe.js";import{M}from"./Message-9XCrOoNk.js";import"./iframe-D1A6zj-g.js";import"./animate.module-CI42XwLX.js";import"./index-BYS-PA3k.js";import"./index-7MjqgO3W.js";import"./v4-DueItj6Y.js";import"./GradientText-D62lPnGf.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,N={title:"Chat/Message",component:M,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение чата с анимацией движения по экрану."}}},tags:["autodocs"],argTypes:{message:{control:"object"},callback:{action:"message removed"}}},g={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:b.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:I.Viewer,username:void 0},l={args:{message:g,callback:()=>console.log("Message removed")},play:async({canvasElement:o})=>{await new Promise(c=>setTimeout(c,100)),t(o).toBeInTheDocument();const e=o.querySelector('[class*="message"]');t(e).toBeInTheDocument();const s=e==null?void 0:e.querySelector('[class*="nickname"]');t(s).toBeInTheDocument(),t(s).toHaveTextContent("TestUser:");const a=e==null?void 0:e.querySelector('[class*="text"]');t(a).toBeInTheDocument(),t(a).toHaveTextContent("Привет всем! 👋");const n=window.getComputedStyle(e);t(n.position).toBe("absolute"),t(n.fontSize).toBeDefined()}},m={args:{message:{...g,displayName:"VIPUser",colorHex:"#00ff00",isVip:!0,message:"VIP сообщение! 💎"},callback:()=>console.log("VIP message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const e=o.querySelector('[class*="message"]');t(e).toBeInTheDocument();const s=e==null?void 0:e.querySelector('[class*="nickname"]');t(s).toHaveTextContent("VIPUser:");const a=window.getComputedStyle(s);t(a.color).toBe("rgb(0, 255, 0)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("VIP сообщение! 💎");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}},i={args:{message:{...g,displayName:"Moderator",colorHex:"#0000ff",isModerator:!0,message:"Модераторское сообщение! 🛡️"},callback:()=>console.log("Moderator message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const e=o.querySelector('[class*="message"]');t(e).toBeInTheDocument();const s=e==null?void 0:e.querySelector('[class*="nickname"]');t(s).toHaveTextContent("Moderator:");const a=window.getComputedStyle(s);t(a.color).toBe("rgb(0, 0, 255)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("Модераторское сообщение! 🛡️");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}},d={args:{message:{...g,displayName:"Broadcaster",colorHex:"#ffff00",isBroadcaster:!0,message:"Сообщение от стримера! 🎮"},callback:()=>console.log("Broadcaster message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const e=o.querySelector('[class*="message"]');t(e).toBeInTheDocument();const s=e==null?void 0:e.querySelector('[class*="nickname"]');t(s).toHaveTextContent("Broadcaster:");const a=window.getComputedStyle(s);t(a.color).toBe("rgb(255, 255, 0)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("Сообщение от стримера! 🎮");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}};var u,p,y;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    message: defaultMessage,
    callback: () => console.log("Message removed")
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем структуру сообщения
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toBeInTheDocument();
    expect(nickname).toHaveTextContent("TestUser:");

    // Проверяем текст сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Привет всем! 👋");

    // Проверяем стили анимации
    const computedStyle = window.getComputedStyle(messageElement!);
    expect(computedStyle.position).toBe("absolute");
    expect(computedStyle.fontSize).toBeDefined();
  }
}`,...(y=(p=l.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var S,x,v;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: "VIPUser",
      colorHex: "#00ff00",
      isVip: true,
      message: "VIP сообщение! 💎"
    },
    callback: () => console.log("VIP message removed")
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем VIP статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм VIP пользователя
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("VIPUser:");

    // Проверяем цвет VIP пользователя
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(0, 255, 0)");

    // Проверяем текст VIP сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("VIP сообщение! 💎");

    // Проверяем фон для VIP пользователя
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  }
}`,...(v=(x=m.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var f,k,T;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: "Moderator",
      colorHex: "#0000ff",
      isModerator: true,
      message: "Модераторское сообщение! 🛡️"
    },
    callback: () => console.log("Moderator message removed")
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем модераторский статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм модератора
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("Moderator:");

    // Проверяем цвет модератора
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(0, 0, 255)");

    // Проверяем текст модераторского сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("Модераторское сообщение! 🛡️");

    // Проверяем фон для модератора
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  }
}`,...(T=(k=i.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var w,C,B;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: "Broadcaster",
      colorHex: "#ffff00",
      isBroadcaster: true,
      message: "Сообщение от стримера! 🎮"
    },
    callback: () => console.log("Broadcaster message removed")
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем статус стримера
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм стримера
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("Broadcaster:");

    // Проверяем цвет стримера
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(255, 255, 0)");

    // Проверяем текст сообщения стримера
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("Сообщение от стримера! 🎮");

    // Проверяем фон для стримера
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  }
}`,...(B=(C=d.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};const _=["Default","VIPUser","Moderator","Broadcaster"];export{d as Broadcaster,l as Default,i as Moderator,m as VIPUser,_ as __namedExportsOrder,N as default};
