import{r as a,j as l}from"./iframe-PHcFrRmL.js";import"./SignalRHubWrapper-CTmjHOC8.js";import{M as y}from"./data-contracts-97ndRDDy.js";import{A as S}from"./Announce-EktwlB1f.js";import{v as E,S as g}from"./index-DRkwuvcd.js";import{H as w,A as T}from"./HighPriorityAlert-7jjzcENJ.js";import"./preload-helper-D9Z9MdNV.js";import"./index-DwFFu-Uq.js";import"./index-mUHz-xqE.js";import"./index-Chjiymov.js";import"./index-Dh_JeCgC.js";import"./react-XNwDcf-4.js";import"./KeyWordedText-2W8VutCa.js";function I(){const[o,i]=a.useState([]),[n,c]=a.useState([]),[s,p]=a.useState(null),[P,A]=a.useState(!1),d=a.useCallback(e=>{e.mediaInfo.id=E();const t={...e,mediaInfo:{...e.mediaInfo,fileInfo:{...e.mediaInfo.fileInfo,filePath:e.mediaInfo.fileInfo.isLocalFile?"http://localhost:9155/"+e.mediaInfo.fileInfo.filePath:e.mediaInfo.fileInfo.filePath}}};switch(e.mediaInfo.metaInfo.priority){case y.High:c(r=>[...r,t]),i([]);break;case y.Low:case y.Normal:i(r=>[...r,t]);break}},[]),v=a.useCallback(e=>{i(t=>t.filter(r=>r.mediaInfo.id!==e.mediaInfo.id))},[]),x=a.useCallback(e=>{c(t=>{t=t.filter(h=>h.mediaInfo.id!==e.mediaInfo.id);const r=t.some(h=>h)?t[0]:null;return p(r),t})},[c]);return a.useEffect(()=>{if(n.length>0&&!s){const e=n[0];p(e);const t=setTimeout(()=>{c(r=>r.slice(1)),p(null)},2e3);return()=>clearTimeout(t)}},[n,s]),g.useSignalREffect("alert",d,[d]),g.useSignalREffect("alerts",e=>e.forEach(d),[d]),l.jsxs(l.Fragment,{children:[!P&&l.jsx(S,{title:"PyroAlerts",callback:()=>A(!0)}),s&&l.jsx(w,{message:s,type:s.mediaInfo.fileInfo.type,callback:()=>x(s)},s.mediaInfo.id),!s&&o.map(e=>l.jsx(T,{message:e,remove:v},e.mediaInfo.id))]})}I.__docgenInfo={description:"",methods:[],displayName:"PyroAlerts"};const{expect:m}=__STORYBOOK_MODULE_TEST__,U={title:"Stream Components/PyroAlerts",component:I,parameters:{layout:"fullscreen",docs:{description:{component:"Система алертов для стрима с поддержкой различных типов медиа (изображения, видео, аудио)."}}},tags:["autodocs"],decorators:[o=>l.jsx("div",{style:{width:"100vw",height:"100vh",background:"#000",position:"relative",overflow:"hidden"},children:l.jsx(o,{})})]},u={args:{},play:async({canvasElement:o})=>{await new Promise(n=>setTimeout(n,100)),m(o).toBeInTheDocument();const i=o.querySelectorAll('[class*="media"]');m(i.length).toBe(0)}},f={args:{},parameters:{docs:{description:{story:"Пустая система алертов без активных уведомлений."}}},play:async({canvasElement:o})=>{await new Promise(c=>setTimeout(c,100)),m(o).toBeInTheDocument();const i=o.querySelectorAll('[class*="media"]');m(i.length).toBe(0);const n=o.querySelectorAll('[class*="highPriority"]');m(n.length).toBe(0)}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных алертов изначально
    const alerts = canvasElement.querySelectorAll('[class*="media"]');
    expect(alerts.length).toBe(0);
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Пустая система алертов без активных уведомлений."
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

    // Проверяем, что нет алертов
    const alerts = canvasElement.querySelectorAll('[class*="media"]');
    expect(alerts.length).toBe(0);

    // Проверяем, что нет высокоприоритетных алертов
    const highPriorityAlerts = canvasElement.querySelectorAll('[class*="highPriority"]');
    expect(highPriorityAlerts.length).toBe(0);
  }
}`,...f.parameters?.docs?.source}}};const F=["Default","Empty"];export{u as Default,f as Empty,F as __namedExportsOrder,U as default};
