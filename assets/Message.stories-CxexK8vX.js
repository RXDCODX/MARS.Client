import{C as v,a as b}from"./baza-BnLwLixe.js";import{M as y}from"./Message-By43CXx5.js";import"./jsx-runtime-D_zvdyIk.js";import"./iframe-zpiOQtGo.js";import"./index-B0qy4s_C.js";import"./index-6iYvhkm2.js";import"./animate.module-CI42XwLX.js";const N={title:"Chat/Message",component:y,parameters:{layout:"centered",docs:{description:{component:"Отдельное сообщение чата с анимацией движения по экрану."}}},tags:["autodocs"],argTypes:{message:{control:"object"},callback:{action:"message removed"}}},r={id:"1",message:"Привет всем! 👋",displayName:"TestUser",colorHex:"#ff0000",isVip:!1,isModerator:!1,isBroadcaster:!1,badgeInfo:void 0,badges:void 0,bits:0,bitsInDollars:0,botUsername:void 0,channel:void 0,chatReply:void 0,cheerBadge:void 0,color:{a:255,b:0,g:0,r:255,isEmpty:!1,isKnownColor:!0,isNamedColor:!1,isSystemColor:!1,name:"Red"},customRewardId:void 0,emoteReplacedMessage:void 0,emoteSet:void 0,isFirstMessage:!1,isHighlighted:!1,isMe:!1,isPartner:!1,isSkippingSubMode:!1,isStaff:!1,isSubscriber:!1,isTurbo:!1,noisy:b.False,rawIrcMessage:void 0,roomId:void 0,subscribedMonthCount:0,tmiSentTs:void 0,userId:void 0,userType:v.Viewer,username:void 0},e={args:{message:r,callback:()=>console.log("Message removed")}},s={args:{message:{...r,displayName:"VIPUser",colorHex:"#00ff00",isVip:!0,message:"VIP сообщение! 💎"},callback:()=>console.log("VIP message removed")}},a={args:{message:{...r,displayName:"Moderator",colorHex:"#0000ff",isModerator:!0,message:"Модераторское сообщение! 🛡️"},callback:()=>console.log("Moderator message removed")}},o={args:{message:{...r,displayName:"Broadcaster",colorHex:"#ffff00",isBroadcaster:!0,message:"Сообщение от стримера! 🎮"},callback:()=>console.log("Broadcaster message removed")}};var t,c,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    message: defaultMessage,
    callback: () => console.log('Message removed')
  }
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,n,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'VIPUser',
      colorHex: '#00ff00',
      isVip: true,
      message: 'VIP сообщение! 💎'
    },
    callback: () => console.log('VIP message removed')
  }
}`,...(m=(n=s.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var i,g,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'Moderator',
      colorHex: '#0000ff',
      isModerator: true,
      message: 'Модераторское сообщение! 🛡️'
    },
    callback: () => console.log('Moderator message removed')
  }
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var f,u,M;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    message: {
      ...defaultMessage,
      displayName: 'Broadcaster',
      colorHex: '#ffff00',
      isBroadcaster: true,
      message: 'Сообщение от стримера! 🎮'
    },
    callback: () => console.log('Broadcaster message removed')
  }
}`,...(M=(u=o.parameters)==null?void 0:u.docs)==null?void 0:M.source}}};const P=["Default","VIPUser","Moderator","Broadcaster"];export{o as Broadcaster,e as Default,a as Moderator,s as VIPUser,P as __namedExportsOrder,N as default};
