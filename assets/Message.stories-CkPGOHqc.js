import{w as g,e as t}from"./index-BnesSBbZ.js";import{C as B,a as M}from"./baza-BnLwLixe.js";import{M as h}from"./Message-DvVKVdbN.js";import"./iframe-DqfnGlCG.js";import"./index-BekxroER.js";import"./index-D97MGZuM.js";import"./v4-BLKDVEyC.js";import"./animate.module-CI42XwLX.js";const R={title:"Chat/Message",component:h,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение чата с анимацией движения по экрану."}}},tags:["autodocs"],argTypes:{message:{control:"object"},callback:{action:"message removed"}}},u={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:M.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:B.Viewer,username:void 0},l={args:{message:u,callback:()=>console.log("Message removed")},play:async({canvasElement:s})=>{g(s),await new Promise(c=>setTimeout(c,100)),t(s).toBeInTheDocument();const e=s.querySelector('[class*="message"]');t(e).toBeInTheDocument();const o=e==null?void 0:e.querySelector('[class*="nickname"]');t(o).toBeInTheDocument(),t(o).toHaveTextContent("TestUser:");const a=e==null?void 0:e.querySelector('[class*="text"]');t(a).toBeInTheDocument(),t(a).toHaveTextContent("Привет всем! 👋");const n=window.getComputedStyle(e);t(n.position).toBe("absolute"),t(n.fontSize).toBeDefined()}},m={args:{message:{...u,displayName:"VIPUser",colorHex:"#00ff00",isVip:!0,message:"VIP сообщение! 💎"},callback:()=>console.log("VIP message removed")},play:async({canvasElement:s})=>{g(s),await new Promise(r=>setTimeout(r,100));const e=s.querySelector('[class*="message"]');t(e).toBeInTheDocument();const o=e==null?void 0:e.querySelector('[class*="nickname"]');t(o).toHaveTextContent("VIPUser:");const a=window.getComputedStyle(o);t(a.color).toBe("rgb(0, 255, 0)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("VIP сообщение! 💎");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}},i={args:{message:{...u,displayName:"Moderator",colorHex:"#0000ff",isModerator:!0,message:"Модераторское сообщение! 🛡️"},callback:()=>console.log("Moderator message removed")},play:async({canvasElement:s})=>{g(s),await new Promise(r=>setTimeout(r,100));const e=s.querySelector('[class*="message"]');t(e).toBeInTheDocument();const o=e==null?void 0:e.querySelector('[class*="nickname"]');t(o).toHaveTextContent("Moderator:");const a=window.getComputedStyle(o);t(a.color).toBe("rgb(0, 0, 255)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("Модераторское сообщение! 🛡️");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}},d={args:{message:{...u,displayName:"Broadcaster",colorHex:"#ffff00",isBroadcaster:!0,message:"Сообщение от стримера! 🎮"},callback:()=>console.log("Broadcaster message removed")},play:async({canvasElement:s})=>{g(s),await new Promise(r=>setTimeout(r,100));const e=s.querySelector('[class*="message"]');t(e).toBeInTheDocument();const o=e==null?void 0:e.querySelector('[class*="nickname"]');t(o).toHaveTextContent("Broadcaster:");const a=window.getComputedStyle(o);t(a.color).toBe("rgb(255, 255, 0)");const n=e==null?void 0:e.querySelector('[class*="text"]');t(n).toHaveTextContent("Сообщение от стримера! 🎮");const c=window.getComputedStyle(e);t(c.background).toContain("linear-gradient")}};var p,y,S;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    message: defaultMessage,
    callback: () => console.log('Message removed')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

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
    expect(nickname).toHaveTextContent('TestUser:');

    // Проверяем текст сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Привет всем! 👋');

    // Проверяем стили анимации
    const computedStyle = window.getComputedStyle(messageElement!);
    expect(computedStyle.position).toBe('absolute');
    expect(computedStyle.fontSize).toBeDefined();
  }
}`,...(S=(y=l.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,v,w;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'VIPUser',
      colorHex: '#00ff00',
      isVip: true,
      message: 'VIP сообщение! 💎'
    },
    callback: () => console.log('VIP message removed')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем VIP статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм VIP пользователя
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent('VIPUser:');

    // Проверяем цвет VIP пользователя
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe('rgb(0, 255, 0)');

    // Проверяем текст VIP сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent('VIP сообщение! 💎');

    // Проверяем фон для VIP пользователя
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain('linear-gradient');
  }
}`,...(w=(v=m.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var f,k,T;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'Moderator',
      colorHex: '#0000ff',
      isModerator: true,
      message: 'Модераторское сообщение! 🛡️'
    },
    callback: () => console.log('Moderator message removed')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем модераторский статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм модератора
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent('Moderator:');

    // Проверяем цвет модератора
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe('rgb(0, 0, 255)');

    // Проверяем текст модераторского сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent('Модераторское сообщение! 🛡️');

    // Проверяем фон для модератора
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain('linear-gradient');
  }
}`,...(T=(k=i.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var C,I,b;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'Broadcaster',
      colorHex: '#ffff00',
      isBroadcaster: true,
      message: 'Сообщение от стримера! 🎮'
    },
    callback: () => console.log('Broadcaster message removed')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем статус стримера
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм стримера
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent('Broadcaster:');

    // Проверяем цвет стримера
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe('rgb(255, 255, 0)');

    // Проверяем текст сообщения стримера
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent('Сообщение от стримера! 🎮');

    // Проверяем фон для стримера
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain('linear-gradient');
  }
}`,...(b=(I=d.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};const z=["Default","VIPUser","Moderator","Broadcaster"];export{d as Broadcaster,l as Default,i as Moderator,m as VIPUser,z as __namedExportsOrder,R as default};
