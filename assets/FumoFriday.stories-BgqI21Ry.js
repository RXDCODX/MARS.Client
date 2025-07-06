import{r as a,j as t}from"./iframe-ewsJ7F1S.js";import{w as q,e as o}from"./index-BnesSBbZ.js";import{l as k}from"./index-BmQsvoyR.js";import{R as A}from"./RainbowText-D5145LQ4.js";import{A as z}from"./Announce-C7xQFdBt.js";import{S as V,v as w}from"./v4-BMV8v22Z.js";const W="_container_6uaez_14",Y="_text_6uaez_27",O="_testControls_6uaez_39",H="_testButton_6uaez_46",c={"box-container":"_box-container_6uaez_1",container:W,text:Y,testControls:O,testButton:H},L=""+new URL("cirno-D2XWWIuf.webm",import.meta.url).href,J=""+new URL("reimu-DkJ2uSc-.webm",import.meta.url).href,B={cirno:L,reimu:J},N=n=>n in B?B[n]:`./FumosVideos/${n}.webm`;function h({callback:n,displayName:e}){const[s,i]=a.useState(!0);return t.jsx("div",{className:c["box-container"],children:t.jsxs("div",{style:{visibility:s?"visible":"hidden"},className:c.container,children:[t.jsxs(k.Textfit,{className:c.text,mode:"single",children:[t.jsxs("div",{children:["Поздравляю"," ",t.jsxs("span",{style:{color:e.color},children:[e.message,"!"]})]}),t.jsx("div",{style:{display:"inline-flex"},children:t.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]}),t.jsx("div",{children:t.jsx("video",{src:N("cirno"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{n()},1500)}})})]})})}h.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function f({callback:n,displayName:e}){const[s,i]=a.useState(!0);return t.jsx("div",{className:c["box-container"],children:t.jsxs("div",{className:c.container,style:{visibility:s?"visible":"hidden"},children:[t.jsx("div",{children:t.jsx("video",{src:N("reimu"),autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{n()},1500)}})}),t.jsx("div",{className:c.text,children:t.jsxs(k.Textfit,{mode:"single",children:[t.jsxs("div",{children:["Поздравляю"," ",t.jsx("span",{style:{color:e.color},children:e.message}),"!"]}),t.jsx("div",{children:t.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}f.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function P(){const[n,e]=a.useState([]),[s,i]=a.useState(void 0),[v,U]=a.useState(!1);V.useSignalREffect("fumofriday",(r,l)=>{const x={id:w(),message:r,color:l};p(x)},[]);const p=a.useCallback(r=>{e(l=>s?[...l,r]:(i(r),l))},[s]),g=a.useCallback(()=>{U(r=>!r)},[]),T=a.useCallback(r=>{e(l=>{const y=l.filter(x=>x.id!==r.id);return i(y[0]),y}),g()},[g]),b=a.useCallback(()=>{const r={id:w(),message:"Test User",color:"#ff6b6b"};p(r)},[p]);return window.testFumoFriday=b,t.jsxs(t.Fragment,{children:[t.jsx("div",{className:c.testControls,children:t.jsx("button",{onClick:b,className:c.testButton,disabled:!!s,children:"Test FumoFriday Alert"})}),s&&v&&t.jsx(f,{callback:()=>T(s),displayName:s},s.id),s&&!v&&t.jsx(h,{callback:()=>T(s),displayName:s},s.id)]})}P.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function M(){const[n,e]=a.useState(!1);return document.title="FumoFriday",t.jsxs(t.Fragment,{children:[!n&&t.jsx(z,{callback:()=>e(!0),title:"FumoFriday"}),t.jsx(P,{})]})}M.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const ee={title:"FumoFriday/FumoFriday",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[n=>t.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:t.jsx(n,{})})]},d={args:{},play:async({canvasElement:n})=>{const e=q(n);await new Promise(i=>setTimeout(i,100)),o(n).toBeInTheDocument();const s=e.getByText("Test FumoFriday Alert");o(s).toBeInTheDocument(),o(s).toBeEnabled()}},u={render:()=>t.jsx(h,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),o(n).toBeInTheDocument();const e=n.querySelector("video");o(e).toBeInTheDocument(),o(e==null?void 0:e.src).toBeTruthy(),o(e==null?void 0:e.autoplay).toBe(!0),o(e==null?void 0:e.controls).toBe(!1)}},m={render:()=>t.jsx(f,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:n})=>{await new Promise(s=>setTimeout(s,100)),o(n).toBeInTheDocument();const e=n.querySelector("video");o(e).toBeInTheDocument(),o(e==null?void 0:e.src).toBeTruthy(),o(e==null?void 0:e.autoplay).toBe(!0),o(e==null?void 0:e.controls).toBe(!1)}};var j,F,_;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(_=(F=d.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var S,C,I;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
    expect(video?.src).toBeTruthy();
    expect(video?.autoplay).toBe(true);
    expect(video?.controls).toBe(false);
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
    expect(video?.src).toBeTruthy();
    expect(video?.autoplay).toBe(true);
    expect(video?.controls).toBe(false);
  }
}`,...(R=(E=m.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};const te=["Default","CirnoAlert","ReimuAlert"];export{u as CirnoAlert,d as Default,m as ReimuAlert,te as __namedExportsOrder,ee as default};
