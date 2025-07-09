import{r,j as e}from"./iframe-DP1K2Eq5.js";import{l as P}from"./index-y9Nr13TW.js";import{R as M}from"./RainbowText-BkxiHnYp.js";import{A as Y}from"./Announce-DLRLhSY5.js";import{S as V,v as _}from"./v4-BZBaoDxX.js";const W="_container_6uaez_14",L="_text_6uaez_27",H="_testControls_6uaez_39",J="_testButton_6uaez_46",i={"box-container":"_box-container_6uaez_1",container:W,text:L,testControls:H,testButton:J},K=""+new URL("cirno-D2XWWIuf.webm",import.meta.url).href,X=""+new URL("reimu-DkJ2uSc-.webm",import.meta.url).href,B={cirno:K,reimu:X},U=n=>n in B?B[n]:`./FumosVideos/${n}.webm`;function y({callback:n,displayName:t}){const[s,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{style:{visibility:s?"visible":"hidden"},className:i.container,children:[e.jsxs(P.Textfit,{className:i.text,mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsxs("span",{style:{color:t.color},children:[t.message,"!"]})]}),e.jsx("div",{style:{display:"inline-flex"},children:e.jsx(M,{text:"HAPPY FUMO FRIDAY!"})})]}),e.jsx("div",{children:e.jsx("video",{src:U("cirno"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{n()},1500)}})})]})})}y.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function v({callback:n,displayName:t}){const[s,a]=r.useState(!0);return e.jsx("div",{className:i["box-container"],children:e.jsxs("div",{className:i.container,style:{visibility:s?"visible":"hidden"},children:[e.jsx("div",{children:e.jsx("video",{src:U("reimu"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{a(!1),setTimeout(()=>{n()},1500)}})}),e.jsx("div",{className:i.text,children:e.jsxs(P.Textfit,{mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsx("span",{style:{color:t.color},children:t.message}),"!"]}),e.jsx("div",{children:e.jsx(M,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}v.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function q(){var T,b,j,F;const[,n]=r.useState([]),[t,s]=r.useState(void 0),[a,z]=r.useState(!1);V.useSignalREffect("fumofriday",(o,l)=>{const x={id:_(),message:o,color:l};p(x)},[]);const p=r.useCallback(o=>{n(l=>t?[...l,o]:(s(o),l))},[t]),f=r.useCallback(()=>{z(o=>!o)},[]),g=r.useCallback(o=>{n(l=>{const h=l.filter(x=>x.id!==o.id);return s(h[0]),h}),f()},[f]),w=r.useCallback(()=>{const o={id:_(),message:"Test User",color:"#ff6b6b"};p(o)},[p]);return window.testFumoFriday=w,e.jsxs(e.Fragment,{children:[((T=window==null?void 0:window.location)==null?void 0:T.hostname)==="localhost"&&((F=(j=(b=window==null?void 0:window.parent)==null?void 0:b.location)==null?void 0:j.pathname)==null?void 0:F.includes("iframe.html"))&&e.jsx("div",{className:i.testControls,children:e.jsx("button",{onClick:w,className:i.testButton,disabled:!!t,children:"Test FumoFriday Alert"})}),t&&a&&e.jsx(v,{callback:()=>g(t),displayName:t},t.id),t&&!a&&e.jsx(y,{callback:()=>g(t),displayName:t},t.id)]})}q.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function O(){const[n,t]=r.useState(!1);return document.title="FumoFriday",e.jsxs(e.Fragment,{children:[!n&&e.jsx(Y,{callback:()=>t(!0),title:"FumoFriday"}),e.jsx(q,{})]})}O.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const{expect:c,within:$}=__STORYBOOK_MODULE_TEST__,ne={title:"FumoFriday/FumoFriday",component:O,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[n=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:e.jsx(n,{})})]},d={args:{},play:async({canvasElement:n})=>{const t=$(n);await new Promise(a=>setTimeout(a,100)),c(n).toBeInTheDocument();const s=t.getByText("Test FumoFriday Alert");c(s).toBeInTheDocument(),c(s).toBeEnabled()}},u={render:()=>e.jsx(y,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),c(n).toBeInTheDocument();const t=n.querySelector("video");c(t).toBeInTheDocument()}},m={render:()=>e.jsx(v,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),c(n).toBeInTheDocument();const t=n.querySelector("video");c(t).toBeInTheDocument()}};var S,C,D;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(D=(C=d.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var E,I,R;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(R=(I=u.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var k,A,N;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(N=(A=m.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};const se=["Default","CirnoAlert","ReimuAlert"];export{u as CirnoAlert,d as Default,m as ReimuAlert,se as __namedExportsOrder,ne as default};
