import{e as M,r as u,j as o}from"./iframe-DfjFra_E.js";import{A as j}from"./Announce-BQQtQ4hh.js";import{l as d}from"./index-73zqftOg.js";import{a as l}from"./animate.module-CI42XwLX.js";import{u as w,e as p,d as v,a as E,i as O}from"./index-DDUjKJzf.js";import{S as T}from"./index-oSaGBWdX.js";import"./index-Chjiymov.js";import"./react-dRZq-Y5g.js";import"./index-eIvpPVhI.js";const h=e=>Symbol.iterator in e,f=e=>"entries"in e,b=(e,s)=>{const n=e instanceof Map?e:new Map(e.entries()),t=s instanceof Map?s:new Map(s.entries());if(n.size!==t.size)return!1;for(const[a,r]of n)if(!Object.is(r,t.get(a)))return!1;return!0},I=(e,s)=>{const n=e[Symbol.iterator](),t=s[Symbol.iterator]();let a=n.next(),r=t.next();for(;!a.done&&!r.done;){if(!Object.is(a.value,r.value))return!1;a=n.next(),r=t.next()}return!!a.done&&!!r.done};function N(e,s){return Object.is(e,s)?!0:typeof e!="object"||e===null||typeof s!="object"||s===null||Object.getPrototypeOf(e)!==Object.getPrototypeOf(s)?!1:h(e)&&h(s)?f(e)&&f(s)?b(e,s):I(e,s):b({entries:()=>Object.entries(e)},{entries:()=>Object.entries(s)})}function q(e){const s=M.useRef(void 0);return n=>{const t=e(n);return N(s.current,t)?s.current:s.current=t}}const P="_icons_138ev_41",B="_name_138ev_70",A="_emotes_138ev_87",k="_talktext_138ev_117",R="_bubble_138ev_140",D="_right_138ev_155",i={"buble-image":"_buble-image_138ev_9",icons:P,name:B,emotes:A,talktext:k,bubble:R,right:D};function H(e,s){switch(s.type){case 0:return e.isMessageShowing?{...e,messages:[...e.messages,s.messageProps]}:{messages:[...e.messages],currentMessage:s.messageProps,isMessageShowing:!0};case 1:if(e.messages.length>0){const n=e.messages.filter(t=>t.message.id!==s.messageProps.message.id);if(n.length>0){const t=n[0];return{messages:n,currentMessage:t,isMessageShowing:!0}}return{messages:e.messages,currentMessage:void 0,isMessageShowing:!1}}return{currentMessage:void 0,isMessageShowing:!1,messages:[]}}}function x(){const[{currentMessage:e},s]=u.useReducer(H,{messages:[],isMessageShowing:!1}),n=w(q(r=>r.badges)),t=u.useRef(null);T.useSignalREffect("Highlite",(r,S,_)=>{s({type:0,messageProps:{message:r,color:S,faceImage:_}})},[]);const a=u.useCallback(r=>{s({type:1,messageProps:r})},[]);return o.jsx(o.Fragment,{children:e&&o.jsxs("div",{id:e.message.id,className:i.container+" "+l.fadeIn+" "+l.animated,ref:t,children:[o.jsxs("div",{className:i["buble-image"],children:[!p(e)&&o.jsx("img",{alt:"Image",src:"http://localhost:9155/"+e.faceImage.url,onLoad:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}}),p(e)&&o.jsx("video",{src:"http://localhost:9155/"+e.faceImage.url,autoPlay:!0,controls:!1,loop:!0,muted:!0,onLoadedMetadata:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}})]}),o.jsx("div",{className:i.bubble+" "+i.right,style:{background:`linear-gradient(135deg, ${O(e.color)?v():"white"}, ${e.color}) border-box`},children:o.jsxs("div",{className:i.talktext,children:[o.jsxs("div",{className:i.icons,children:[o.jsxs(d.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${e.color}`},mode:"single",forceSingleModeWidth:!0,className:i.name,children:[e.message.displayName,":"]}),o.jsx("div",{children:E(n,e.message)})]}),o.jsx(d.Textfit,{min:1,max:1500,mode:"multi",className:i.emotes,children:e.message.message})]})})]},e.message.id)})}x.__docgenInfo={description:"",methods:[],displayName:"Message"};function y(){const[e,s]=u.useState(!1);return o.jsxs(o.Fragment,{children:[!e&&o.jsx(j,{title:"HighliteMessage",callback:()=>s(!0)}),o.jsx(x,{})]})}y.__docgenInfo={description:"",methods:[],displayName:"HighliteMessage"};const{expect:c}=__STORYBOOK_MODULE_TEST__,Y={title:"Stream Components/HighliteMessage",component:y,parameters:{layout:"fullscreen",docs:{description:{component:"Система всплывающих сообщений с изображениями и анимациями."}}},tags:["autodocs"],decorators:[e=>o.jsx(e,{})]},m={args:{},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const n=e.querySelectorAll("img");c(n.length).toBe(0)}},g={args:{},parameters:{docs:{description:{story:"Пустая система всплывающих сообщений без активных событий."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const n=e.querySelectorAll("img");c(n.length).toBe(0);const t=e.querySelectorAll("video");c(t.length).toBe(0);const a=e.querySelectorAll('[class*="bubble"]');c(a.length).toBe(0)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const G=["Default","Empty"];export{m as Default,g as Empty,G as __namedExportsOrder,Y as default};
