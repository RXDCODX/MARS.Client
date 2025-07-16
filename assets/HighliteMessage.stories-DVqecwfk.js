import{e as x,r as u,j as a}from"./iframe-B_oz8dKo.js";import{A as _}from"./Announce-CIliHre1.js";import{l as d}from"./index-BU3mIPC_.js";import{S as b}from"./v4-BBZMrhdn.js";import{a as l}from"./animate.module-CI42XwLX.js";import{u as S,d as h,b as M,r as w,i as E}from"./index-P3iobJrg.js";function T(e,s){if(Object.is(e,s))return!0;if(typeof e!="object"||e===null||typeof s!="object"||s===null)return!1;if(e instanceof Map&&s instanceof Map){if(e.size!==s.size)return!1;for(const[t,c]of e)if(!Object.is(c,s.get(t)))return!1;return!0}if(e instanceof Set&&s instanceof Set){if(e.size!==s.size)return!1;for(const t of e)if(!s.has(t))return!1;return!0}const n=Object.keys(e);if(n.length!==Object.keys(s).length)return!1;for(const t of n)if(!Object.prototype.hasOwnProperty.call(s,t)||!Object.is(e[t],s[t]))return!1;return!0}const{useRef:O}=x;function N(e){const s=O();return n=>{const t=e(n);return T(s.current,t)?s.current:s.current=t}}const k="_icons_138ev_41",q="_name_138ev_70",I="_emotes_138ev_87",P="_talktext_138ev_117",A="_bubble_138ev_140",R="_right_138ev_155",r={"buble-image":"_buble-image_138ev_9",icons:k,name:q,emotes:I,talktext:P,bubble:A,right:R};function B(e,s){switch(s.type){case 0:return e.isMessageShowing?{...e,messages:[...e.messages,s.messageProps]}:{messages:[...e.messages],currentMessage:s.messageProps,isMessageShowing:!0};case 1:if(e.messages.length>0){const n=e.messages.filter(t=>t.message.id!==s.messageProps.message.id);if(n.length>0){const t=n[0];return{messages:n,currentMessage:t,isMessageShowing:!0}}return{messages:e.messages,currentMessage:void 0,isMessageShowing:!1}}return{currentMessage:void 0,isMessageShowing:!1,messages:[]}}}function f(){const[{currentMessage:e},s]=u.useReducer(B,{messages:[],isMessageShowing:!1}),n=S(N(i=>i.badges)),t=u.useRef(null);b.useSignalREffect("Highlite",(i,y,v)=>{s({type:0,messageProps:{message:i,color:y,faceImage:v}})},[]);const c=u.useCallback(i=>{s({type:1,messageProps:i})},[]);return a.jsx(a.Fragment,{children:e&&a.jsxs("div",{id:e.message.id,className:r.container+" "+l.fadeIn+" "+l.animated,ref:t,children:[a.jsxs("div",{className:r["buble-image"],children:[!h(e)&&a.jsx("img",{alt:"Image",src:"http://localhost:9155/"+e.faceImage.url,onLoad:()=>{setTimeout(()=>{t.current.onanimationend=()=>{c(e)},t.current.className=r.container+" "+l.fadeOut+" "+l.animated},7e3)}}),h(e)&&a.jsx("video",{src:"http://localhost:9155/"+e.faceImage.url,autoPlay:!0,controls:!1,loop:!0,muted:!0,onLoadedMetadata:()=>{setTimeout(()=>{t.current.onanimationend=()=>{c(e)},t.current.className=r.container+" "+l.fadeOut+" "+l.animated},7e3)}})]}),a.jsx("div",{className:r.bubble+" "+r.right,style:{background:`linear-gradient(135deg, ${E(e.color)?M():"white"}, ${e.color}) border-box`},children:a.jsxs("div",{className:r.talktext,children:[a.jsxs("div",{className:r.icons,children:[a.jsxs(d.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${e.color}`},mode:"single",forceSingleModeWidth:!0,className:r.name,children:[e.message.displayName,":"]}),a.jsx("div",{children:w(n,e.message)})]}),a.jsx(d.Textfit,{min:1,max:1500,mode:"multi",className:r.emotes,children:e.message.message})]})})]},e.message.id)})}f.__docgenInfo={description:"",methods:[],displayName:"Message"};function p(){const[e,s]=u.useState(!1);return a.jsxs(a.Fragment,{children:[!e&&a.jsx(_,{title:"HighliteMessage",callback:()=>s(!0)}),a.jsx(f,{})]})}p.__docgenInfo={description:"",methods:[],displayName:"HighliteMessage"};const{expect:o}=__STORYBOOK_MODULE_TEST__,L={title:"Chat/HighliteMessage",component:p,parameters:{layout:"fullscreen",docs:{description:{component:"Система всплывающих сообщений с изображениями и анимациями."}}},tags:["autodocs"],decorators:[e=>a.jsx(e,{})]},m={args:{},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),o(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');o(s.length).toBe(0);const n=e.querySelectorAll("img");o(n.length).toBe(0)}},g={args:{},parameters:{docs:{description:{story:"Пустая система всплывающих сообщений без активных событий."}}},play:async({canvasElement:e})=>{await new Promise(i=>setTimeout(i,100)),o(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');o(s.length).toBe(0);const n=e.querySelectorAll("img");o(n.length).toBe(0);const t=e.querySelectorAll("video");o(t.length).toBe(0);const c=e.querySelectorAll('[class*="bubble"]');o(c.length).toBe(0)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных всплывающих сообщений изначально
    const highliteMessages = canvasElement.querySelectorAll('[class*="container"]');
    expect(highliteMessages.length).toBe(0);

    // Проверяем, что нет изображений изначально
    const images = canvasElement.querySelectorAll("img");
    expect(images.length).toBe(0);
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Пустая система всплывающих сообщений без активных событий."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет всплывающих сообщений
    const highliteMessages = canvasElement.querySelectorAll('[class*="container"]');
    expect(highliteMessages.length).toBe(0);

    // Проверяем, что нет изображений
    const images = canvasElement.querySelectorAll("img");
    expect(images.length).toBe(0);

    // Проверяем, что нет видео
    const videos = canvasElement.querySelectorAll("video");
    expect(videos.length).toBe(0);

    // Проверяем, что нет пузырьков с текстом
    const bubbles = canvasElement.querySelectorAll('[class*="bubble"]');
    expect(bubbles.length).toBe(0);
  }
}`,...g.parameters?.docs?.source}}};const U=["Default","Empty"];export{m as Default,g as Empty,U as __namedExportsOrder,L as default};
