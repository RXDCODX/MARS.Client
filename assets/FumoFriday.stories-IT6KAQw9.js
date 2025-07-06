import{r,j as e}from"./iframe-CTrkdtAc.js";import{w as q,e as c}from"./index-BnesSBbZ.js";import{l as k}from"./index-WpBykvsV.js";import{R as A}from"./RainbowText-_E_8DaB5.js";import{A as z}from"./Announce-C-wCrUmF.js";import{S as V,v as T}from"./v4-CkG-Yvg4.js";const W="_container_6uaez_14",Y="_text_6uaez_27",O="_testControls_6uaez_39",H="_testButton_6uaez_46",i={"box-container":"_box-container_6uaez_1",container:W,text:Y,testControls:O,testButton:H},L=""+new URL("cirno-D2XWWIuf.webm",import.meta.url).href,J=""+new URL("reimu-DkJ2uSc-.webm",import.meta.url).href,j={cirno:L,reimu:J},N=s=>s in j?j[s]:`./FumosVideos/${s}.webm`;function y({callback:s,displayName:n}){const[t,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{style:{visibility:t?"visible":"hidden"},className:i.container,children:[e.jsxs(k.Textfit,{className:i.text,mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsxs("span",{style:{color:n.color},children:[n.message,"!"]})]}),e.jsx("div",{style:{display:"inline-flex"},children:e.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]}),e.jsx("div",{children:e.jsx("video",{src:N("cirno"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{s()},1500)}})})]})})}y.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function v({callback:s,displayName:n}){const[t,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{className:i.container,style:{visibility:t?"visible":"hidden"},children:[e.jsx("div",{children:e.jsx("video",{src:N("reimu"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{s()},1500)}})}),e.jsx("div",{className:i.text,children:e.jsxs(k.Textfit,{mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsx("span",{style:{color:n.color},children:n.message}),"!"]}),e.jsx("div",{children:e.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}v.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function P(){const[s,n]=r.useState([]),[t,a]=r.useState(void 0),[f,U]=r.useState(!1);V.useSignalREffect("fumofriday",(o,l)=>{const h={id:T(),message:o,color:l};p(h)},[]);const p=r.useCallback(o=>{n(l=>t?[...l,o]:(a(o),l))},[t]),g=r.useCallback(()=>{U(o=>!o)},[]),b=r.useCallback(o=>{n(l=>{const x=l.filter(h=>h.id!==o.id);return a(x[0]),x}),g()},[g]),w=r.useCallback(()=>{const o={id:T(),message:"Test User",color:"#ff6b6b"};p(o)},[p]);return window.testFumoFriday=w,e.jsxs(e.Fragment,{children:[e.jsx("div",{className:i.testControls,children:e.jsx("button",{onClick:w,className:i.testButton,disabled:!!t,children:"Test FumoFriday Alert"})}),t&&f&&e.jsx(v,{callback:()=>b(t),displayName:t},t.id),t&&!f&&e.jsx(y,{callback:()=>b(t),displayName:t},t.id)]})}P.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function M(){const[s,n]=r.useState(!1);return document.title="FumoFriday",e.jsxs(e.Fragment,{children:[!s&&e.jsx(z,{callback:()=>n(!0),title:"FumoFriday"}),e.jsx(P,{})]})}M.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const ee={title:"FumoFriday/FumoFriday",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:e.jsx(s,{})})]},d={args:{},play:async({canvasElement:s})=>{const n=q(s);await new Promise(a=>setTimeout(a,100)),c(s).toBeInTheDocument();const t=n.getByText("Test FumoFriday Alert");c(t).toBeInTheDocument(),c(t).toBeEnabled()}},u={render:()=>e.jsx(y,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:s})=>{await new Promise(t=>setTimeout(t,100)),c(s).toBeInTheDocument();const n=s.querySelector("video");c(n).toBeInTheDocument()}},m={render:()=>e.jsx(v,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:s})=>{await new Promise(t=>setTimeout(t,100)),c(s).toBeInTheDocument();const n=s.querySelector("video");c(n).toBeInTheDocument()}};var F,_,B;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что кнопка тестирования присутствует
    const testButton = canvas.getByText('Test FumoFriday Alert');
    expect(testButton).toBeInTheDocument();
    expect(testButton).toBeEnabled();
  }
}`,...(B=(_=d.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var S,C,I;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Cirno displayName={{
    id: 'test-id',
    message: 'Test User',
    color: '#ff6b6b'
  }} callback={() => console.log('Cirno alert finished')} />,
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector('video');
    expect(video).toBeInTheDocument();
  }
}`,...(I=(C=u.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var D,E,R;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Reimu displayName={{
    id: 'test-id',
    message: 'Test User',
    color: '#4ecdc4'
  }} callback={() => console.log('Reimu alert finished')} />,
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector('video');
    expect(video).toBeInTheDocument();
  }
}`,...(R=(E=m.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};const te=["Default","CirnoAlert","ReimuAlert"];export{u as CirnoAlert,d as Default,m as ReimuAlert,te as __namedExportsOrder,ee as default};
