import{j as o}from"./iframe-BjL-cKrh.js";import"./preload-helper-D9Z9MdNV.js";function t(){return o.jsx("div",{children:"VideoScreen"})}t.__docgenInfo={description:"",methods:[],displayName:"VideoScreen"};const{expect:s}=__STORYBOOK_MODULE_TEST__,i={title:"Stream Components/SoundRequest/VideoScreen",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для отображения видео экрана в системе звуковых запросов."}}},tags:["autodocs"],decorators:[n=>o.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:o.jsx(n,{})})]},e={args:{},play:async({canvasElement:n})=>{await new Promise(r=>setTimeout(r,100)),s(n).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,i as default};
