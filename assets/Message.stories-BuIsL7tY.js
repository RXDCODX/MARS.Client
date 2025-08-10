import"./SignalRHubWrapper-C--VnAx0.js";import{C as u,a as p}from"./data-contracts-Dn8S_9If.js";import{M as y}from"./Message-Ca2rgiXY.js";import"./index-BhlHwfix.js";import"./iframe-BC7DeeL6.js";import"./animate.module-CI42XwLX.js";import"./index-BW6dIR7N.js";import"./index-B_SPtptC.js";import"./index-Chjiymov.js";import"./index-RHBF0zT8.js";import"./react-BJl0BmN6.js";import"./GradientText-CwmRDdmI.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,M={title:"Chat/ChatHorizontal/Message",component:y,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение чата с анимацией движения по экрану."}}},tags:["autodocs"],argTypes:{message:{control:"object"},callback:{action:"message removed"}}},d={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:p.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:u.Viewer,username:void 0},m={args:{message:d,callback:()=>console.log("Message removed")},play:async({canvasElement:o})=>{await new Promise(c=>setTimeout(c,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="message"]');e(t).toBeInTheDocument();const s=t?.querySelector('[class*="nickname"]');e(s).toBeInTheDocument(),e(s).toHaveTextContent("TestUser:");const a=t?.querySelector('[class*="text"]');e(a).toBeInTheDocument(),e(a).toHaveTextContent("Привет всем! 👋");const n=window.getComputedStyle(t);e(n.position).toBe("absolute"),e(n.fontSize).toBeDefined()}},l={args:{message:{...d,displayName:"VIPUser",colorHex:"#00ff00",isVip:!0,message:"VIP сообщение! 💎"},callback:()=>console.log("VIP message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const t=o.querySelector('[class*="message"]');e(t).toBeInTheDocument();const s=t?.querySelector('[class*="nickname"]');e(s).toHaveTextContent("VIPUser:");const a=window.getComputedStyle(s);e(a.color).toBe("rgb(0, 255, 0)");const n=t?.querySelector('[class*="text"]');e(n).toHaveTextContent("VIP сообщение! 💎");const c=window.getComputedStyle(t);e(c.background).toContain("linear-gradient")}},i={args:{message:{...d,displayName:"Moderator",colorHex:"#0000ff",isModerator:!0,message:"Модераторское сообщение! 🛡️"},callback:()=>console.log("Moderator message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const t=o.querySelector('[class*="message"]');e(t).toBeInTheDocument();const s=t?.querySelector('[class*="nickname"]');e(s).toHaveTextContent("Moderator:");const a=window.getComputedStyle(s);e(a.color).toBe("rgb(0, 0, 255)");const n=t?.querySelector('[class*="text"]');e(n).toHaveTextContent("Модераторское сообщение! 🛡️");const c=window.getComputedStyle(t);e(c.background).toContain("linear-gradient")}},g={args:{message:{...d,displayName:"Broadcaster",colorHex:"#ffff00",isBroadcaster:!0,message:"Сообщение от стримера! 🎮"},callback:()=>console.log("Broadcaster message removed")},play:async({canvasElement:o})=>{await new Promise(r=>setTimeout(r,100));const t=o.querySelector('[class*="message"]');e(t).toBeInTheDocument();const s=t?.querySelector('[class*="nickname"]');e(s).toHaveTextContent("Broadcaster:");const a=window.getComputedStyle(s);e(a.color).toBe("rgb(255, 255, 0)");const n=t?.querySelector('[class*="text"]');e(n).toHaveTextContent("Сообщение от стримера! 🎮");const c=window.getComputedStyle(t);e(c.background).toContain("linear-gradient")}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const P=["Default","VIPUser","Moderator","Broadcaster"];export{g as Broadcaster,m as Default,i as Moderator,l as VIPUser,P as __namedExportsOrder,M as default};
