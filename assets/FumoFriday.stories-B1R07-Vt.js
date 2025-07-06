import{r as a,j as e}from"./iframe-Cc9wzQT7.js";import{w as h,e as r}from"./index-BnesSBbZ.js";import{l as k}from"./index-D9M-HuQA.js";import{R as A}from"./RainbowText-DjlVCbIY.js";import{A as q}from"./Announce-BmbYK6Ie.js";import{S as U,v as T}from"./v4-Bi0dVoRz.js";const z="_container_6uaez_14",Y="_text_6uaez_27",O="_testControls_6uaez_39",H="_testButton_6uaez_46",c={"box-container":"_box-container_6uaez_1",container:z,text:Y,testControls:O,testButton:H};function v({callback:s,displayName:t}){const[n,i]=a.useState(!0);return e.jsx("div",{className:c["box-container"],children:e.jsxs("div",{style:{visibility:n?"visible":"hidden"},className:c.container,children:[e.jsxs(k.Textfit,{className:c.text,mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsxs("span",{style:{color:t.color},children:[t.message,"!"]})]}),e.jsx("div",{style:{display:"inline-flex"},children:e.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]}),e.jsx("div",{children:e.jsx("video",{src:"/src/components/FumoFriday/FumosVideos/cirno.webm",autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{s()},1500)}})})]})})}v.__docgenInfo={description:"",methods:[],displayName:"Cirno",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function f({callback:s,displayName:t}){const[n,i]=a.useState(!0);return e.jsx("div",{className:c["box-container"],children:e.jsxs("div",{className:c.container,style:{visibility:n?"visible":"hidden"},children:[e.jsx("div",{children:e.jsx("video",{src:"/src/components/FumoFriday/FumosVideos/reimu.webm",autoPlay:!0,controls:!1,style:{maxWidth:"100%"},onEnded:()=>{i(!1),setTimeout(()=>{s()},1500)}})}),e.jsx("div",{className:c.text,children:e.jsxs(k.Textfit,{mode:"single",children:[e.jsxs("div",{children:["Поздравляю"," ",e.jsx("span",{style:{color:t.color},children:t.message}),"!"]}),e.jsx("div",{children:e.jsx(A,{text:"HAPPY FUMO FRIDAY!"})})]})})]})})}f.__docgenInfo={description:"",methods:[],displayName:"Reimu",props:{displayName:{required:!0,tsType:{name:"Message"},description:""},callback:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function R(){const[s,t]=a.useState([]),[n,i]=a.useState(void 0),[g,M]=a.useState(!1);U.useSignalREffect("fumofriday",(o,l)=>{const y={id:T(),message:o,color:l};p(y)},[]);const p=a.useCallback(o=>{t(l=>n?[...l,o]:(i(o),l))},[n]),b=a.useCallback(()=>{M(o=>!o)},[]),w=a.useCallback(o=>{t(l=>{const x=l.filter(y=>y.id!==o.id);return i(x[0]),x}),b()},[b]),F=a.useCallback(()=>{const o={id:T(),message:"Test User",color:"#ff6b6b"};p(o)},[p]);return window.testFumoFriday=F,e.jsxs(e.Fragment,{children:[e.jsx("div",{className:c.testControls,children:e.jsx("button",{onClick:F,className:c.testButton,disabled:!!n,children:"Test FumoFriday Alert"})}),n&&g&&e.jsx(f,{callback:()=>w(n),displayName:n},n.id),n&&!g&&e.jsx(v,{callback:()=>w(n),displayName:n},n.id)]})}R.__docgenInfo={description:"",methods:[],displayName:"FumoFridayController"};function P(){const[s,t]=a.useState(!1);return document.title="FumoFriday",e.jsxs(e.Fragment,{children:[!s&&e.jsx(q,{callback:()=>t(!0),title:"FumoFriday"}),e.jsx(R,{})]})}P.__docgenInfo={description:"",methods:[],displayName:"FumoFriday"};const Q={title:"FumoFriday/FumoFriday",component:P,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для празднования Fumo Friday с анимациями и видео."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:e.jsx(s,{})})]},d={args:{},play:async({canvasElement:s})=>{const t=h(s);await new Promise(i=>setTimeout(i,100)),r(s).toBeInTheDocument();const n=t.getByText("Test FumoFriday Alert");r(n).toBeInTheDocument(),r(n).toBeEnabled()}},m={render:()=>e.jsx(v,{displayName:{id:"test-id",message:"Test User",color:"#ff6b6b"},callback:()=>console.log("Cirno alert finished")}),play:async({canvasElement:s})=>{h(s),await new Promise(n=>setTimeout(n,100)),r(s).toBeInTheDocument();const t=s.querySelector("video");r(t).toBeInTheDocument(),r(t==null?void 0:t.src).toContain("cirno.webm")}},u={render:()=>e.jsx(f,{displayName:{id:"test-id",message:"Test User",color:"#4ecdc4"},callback:()=>console.log("Reimu alert finished")}),play:async({canvasElement:s})=>{h(s),await new Promise(n=>setTimeout(n,100)),r(s).toBeInTheDocument();const t=s.querySelector("video");r(t).toBeInTheDocument(),r(t==null?void 0:t.src).toContain("reimu.webm")}};var j,_,B;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var N,E,D;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(D=(E=u.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};const X=["Default","CirnoAlert","ReimuAlert"];export{m as CirnoAlert,d as Default,u as ReimuAlert,X as __namedExportsOrder,Q as default};
