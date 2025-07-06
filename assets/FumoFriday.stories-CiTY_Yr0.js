import{r,j as e}from"./iframe-DqfnGlCG.js";import{w as y,e as a}from"./index-BnesSBbZ.js";import{l as R}from"./index-D97MGZuM.js";import{R as k}from"./RainbowText-DOyXZpbl.js";import{A as q}from"./Announce-Ij5EI4Bx.js";import{S as z,v as j}from"./v4-BLKDVEyC.js";const W="_container_6uaez_14",Y="_text_6uaez_27",O="_testControls_6uaez_39",H="_testButton_6uaez_46",c={"box-container":"_box-container_6uaez_1",container:W,text:Y,testControls:O,testButton:H},L=""+new URL("cirno-D2XWWIuf.webm",import.meta.url).href,V=""+new URL("reimu-DkJ2uSc-.webm",import.meta.url).href,A={cirno:L,reimu:V};function v({callback:s,displayName:t}){const[n,i]=r.useState(!0);return e.jsx("div",{className:c["box-container"],children:e.jsxs("div",{style:{visibility:n?"visible":"hidden"},className:c.container,children:[e.jsxs(R.Textfit,{className:c.text,mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsxs("span",{style:{color:t.color},children:[t.message,"!"]})]}),e.jsx("div",{style:{display:"inline-flex"},children:e.jsx(k,{text:"HAPPY FUMO FRIDAY!"})})]}),e.jsx("div",{children:e.jsx("video",{src:A.cirno,autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{s()},1500)}})})]})})}v.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function f({callback:s,displayName:t}){const[n,i]=r.useState(!0);return e.jsx("div",{className:c["box-container"],children:e.jsxs("div",{className:c.container,style:{visibility:n?"visible":"hidden"},children:[e.jsx("div",{children:e.jsx("video",{src:A.reimu,autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{s()},1500)}})}),e.jsx("div",{className:c.text,children:e.jsxs(R.Textfit,{mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsx("span",{style:{color:t.color},children:t.message}),"!"]}),e.jsx("div",{children:e.jsx(k,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}f.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function P(){const[s,t]=r.useState([]),[n,i]=r.useState(void 0),[g,U]=r.useState(!1);z.useSignalREffect("fumofriday",(o,l)=>{const h={id:j(),message:o,color:l};p(h)},[]);const p=r.useCallback(o=>{t(l=>n?[...l,o]:(i(o),l))},[n]),w=r.useCallback(()=>{U(o=>!o)},[]),b=r.useCallback(o=>{t(l=>{const x=l.filter(h=>h.id!==o.id);return i(x[0]),x}),w()},[w]),T=r.useCallback(()=>{const o={id:j(),message:"Test User",color:"#ff6b6b"};p(o)},[p]);return window.testFumoFriday=T,e.jsxs(e.Fragment,{children:[e.jsx("div",{className:c.testControls,children:e.jsx("button",{onClick:T,className:c.testButton,disabled:!!n,children:"Test FumoFriday Alert"})}),n&&g&&e.jsx(f,{callback:()=>b(n),displayName:n},n.id),n&&!g&&e.jsx(v,{callback:()=>b(n),displayName:n},n.id)]})}P.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function M(){const[s,t]=r.useState(!1);return document.title="FumoFriday",e.jsxs(e.Fragment,{children:[!s&&e.jsx(q,{callback:()=>t(!0),title:"FumoFriday"}),e.jsx(P,{})]})}M.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const $={title:"FumoFriday/FumoFriday",component:M,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:e.jsx(s,{})})]},d={args:{},play:async({canvasElement:s})=>{const t=y(s);await new Promise(i=>setTimeout(i,100)),a(s).toBeInTheDocument();const n=t.getByText("Test FumoFriday Alert");a(n).toBeInTheDocument(),a(n).toBeEnabled()}},m={render:()=>e.jsx(v,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:s})=>{y(s),await new Promise(n=>setTimeout(n,100)),a(s).toBeInTheDocument();const t=s.querySelector("video");a(t).toBeInTheDocument(),a(t==null?void 0:t.src).toContain("cirno.webm")}},u={render:()=>e.jsx(f,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:s})=>{y(s),await new Promise(n=>setTimeout(n,100)),a(s).toBeInTheDocument();const t=s.querySelector("video");a(t).toBeInTheDocument(),a(t==null?void 0:t.src).toContain("reimu.webm")}};var F,_,B;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(B=(_=d.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var C,S,I;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Cirno displayName={{
    id: 'test-id',
    message: 'Test User',
    color: '#ff6b6b'
  }} callback={() => console.log('Cirno alert finished')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.src).toContain('cirno.webm');
  }
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var D,N,E;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Reimu displayName={{
    id: 'test-id',
    message: 'Test User',
    color: '#4ecdc4'
  }} callback={() => console.log('Reimu alert finished')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что видео присутствует
    const video = canvasElement.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.src).toContain('reimu.webm');
  }
}`,...(E=(N=u.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};const ee=["Default","CirnoAlert","ReimuAlert"];export{m as CirnoAlert,d as Default,u as ReimuAlert,ee as __namedExportsOrder,$ as default};
