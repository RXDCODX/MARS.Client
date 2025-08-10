import{r,j as e}from"./iframe-BC7DeeL6.js";import{l as j}from"./index-B_SPtptC.js";import{R as F}from"./RainbowText-ZPTXAdAu.js";import{A as D}from"./Announce-BcX6v2AV.js";import{S as E,v as T}from"./index-RHBF0zT8.js";import"./index-Chjiymov.js";import"./index-BhlHwfix.js";const I="_container_6uaez_14",R="_text_6uaez_27",k="_testControls_6uaez_39",A="_testButton_6uaez_46",i={"box-container":"_box-container_6uaez_1",container:I,text:R,testControls:k,testButton:A},N=""+new URL("cirno-D2XWWIuf.webm",import.meta.url).href,P=""+new URL("reimu-DkJ2uSc-.webm",import.meta.url).href,b={cirno:N,reimu:P},_=n=>n in b?b[n]:`./FumosVideos/${n}.webm`;function y({callback:n,displayName:t}){const[s,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{style:{visibility:s?"visible":"hidden"},className:i.container,children:[e.jsxs(j.Textfit,{className:i.text,mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsxs("span",{style:{color:t.color},children:[t.message,"!"]})]}),e.jsx("div",{style:{display:"inline-flex"},children:e.jsx(F,{text:"HAPPY FUMO FRIDAY!"})})]}),e.jsx("div",{children:e.jsx("video",{src:_("cirno"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{n()},1500)}})})]})})}y.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function v({callback:n,displayName:t}){const[s,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{className:i.container,style:{visibility:s?"visible":"hidden"},children:[e.jsx("div",{children:e.jsx("video",{src:_("reimu"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{n()},1500)}})}),e.jsx("div",{className:i.text,children:e.jsxs(j.Textfit,{mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsx("span",{style:{color:t.color},children:t.message}),"!"]}),e.jsx("div",{children:e.jsx(F,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}v.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function B(){const[,n]=r.useState([]),[t,s]=r.useState(void 0),[a,C]=r.useState(!1);E.useSignalREffect("fumofriday",(o,l)=>{const x={id:T(),message:o,color:l};p(x)},[]);const p=r.useCallback(o=>{n(l=>t?[...l,o]:(s(o),l))},[t]),f=r.useCallback(()=>{C(o=>!o)},[]),g=r.useCallback(o=>{n(l=>{const h=l.filter(x=>x.id!==o.id);return s(h[0]),h}),f()},[f]),w=r.useCallback(()=>{const o={id:T(),message:"Test User",color:"#ff6b6b"};p(o)},[p]);return window.testFumoFriday=w,e.jsxs(e.Fragment,{children:[window?.location?.hostname==="localhost"&&window?.parent?.location?.pathname?.includes("iframe.html")&&e.jsx("div",{className:i.testControls,children:e.jsx("button",{onClick:w,className:i.testButton,disabled:!!t,children:"Test FumoFriday Alert"})}),t&&a&&e.jsx(v,{callback:()=>g(t),displayName:t},t.id),t&&!a&&e.jsx(y,{callback:()=>g(t),displayName:t},t.id)]})}B.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function S(){const[n,t]=r.useState(!1);return document.title="FumoFriday",e.jsxs(e.Fragment,{children:[!n&&e.jsx(D,{callback:()=>t(!0),title:"FumoFriday"}),e.jsx(B,{})]})}S.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const{expect:c,within:M}=__STORYBOOK_MODULE_TEST__,L={title:"FumoFriday/FumoFriday",component:S,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:e.jsx(n,{})})]},d={args:{},play:async({canvasElement:n})=>{const t=M(n);await new Promise(a=>setTimeout(a,100)),c(n).toBeInTheDocument();const s=t.getByText("Test FumoFriday Alert");c(s).toBeInTheDocument(),c(s).toBeEnabled()}},m={render:()=>e.jsx(y,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),c(n).toBeInTheDocument();const t=n.querySelector("video");c(t).toBeInTheDocument()}},u={render:()=>e.jsx(v,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),c(n).toBeInTheDocument();const t=n.querySelector("video");c(t).toBeInTheDocument()}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
    const testButton = canvas.getByText("Test FumoFriday Alert");
    expect(testButton).toBeInTheDocument();
    expect(testButton).toBeEnabled();
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Cirno displayName={{
    id: "test-id",
    message: "Test User",
    color: "#ff6b6b"
  }} callback={() => console.log("Cirno alert finished")} />,
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Reimu displayName={{
    id: "test-id",
    message: "Test User",
    color: "#4ecdc4"
  }} callback={() => console.log("Reimu alert finished")} />,
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}};const H=["Default","CirnoAlert","ReimuAlert"];export{m as CirnoAlert,d as Default,u as ReimuAlert,H as __namedExportsOrder,L as default};
