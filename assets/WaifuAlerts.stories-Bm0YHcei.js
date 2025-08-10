import{r as i,j as a}from"./iframe-PHcFrRmL.js";import{S as I}from"./index-DFE0nmKJ.js";import{l as v}from"./index-mUHz-xqE.js";import{a as S}from"./animate.module-CI42XwLX.js";import{b as D,u as C,g as q,c as U}from"./index-Dh_JeCgC.js";import{A as _}from"./Announce-EktwlB1f.js";import{S as p}from"./index-DRkwuvcd.js";import{s as c,W as H}from"./WaifuRoulette-DvR85TOI.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Chjiymov.js";import"./react-XNwDcf-4.js";import"./index-DwFFu-Uq.js";function O(t){const e=[...t];for(let r=e.length-1;r>0;r--){const s=Math.floor(Math.random()*(r+1));[e[r],e[s]]=[e[s],e[r]]}return e}function W(t){let e;return t.waifu.isAdded?e="ты добавил":t.waifu.isMerged?e="поженился с":e="тебе выпал(-а)",e+" "+t.waifu.name}function E(t){return t.waifu.anime?`из аниме ${t.waifu.anime}`:`из манги ${t.waifu.manga}`}const z=["Кстати","К слову","Между прочим","Кстати сказать","В самом деле","Во всяком случае","Фактически"];function L(t){if(!t.waifuHusband||!t.waifu.isPrivated||!t.waifuHusband.whenPrivated)return"";const e=new Date(t.waifuHusband.whenPrivated),s=new Date().getTime()-e.getTime(),n={days:Math.floor(s/(1e3*60*60*24)),hours:Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(s%(1e3*60*60)/(1e3*60)),seconds:Math.floor(s%(1e3*60)/1e3)},d=K(n,t.waifu),l=D(0,z.length-1);return` ${z[l]}, ${d}`}function K(t,e){const r=t.days,s=Math.floor(r/365);let n=r%365;const d=Math.floor(n/30);n%=30;const l=Math.floor(n/7);n%=7;const h=[s>0?`${s} ${f(s,"год","года","лет")}`:null,d>0?`${d} ${f(d,"месяц","месяца","месяцев")}`:null,l>0?`${l} ${f(l,"неделя","недели","недель")}`:null,n>0?`${n} ${f(n,"день","дня","дней")}`:null,t.hours>0?`${t.hours} ${f(t.hours,"час","часа","часов")}`:null,t.minutes>0?`${t.minutes} ${f(t.minutes,"минута","минуты","минут")}`:null,t.seconds>0?`${t.seconds} ${f(t.seconds,"секунда","секунды","секунд")}`:null].filter(Boolean),g=e.anime?.trim()?" из аниме "+e.anime:" из манги "+e.manga;return`ты в браке с ${e.name}${g} уже ${h.join(", ")}!`}function f(t,e,r,s){t=Math.abs(t)%100;const n=t%10;return t>10&&t<20?s:n>1&&n<5?r:n===1?e:s}function Y(t,e){switch(e.type){case 0:return e.waifu?t.isWaifuShowing?{...t,messages:[...t.messages,e.waifu]}:{...t,messages:[...t.messages],currentMessage:e.waifu,isWaifuShowing:!0}:t;case 1:if(e.waifu===void 0)return{...t};if(t.messages.length>0){const r=t.messages.filter(s=>s.waifu.shikiId!==e.waifu.waifu.shikiId);if(r.length>0){const s=r[0];return{...t,messages:r,currentMessage:s,isWaifuShowing:!0}}return{...t,isWaifuShowing:!1,messages:r,currentMessage:void 0}}return{...t,messages:[],currentMessage:void 0,isWaifuShowing:!1};case 2:{const r=U(t.prizes??[],e.prizes??[],(s,n)=>s.id===n.id);return r.forEach(s=>{if(s.image){const n=new Image;n.src=s.image}}),{...t,prizes:[...t.prizes,...r]}}case 3:return{...t,prizes:O(t.prizes??[])}}}function F(){const t={messages:[],isWaifuShowing:!1,prizes:[]},[{currentMessage:e,prizes:r},s]=i.useReducer(Y,t),[n,d]=i.useState(!1),l=i.useRef(null),[h,g]=i.useState(!1),[$,x]=i.useState(-1),N=C(o=>o.sendMsgToPyrokxnezxz);p.useSignalREffect("waifuroll",(o,u,w,y)=>{M({waifu:o,displayName:u,waifuHusband:w,color:y})},[]),p.useSignalREffect("addnewwaifu",(o,u,w)=>{o.isAdded=!0,M({waifu:o,displayName:u,color:w})},[]),p.useSignalREffect("Mergewaifu",(o,u,w,y)=>{o.isMerged=!0;const k={waifu:o,displayName:u.name,waifuHusband:u,color:y,avatarUrl:w};M(k)},[]),p.useSignalREffect("UpdateWaifuPrizes",async o=>{s({type:2,prizes:o})},[]);function M(o){s({type:0,waifu:o})}function b(o){s({type:1,waifu:o})}function R(){s({type:3})}i.useEffect(()=>{if(e&&r){const o=r.findIndex(u=>u.id===e.waifu.shikiId);x(o)}},[r,e]),i.useEffect(()=>{e&&(e.waifu.isMerged||e.waifu.isAdded)&&g(!0)},[e]);const B=i.useCallback(()=>{p.invoke("MuteAll",[])},[]),T=i.useCallback(()=>{p.invoke("UnmuteSessions")},[]),P=i.useCallback(o=>{throw T(),b(o),Error("Failed to play audio")},[T]);return a.jsxs("div",{className:c.textShadow,children:[!n&&a.jsx(_,{title:"WaifuRoll",callback:()=>d(!0)}),e&&!h&&$!==-1&&a.jsx(H,{callback:()=>{g(!0),x(-1)},rouletteIndex:$,prizes:r||[],name:e.displayName,color:e.color},e.waifu.shikiId),e&&h&&!e.waifu.isMerged&&a.jsxs("div",{id:e.waifu.shikiId,ref:l,className:c.baza+" "+S.bounceIn+" "+S.animated,children:[a.jsx("div",{className:c["alert-box"],children:a.jsx("img",{src:e.waifu.imageUrl,style:{height:"498px",width:"320px"},onLoad:()=>{setTimeout(()=>{l.current.onanimationend=()=>{b(e),x(-1),g(!1),R()},l.current.className=c.baza+" "+S.bounceOut+" "+S.animated},7e3),e.waifu.isAdded||N(`@${e.displayName}, ${W(e)} ${E(e)}!${L(e)}`)}})}),a.jsxs("div",{className:c["alert-box"],children:[a.jsx("span",{className:"text-shadow block-text",style:{color:"white"},children:a.jsx(v.Textfit,{min:1,max:1500,forceSingleModeWidth:!0,children:e.displayName.toUpperCase()})}),a.jsx("span",{className:"text-shadow block-text",style:{color:"cornflowerblue"},children:a.jsx(v.Textfit,{min:1,max:1500,forceSingleModeWidth:!0,children:W(e)})}),a.jsx("span",{className:"text-shadow block-text",style:{color:"red"},children:a.jsx(v.Textfit,{min:1,max:1500,forceSingleModeWidth:!0,children:E(e)})})]})]},e.waifu.shikiId),e&&h&&e.waifu.isMerged&&a.jsxs(a.Fragment,{children:[a.jsx(I,{width:"100%",height:"100%",autorun:{speed:30,duration:20*1e3},decorateOptions:()=>({particleCount:2,angle:60,spread:55,origin:{x:0},colors:["#000000","#FF0000","#FFFFFF"]})}),a.jsx(I,{width:"100%",height:"100%",autorun:{speed:30,duration:20*1e3},decorateOptions:()=>({particleCount:2,angle:120,spread:55,origin:{x:1},colors:["#000000","#FF0000","#FFFFFF"]})}),a.jsxs("div",{className:c["merge-container"],children:[a.jsx("div",{className:c["merge-image"],children:a.jsx("img",{src:e.avatarUrl})}),a.jsx("div",{className:c["merge-text"],children:a.jsxs(v.Textfit,{style:{color:"white"},mode:"multi",min:1,max:2e3,children:["Поздравляем"," ",a.jsx("span",{style:{color:e.color},children:e.waifuHusband.name})," ","и"," ",a.jsxs("span",{style:{color:q()},children:[e.waifu.name," "]})," ","из"," ",a.jsx("span",{style:{color:e.waifu.anime?"blue":"gold"},children:E(e)})," ","с свадьбой!"]})}),a.jsx("div",{className:c["merge-image"],children:a.jsx("img",{src:e.waifu.imageUrl})})]}),a.jsx("audio",{controls:!1,autoPlay:!0,onError:()=>P(e),onEnded:()=>{g(!0),x(-1),T(),b(e)},onCanPlay:o=>{try{o.currentTarget?.play()}catch{o.currentTarget.muted=!0,o.currentTarget?.play()}},onCanPlayThrough:()=>B(),children:a.jsx("source",{src:"http://localhost:9155/Alerts/svadba.mp3"})},e.waifu.shikiId)]})]})}F.__docgenInfo={description:"",methods:[],displayName:"WaifuAlerts"};const{expect:m}=__STORYBOOK_MODULE_TEST__,ne={title:"Stream Components/WaifuAlerts",component:F,parameters:{layout:"fullscreen",docs:{description:{component:"Система алертов для вайфу-рулетки с анимациями и рулеткой."}}},tags:["autodocs"],decorators:[t=>a.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:a.jsx(t,{})})]},j={args:{},play:async({canvasElement:t})=>{await new Promise(s=>setTimeout(s,100)),m(t).toBeInTheDocument();const e=t.querySelectorAll('[class*="baza"]');m(e.length).toBe(0);const r=t.querySelectorAll('[class*="roulette"]');m(r.length).toBe(0)}},A={args:{},parameters:{docs:{description:{story:"Пустая система вайфу-алертов без активных событий."}}},play:async({canvasElement:t})=>{await new Promise(n=>setTimeout(n,100)),m(t).toBeInTheDocument();const e=t.querySelectorAll('[class*="baza"]');m(e.length).toBe(0);const r=t.querySelectorAll('[class*="roulette"]');m(r.length).toBe(0);const s=t.querySelectorAll("canvas");m(s.length).toBe(0)}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных вайфу-алертов изначально
    const waifuAlerts = canvasElement.querySelectorAll('[class*="baza"]');
    expect(waifuAlerts.length).toBe(0);

    // Проверяем, что нет рулетки изначально
    const roulette = canvasElement.querySelectorAll('[class*="roulette"]');
    expect(roulette.length).toBe(0);
  }
}`,...j.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Пустая система вайфу-алертов без активных событий."
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

    // Проверяем, что нет вайфу-алертов
    const waifuAlerts = canvasElement.querySelectorAll('[class*="baza"]');
    expect(waifuAlerts.length).toBe(0);

    // Проверяем, что нет рулетки
    const roulette = canvasElement.querySelectorAll('[class*="roulette"]');
    expect(roulette.length).toBe(0);

    // Проверяем, что нет конфетти
    const confetti = canvasElement.querySelectorAll("canvas");
    expect(confetti.length).toBe(0);
  }
}`,...A.parameters?.docs?.source}}};const ie=["Default","Empty"];export{j as Default,A as Empty,ie as __namedExportsOrder,ne as default};
