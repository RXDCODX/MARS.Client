import{e as t}from"./index-BnesSBbZ.js";import{C as g,a as u}from"./baza-BnLwLixe.js";import{M as y}from"./Message-DrUj9HKE.js";import"./iframe-CTrkdtAc.js";import"./index-B9Efak_Q.js";import"./index-WpBykvsV.js";import"./v4-CkG-Yvg4.js";import"./GradientText-Cc2GKIik.js";import"./animate.module-CI42XwLX.js";const M={title:"Chat/ChatVerticalMessage",component:y,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение вертикального чата с анимацией появления."}}},tags:["autodocs"],argTypes:{message:{control:"object"},onRemove:{action:"message removed"}}},f={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:u.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:g.Viewer,username:void 0},o={args:{message:f,onRemove:()=>console.log("Message removed")},play:async({canvasElement:a})=>{await new Promise(p=>setTimeout(p,100)),t(a).toBeInTheDocument();const e=a.querySelector('[class*="container"]');t(e).toBeInTheDocument();const l=e==null?void 0:e.querySelector('[class*="left"]');t(l).toBeInTheDocument();const m=e==null?void 0:e.querySelector('[class*="right"]');t(m).toBeInTheDocument();const s=e==null?void 0:e.querySelector('[class*="nickname"]');t(s).toBeInTheDocument(),t(s).toHaveTextContent("TestUser");const d=window.getComputedStyle(s);t(d.color).toBe("rgb(255, 0, 0)");const n=window.getComputedStyle(e);t(n.display).toBe("flex"),t(n.minHeight).toBe("60px"),t(e.className).toContain("container"),t(e.className).toContain("animated")}};var r,c,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(i=(c=o.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const b=["Default"];export{o as Default,b as __namedExportsOrder,M as default};
