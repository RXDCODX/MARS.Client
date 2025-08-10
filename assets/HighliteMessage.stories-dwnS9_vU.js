import{e as M,r as u,j as n}from"./iframe-gjcH4K4g.js";import{A as j}from"./Announce-Cx6lwRJT.js";import{l as d}from"./index-LmWpYbeC.js";import{a as l}from"./animate.module-CI42XwLX.js";import{u as w,d as h,c as v,a as E,i as O}from"./index-DZSEqMRW.js";import{S as T}from"./index-CVGMi0fY.js";import"./index-Chjiymov.js";import"./react-BN_IyKAS.js";import"./Theme-BPSL0PO3.js";import"./index-DvKbMQdh.js";const p=e=>Symbol.iterator in e,f=e=>"entries"in e,b=(e,s)=>{const o=e instanceof Map?e:new Map(e.entries()),t=s instanceof Map?s:new Map(s.entries());if(o.size!==t.size)return!1;for(const[a,r]of o)if(!Object.is(r,t.get(a)))return!1;return!0},I=(e,s)=>{const o=e[Symbol.iterator](),t=s[Symbol.iterator]();let a=o.next(),r=t.next();for(;!a.done&&!r.done;){if(!Object.is(a.value,r.value))return!1;a=o.next(),r=t.next()}return!!a.done&&!!r.done};function N(e,s){return Object.is(e,s)?!0:typeof e!="object"||e===null||typeof s!="object"||s===null||Object.getPrototypeOf(e)!==Object.getPrototypeOf(s)?!1:p(e)&&p(s)?f(e)&&f(s)?b(e,s):I(e,s):b({entries:()=>Object.entries(e)},{entries:()=>Object.entries(s)})}function q(e){const s=M.useRef(void 0);return o=>{const t=e(o);return N(s.current,t)?s.current:s.current=t}}const P="_icons_138ev_41",B="_name_138ev_70",A="_emotes_138ev_87",k="_talktext_138ev_117",R="_bubble_138ev_140",D="_right_138ev_155",i={"buble-image":"_buble-image_138ev_9",icons:P,name:B,emotes:A,talktext:k,bubble:R,right:D};function H(e,s){switch(s.type){case 0:return e.isMessageShowing?{...e,messages:[...e.messages,s.messageProps]}:{messages:[...e.messages],currentMessage:s.messageProps,isMessageShowing:!0};case 1:if(e.messages.length>0){const o=e.messages.filter(t=>t.message.id!==s.messageProps.message.id);if(o.length>0){const t=o[0];return{messages:o,currentMessage:t,isMessageShowing:!0}}return{messages:e.messages,currentMessage:void 0,isMessageShowing:!1}}return{currentMessage:void 0,isMessageShowing:!1,messages:[]}}}function x(){const[{currentMessage:e},s]=u.useReducer(H,{messages:[],isMessageShowing:!1}),o=w(q(r=>r.badges)),t=u.useRef(null);T.useSignalREffect("Highlite",(r,_,S)=>{s({type:0,messageProps:{message:r,color:_,faceImage:S}})},[]);const a=u.useCallback(r=>{s({type:1,messageProps:r})},[]);return n.jsx(n.Fragment,{children:e&&n.jsxs("div",{id:e.message.id,className:i.container+" "+l.fadeIn+" "+l.animated,ref:t,children:[n.jsxs("div",{className:i["buble-image"],children:[!h(e)&&n.jsx("img",{alt:"Image",src:"http://localhost:9155/"+e.faceImage.url,onLoad:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}}),h(e)&&n.jsx("video",{src:"http://localhost:9155/"+e.faceImage.url,autoPlay:!0,controls:!1,loop:!0,muted:!0,onLoadedMetadata:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}})]}),n.jsx("div",{className:i.bubble+" "+i.right,style:{background:`linear-gradient(135deg, ${O(e.color)?v():"white"}, ${e.color}) border-box`},children:n.jsxs("div",{className:i.talktext,children:[n.jsxs("div",{className:i.icons,children:[n.jsxs(d.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${e.color}`},mode:"single",forceSingleModeWidth:!0,className:i.name,children:[e.message.displayName,":"]}),n.jsx("div",{children:E(o,e.message)})]}),n.jsx(d.Textfit,{min:1,max:1500,mode:"multi",className:i.emotes,children:e.message.message})]})})]},e.message.id)})}x.__docgenInfo={description:"",methods:[],displayName:"Message"};function y(){const[e,s]=u.useState(!1);return n.jsxs(n.Fragment,{children:[!e&&n.jsx(j,{title:"HighliteMessage",callback:()=>s(!0)}),n.jsx(x,{})]})}y.__docgenInfo={description:"",methods:[],displayName:"HighliteMessage"};const{expect:c}=__STORYBOOK_MODULE_TEST__,G={title:"Chat/HighliteMessage",component:y,parameters:{layout:"fullscreen",docs:{description:{component:"Система всплывающих сообщений с изображениями и анимациями."}}},tags:["autodocs"],decorators:[e=>n.jsx(e,{})]},m={args:{},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const o=e.querySelectorAll("img");c(o.length).toBe(0)}},g={args:{},parameters:{docs:{description:{story:"Пустая система всплывающих сообщений без активных событий."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const o=e.querySelectorAll("img");c(o.length).toBe(0);const t=e.querySelectorAll("video");c(t.length).toBe(0);const a=e.querySelectorAll('[class*="bubble"]');c(a.length).toBe(0)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const J=["Default","Empty"];export{m as Default,g as Empty,J as __namedExportsOrder,G as default};
