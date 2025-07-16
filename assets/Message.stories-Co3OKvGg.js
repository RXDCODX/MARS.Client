import{C as l,a as d}from"./baza-BnLwLixe.js";import{M as g}from"./Message-ogbYQH8x.js";import"./iframe-B_oz8dKo.js";import"./animate.module-CI42XwLX.js";import"./index-P3iobJrg.js";import"./index-BU3mIPC_.js";import"./v4-BBZMrhdn.js";import"./GradientText-ZL1yfK3Q.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,B={title:"Chat/ChatVerticalMessage",component:g,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение вертикального чата с анимацией появления."}}},tags:["autodocs"],argTypes:{message:{control:"object"},onRemove:{action:"message removed"}}},p={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:d.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:l.Viewer,username:void 0},s={args:{message:p,onRemove:()=>console.log("Message removed")},play:async({canvasElement:a})=>{await new Promise(m=>setTimeout(m,100)),e(a).toBeInTheDocument();const t=a.querySelector('[class*="container"]');e(t).toBeInTheDocument();const r=t?.querySelector('[class*="left"]');e(r).toBeInTheDocument();const c=t?.querySelector('[class*="right"]');e(c).toBeInTheDocument();const o=t?.querySelector('[class*="nickname"]');e(o).toBeInTheDocument(),e(o).toHaveTextContent("TestUser");const i=window.getComputedStyle(o);e(i.color).toBe("rgb(255, 0, 0)");const n=window.getComputedStyle(t);e(n.display).toBe("flex"),e(n.minHeight).toBe("60px"),e(t.className).toContain("container"),e(t.className).toContain("animated")}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const C=["Default"];export{s as Default,C as __namedExportsOrder,B as default};
