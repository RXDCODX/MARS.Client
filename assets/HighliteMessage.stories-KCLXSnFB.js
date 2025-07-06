import{e as T,r as d,j as n}from"./iframe-Cc9wzQT7.js";import{w as j,e as c}from"./index-BnesSBbZ.js";import{A as q}from"./Announce-BmbYK6Ie.js";import{l as u}from"./index-D9M-HuQA.js";import{S as B}from"./v4-Bi0dVoRz.js";import{a as l}from"./animate.module-CI42XwLX.js";import{u as A,d as h,b as P,r as k,i as O}from"./index-B9TlbZJD.js";const p=e=>Symbol.iterator in e,f=e=>"entries"in e,b=(e,s)=>{const o=e instanceof Map?e:new Map(e.entries()),t=s instanceof Map?s:new Map(s.entries());if(o.size!==t.size)return!1;for(const[a,r]of o)if(!Object.is(r,t.get(a)))return!1;return!0},R=(e,s)=>{const o=e[Symbol.iterator](),t=s[Symbol.iterator]();let a=o.next(),r=t.next();for(;!a.done&&!r.done;){if(!Object.is(a.value,r.value))return!1;a=o.next(),r=t.next()}return!!a.done&&!!r.done};function D(e,s){return Object.is(e,s)?!0:typeof e!="object"||e===null||typeof s!="object"||s===null?!1:!p(e)||!p(s)?b({entries:()=>Object.entries(e)},{entries:()=>Object.entries(s)}):f(e)&&f(s)?b(e,s):R(e,s)}function H(e){const s=T.useRef(void 0);return o=>{const t=e(o);return D(s.current,t)?s.current:s.current=t}}const C="_icons_138ev_41",W="_name_138ev_70",$="_emotes_138ev_87",z="_talktext_138ev_117",F="_bubble_138ev_140",L="_right_138ev_155",i={"buble-image":"_buble-image_138ev_9",icons:C,name:W,emotes:$,talktext:z,bubble:F,right:L};function V(e,s){switch(s.type){case 0:return e.isMessageShowing?{...e,messages:[...e.messages,s.messageProps]}:{messages:[...e.messages],currentMessage:s.messageProps,isMessageShowing:!0};case 1:if(e.messages.length>0){const o=e.messages.filter(t=>t.message.id!==s.messageProps.message.id);if(o.length>0){const t=o[0];return{messages:o,currentMessage:t,isMessageShowing:!0}}return{messages:e.messages,currentMessage:void 0,isMessageShowing:!1}}return{currentMessage:void 0,isMessageShowing:!1,messages:[]}}}function v(){const[{currentMessage:e},s]=d.useReducer(V,{messages:[],isMessageShowing:!1}),o=A(H(r=>r.badges)),t=d.useRef(null);B.useSignalREffect("Highlite",(r,I,N)=>{s({type:0,messageProps:{message:r,color:I,faceImage:N}})},[]);const a=d.useCallback(r=>{s({type:1,messageProps:r})},[]);return n.jsx(n.Fragment,{children:e&&n.jsxs("div",{id:e.message.id,className:i.container+" "+l.fadeIn+" "+l.animated,ref:t,children:[n.jsxs("div",{className:i["buble-image"],children:[!h(e)&&n.jsx("img",{alt:"Image",src:"http://localhost:9155/"+e.faceImage.url,onLoad:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}}),h(e)&&n.jsx("video",{src:"http://localhost:9155/"+e.faceImage.url,autoPlay:!0,controls:!1,loop:!0,muted:!0,onLoadedMetadata:()=>{setTimeout(()=>{t.current.onanimationend=()=>{a(e)},t.current.className=i.container+" "+l.fadeOut+" "+l.animated},7e3)}})]}),n.jsx("div",{className:i.bubble+" "+i.right,style:{background:`linear-gradient(135deg, ${O(e.color)?P():"white"}, ${e.color}) border-box`},children:n.jsxs("div",{className:i.talktext,children:[n.jsxs("div",{className:i.icons,children:[n.jsxs(u.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${e.color}`},mode:"single",forceSingleModeWidth:!0,className:i.name,children:[e.message.displayName,":"]}),n.jsx("div",{children:k(o,e.message)})]}),n.jsx(u.Textfit,{min:1,max:1500,mode:"multi",className:i.emotes,children:e.message.message})]})})]},e.message.id)})}v.__docgenInfo={description:"",methods:[],displayName:"Message"};function E(){const[e,s]=d.useState(!1);return n.jsxs(n.Fragment,{children:[!e&&n.jsx(q,{title:"HighliteMessage",callback:()=>s(!0)}),n.jsx(v,{})]})}E.__docgenInfo={description:"",methods:[],displayName:"HighliteMessage"};const Z={title:"Chat/HighliteMessage",component:E,parameters:{layout:"fullscreen",docs:{description:{component:"Система всплывающих сообщений с изображениями и анимациями."}}},tags:["autodocs"],decorators:[e=>n.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:n.jsx(e,{})})]},m={args:{},play:async({canvasElement:e})=>{j(e),await new Promise(t=>setTimeout(t,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const o=e.querySelectorAll("img");c(o.length).toBe(0)}},g={args:{},parameters:{docs:{description:{story:"Пустая система всплывающих сообщений без активных событий."}}},play:async({canvasElement:e})=>{j(e),await new Promise(r=>setTimeout(r,100)),c(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');c(s.length).toBe(0);const o=e.querySelectorAll("img");c(o.length).toBe(0);const t=e.querySelectorAll("video");c(t.length).toBe(0);const a=e.querySelectorAll('[class*="bubble"]');c(a.length).toBe(0)}};var x,y,w;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных всплывающих сообщений изначально
    const highliteMessages = canvasElement.querySelectorAll('[class*="container"]');
    expect(highliteMessages.length).toBe(0);

    // Проверяем, что нет изображений изначально
    const images = canvasElement.querySelectorAll('img');
    expect(images.length).toBe(0);
  }
}`,...(w=(y=m.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var M,S,_;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Пустая система всплывающих сообщений без активных событий.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет всплывающих сообщений
    const highliteMessages = canvasElement.querySelectorAll('[class*="container"]');
    expect(highliteMessages.length).toBe(0);

    // Проверяем, что нет изображений
    const images = canvasElement.querySelectorAll('img');
    expect(images.length).toBe(0);

    // Проверяем, что нет видео
    const videos = canvasElement.querySelectorAll('video');
    expect(videos.length).toBe(0);

    // Проверяем, что нет пузырьков с текстом
    const bubbles = canvasElement.querySelectorAll('[class*="bubble"]');
    expect(bubbles.length).toBe(0);
  }
}`,...(_=(S=g.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const ee=["Default","Empty"];export{m as Default,g as Empty,ee as __namedExportsOrder,Z as default};
