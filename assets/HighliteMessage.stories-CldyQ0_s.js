import{e as I,r as m,j as a}from"./iframe-BjL-cKrh.js";import{A as E}from"./Announce-D3c2WgwG.js";import{l as y}from"./index-D-P6gtBR.js";import{a as l}from"./animate.module-CI42XwLX.js";import{u as D,d as M,a as P,i as j}from"./index-3u8u-C0z.js";import{S as k}from"./index-YtfadmvT.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Chjiymov.js";import"./react-DeaJAqDd.js";import"./index-D5MxPxIl.js";const b=[{name:"1233233",url:"/src/assets/faces/1233233.gif.mp4",type:"video",extension:".mp4"},{name:"3d-saul-saul-goodman",url:"/src/assets/faces/3d-saul-saul-goodman.gif",type:"image",extension:".gif"},{name:"animation",url:"/src/assets/faces/animation.gif.mp4",type:"video",extension:".mp4"},{name:"blank-stare-really",url:"/src/assets/faces/blank-stare-really.gif",type:"image",extension:".gif"},{name:"blue-archive-arisu",url:"/src/assets/faces/blue-archive-blue-archive-arisu.gif",type:"image",extension:".gif"},{name:"clash-royale",url:"/src/assets/faces/clash-royale.gif",type:"image",extension:".gif"},{name:"cristiano-ronaldo",url:"/src/assets/faces/cristiano-ronaldo-soccer.gif",type:"image",extension:".gif"},{name:"dante-dmc",url:"/src/assets/faces/dante-dante-devil-may-cry.mp4",type:"video",extension:".mp4"},{name:"minions",url:"/src/assets/faces/despicable-me-minions.gif",type:"image",extension:".gif"},{name:"devil-may-cry",url:"/src/assets/faces/devil-may-cry-dmc.gif",type:"image",extension:".gif"},{name:"dono-wall",url:"/src/assets/faces/dono-wall.gif",type:"image",extension:".gif"},{name:"ferass18",url:"/src/assets/faces/ferass18.gif",type:"image",extension:".gif"},{name:"funny-dogs",url:"/src/assets/faces/funny-dogs-cute.gif",type:"image",extension:".gif"},{name:"giga-chad",url:"/src/assets/faces/giga-chad.gif",type:"image",extension:".gif"},{name:"homelander-milk",url:"/src/assets/faces/homelander-milk.gif",type:"image",extension:".gif"},{name:"homelander",url:"/src/assets/faces/homelander-the-boys.gif",type:"image",extension:".gif"},{name:"marin-kitagawa",url:"/src/assets/faces/marin-kitagawa.gif",type:"image",extension:".gif"},{name:"mika-misono",url:"/src/assets/faces/mika-misono-mika.gif",type:"image",extension:".gif"},{name:"plink-cat",url:"/src/assets/faces/plink-cat-plink.gif",type:"image",extension:".gif"},{name:"sus",url:"/src/assets/faces/sus-suspicious.gif",type:"image",extension:".gif"},{name:"tachibana-hikari",url:"/src/assets/faces/tachibana-hikari-blue-archive.gif",type:"image",extension:".gif"},{name:"tendou-aris",url:"/src/assets/faces/tendou-aris-blue-archive.gif",type:"image",extension:".gif"},{name:"vargillllll",url:"/src/assets/faces/vargillllll-vargil.gif",type:"image",extension:".gif"},{name:"video-2025",url:"/src/assets/faces/video_2025-02-02_17-11-44.mp4",type:"video",extension:".mp4"}];function v(){const e=Math.floor(Math.random()*b.length);return b[e]}function N(e){const s=b.filter(o=>o.type===e),t=Math.floor(Math.random()*s.length);return s[t]}const w=e=>Symbol.iterator in e,S=e=>"entries"in e,T=(e,s)=>{const t=e instanceof Map?e:new Map(e.entries()),o=s instanceof Map?s:new Map(s.entries());if(t.size!==o.size)return!1;for(const[r,n]of t)if(!Object.is(n,o.get(r)))return!1;return!0},q=(e,s)=>{const t=e[Symbol.iterator](),o=s[Symbol.iterator]();let r=t.next(),n=o.next();for(;!r.done&&!n.done;){if(!Object.is(r.value,n.value))return!1;r=t.next(),n=o.next()}return!!r.done&&!!n.done};function O(e,s){return Object.is(e,s)?!0:typeof e!="object"||e===null||typeof s!="object"||s===null||Object.getPrototypeOf(e)!==Object.getPrototypeOf(s)?!1:w(e)&&w(s)?S(e)&&S(s)?T(e,s):q(e,s):T({entries:()=>Object.entries(e)},{entries:()=>Object.entries(s)})}function H(e){const s=I.useRef(void 0);return t=>{const o=e(t);return O(s.current,o)?s.current:s.current=o}}const F="_icons_138ev_41",G="_name_138ev_70",R="_emotes_138ev_87",C="_talktext_138ev_117",$="_bubble_138ev_140",W="_right_138ev_155",c={"buble-image":"_buble-image_138ev_9",icons:F,name:G,emotes:R,talktext:C,bubble:$,right:W};function z(e,s){switch(s.type){case 0:return e.isMessageShowing?{...e,messages:[...e.messages,s.messageProps]}:{messages:[...e.messages],currentMessage:s.messageProps,isMessageShowing:!0};case 1:if(e.messages.length>0){const t=e.messages.filter(o=>o.message.id!==s.messageProps.message.id);if(t.length>0){const o=t[0];return{messages:t,currentMessage:o,isMessageShowing:!0}}return{messages:e.messages,currentMessage:void 0,isMessageShowing:!1}}return{currentMessage:void 0,isMessageShowing:!1,messages:[]}}}function _(){const[{currentMessage:e},s]=m.useReducer(z,{messages:[],isMessageShowing:!1}),t=D(H(n=>n.badges)),o=m.useRef(null);k.useSignalREffect("Highlite",(n,g)=>{const B=v();s({type:0,messageProps:{message:n,color:g,faceImage:B}})},[]);const r=m.useCallback(n=>{s({type:1,messageProps:n})},[]);return a.jsx(a.Fragment,{children:e&&a.jsxs("div",{id:e.message.id,className:c.container+" "+l.fadeIn+" "+l.animated,ref:o,children:[a.jsxs("div",{className:c["buble-image"],children:[e.faceImage.type==="image"&&a.jsx("img",{alt:`Face: ${e.faceImage.name}`,src:e.faceImage.url,onLoad:()=>{setTimeout(()=>{o.current.onanimationend=()=>{r(e)},o.current.className=c.container+" "+l.fadeOut+" "+l.animated},7e3)}}),e.faceImage.type==="video"&&a.jsx("video",{src:e.faceImage.url,autoPlay:!0,controls:!1,loop:!0,muted:!0,onLoadedMetadata:()=>{setTimeout(()=>{o.current.onanimationend=()=>{r(e)},o.current.className=c.container+" "+l.fadeOut+" "+l.animated},7e3)}})]}),a.jsx("div",{className:c.bubble+" "+c.right,style:{background:`linear-gradient(135deg, ${j(e.color)?M():"white"}, ${e.color}) border-box`},children:a.jsxs("div",{className:c.talktext,children:[a.jsxs("div",{className:c.icons,children:[a.jsxs(y.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${e.color}`},mode:"single",forceSingleModeWidth:!0,className:c.name,children:[e.message.displayName,":"]}),a.jsx("div",{children:P(t,e.message)})]}),a.jsx(y.Textfit,{min:1,max:1500,mode:"multi",className:c.emotes,children:e.message.message})]})})]},e.message.id)})}_.__docgenInfo={description:"",methods:[],displayName:"Message"};function A(){const[e,s]=m.useState(!1);return a.jsxs(a.Fragment,{children:[!e&&a.jsx(E,{title:"HighliteMessage",callback:()=>s(!0)}),a.jsx(_,{})]})}A.__docgenInfo={description:"",methods:[],displayName:"HighliteMessage"};function L({message:e,color:s,faceImage:t,onRemove:o}){const r=m.useRef(null);return m.useEffect(()=>{const n=setTimeout(()=>{r.current&&(r.current.onanimationend=()=>{o()},r.current.className=c.container+" "+l.fadeOut+" "+l.animated)},5e3);return()=>clearTimeout(n)},[o]),a.jsxs("div",{id:e.id,className:c.container+" "+l.fadeIn+" "+l.animated,ref:r,children:[a.jsxs("div",{className:c["buble-image"],children:[t.type==="image"&&a.jsx("img",{alt:`Face: ${t.name}`,src:t.url}),t.type==="video"&&a.jsx("video",{src:t.url,autoPlay:!0,controls:!1,loop:!0,muted:!0})]}),a.jsx("div",{className:c.bubble+" "+c.right,style:{background:`linear-gradient(135deg, ${j(s)?M():"white"}, ${s}) border-box`},children:a.jsxs("div",{className:c.talktext,children:[a.jsx("div",{className:c.icons,children:a.jsxs(y.Textfit,{min:1,max:1500,style:{fontWeight:"bold",color:`${s}`},mode:"single",forceSingleModeWidth:!0,className:c.name,children:[e.displayName,":"]})}),a.jsx(y.Textfit,{min:1,max:1500,mode:"multi",className:c.emotes,children:e.message})]})})]},e.id)}function x(){const[e,s]=m.useState([]),t=()=>{const r=[{message:{id:`demo-${Date.now()}`,displayName:"Viewer123",message:"Это демо-сообщение для тестирования! 🎉"},color:"#FF6B6B",faceImage:v()},{message:{id:`demo-${Date.now()+1}`,displayName:"StreamFan",message:"Отличный стрим! Спасибо за контент 😊"},color:"#4ECDC4",faceImage:N("video")},{message:{id:`demo-${Date.now()+2}`,displayName:"GamerPro",message:"Как дела? Все хорошо? 🎮"},color:"#45B7D1",faceImage:v()}],n=r[Math.floor(Math.random()*r.length)];s(g=>[...g,n])},o=r=>{s(n=>n.filter(g=>g.message.id!==r))};return m.useEffect(()=>{t();const r=setInterval(t,3e3);return()=>clearInterval(r)},[]),a.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.map(({message:r,color:n,faceImage:g})=>a.jsx(L,{message:r,color:n,faceImage:g,onRemove:()=>o(r.id)},r.id)),a.jsx("button",{onClick:t,style:{position:"fixed",top:"20px",left:"20px",zIndex:1e3,padding:"10px 20px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"5px",cursor:"pointer"},children:"Добавить сообщение"})]})}x.__docgenInfo={description:"",methods:[],displayName:"MessageDemo"};const{expect:i}=__STORYBOOK_MODULE_TEST__,te={title:"Stream Components/HighliteMessage",component:A,parameters:{layout:"fullscreen",docs:{description:{component:"Система всплывающих сообщений с изображениями и анимациями, использующая лица из папки ассетов."}}},tags:["autodocs"],decorators:[e=>a.jsx(e,{})]},d={args:{},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),i(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');i(s.length).toBe(0);const t=e.querySelectorAll("img");i(t.length).toBe(0)}},u={args:{},parameters:{docs:{description:{story:"Пустая система всплывающих сообщений без активных событий."}}},play:async({canvasElement:e})=>{await new Promise(n=>setTimeout(n,100)),i(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="container"]');i(s.length).toBe(0);const t=e.querySelectorAll("img");i(t.length).toBe(0);const o=e.querySelectorAll("video");i(o.length).toBe(0);const r=e.querySelectorAll('[class*="bubble"]');i(r.length).toBe(0)}},p={render:()=>a.jsx(x,{}),parameters:{docs:{description:{story:"Демонстрация работы компонента с тестовыми сообщениями и лицами из ассетов."}}},play:async({canvasElement:e})=>{await new Promise(n=>setTimeout(n,100)),i(e).toBeInTheDocument(),await new Promise(n=>setTimeout(n,1e3));const s=e.querySelectorAll('[class*="container"]');i(s.length).toBeGreaterThan(0);const t=e.querySelectorAll("img, video");i(t.length).toBeGreaterThan(0);const o=e.querySelectorAll('[class*="bubble"]');i(o.length).toBeGreaterThan(0);const r=e.querySelector("button");i(r).toBeInTheDocument(),i(r).toHaveTextContent("Добавить сообщение")}},f={render:()=>a.jsx(x,{}),parameters:{docs:{description:{story:"Демонстрация работы только с изображениями (GIF)."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),i(e).toBeInTheDocument(),await new Promise(t=>setTimeout(t,2e3));const s=e.querySelectorAll("img");i(s.length).toBeGreaterThan(0);for(const t of Array.from(s))i(t).toHaveAttribute("src"),i(t).toHaveAttribute("alt")}},h={render:()=>a.jsx(x,{}),parameters:{docs:{description:{story:"Демонстрация работы только с видео файлами."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),i(e).toBeInTheDocument(),await new Promise(t=>setTimeout(t,2e3));const s=e.querySelectorAll("video");i(s.length).toBeGreaterThan(0);for(const t of Array.from(s))i(t).toHaveAttribute("src"),i(t).toHaveAttribute("autoPlay"),i(t).toHaveAttribute("loop"),i(t).toHaveAttribute("muted")}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
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
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <MessageDemo />,
  parameters: {
    docs: {
      description: {
        story: "Демонстрация работы компонента с тестовыми сообщениями и лицами из ассетов."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Ждем появления первого сообщения
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Проверяем, что появилось сообщение
    const messages = canvasElement.querySelectorAll('[class*="container"]');
    expect(messages.length).toBeGreaterThan(0);

    // Проверяем, что есть изображение или видео
    const mediaElements = canvasElement.querySelectorAll("img, video");
    expect(mediaElements.length).toBeGreaterThan(0);

    // Проверяем, что есть пузырьки с текстом
    const bubbles = canvasElement.querySelectorAll('[class*="bubble"]');
    expect(bubbles.length).toBeGreaterThan(0);

    // Проверяем кнопку добавления сообщений
    const addButton = canvasElement.querySelector('button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Добавить сообщение');
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <MessageDemo />,
  parameters: {
    docs: {
      description: {
        story: "Демонстрация работы только с изображениями (GIF)."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Ждем появления сообщений
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Проверяем, что есть изображения
    const images = canvasElement.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);

    // Проверяем, что изображения загружены
    for (const img of Array.from(images)) {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    }
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <MessageDemo />,
  parameters: {
    docs: {
      description: {
        story: "Демонстрация работы только с видео файлами."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Ждем появления сообщений
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Проверяем, что есть видео
    const videos = canvasElement.querySelectorAll("video");
    expect(videos.length).toBeGreaterThan(0);

    // Проверяем, что видео настроены правильно
    for (const video of Array.from(videos)) {
      expect(video).toHaveAttribute('src');
      expect(video).toHaveAttribute('autoPlay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('muted');
    }
  }
}`,...h.parameters?.docs?.source}}};const ae=["Default","Empty","Demo","ImagesOnly","VideosOnly"];export{d as Default,p as Demo,u as Empty,f as ImagesOnly,h as VideosOnly,ae as __namedExportsOrder,te as default};
