import{j as e}from"./iframe-DfjFra_E.js";function n(){return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("div",{}),e.jsx("div",{})]}),e.jsx("div",{})]})}n.__docgenInfo={description:"",methods:[],displayName:"TrackList"};const{expect:a}=__STORYBOOK_MODULE_TEST__,i={title:"Stream Components/SoundRequest/TrackList",component:n,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения списка треков в системе звуковых запросов."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:"600px",height:"400px",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden",padding:"20px"},children:e.jsx(s,{})})]},t={args:{},play:async({canvasElement:s})=>{await new Promise(o=>setTimeout(o,100)),a(s).toBeInTheDocument()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...t.parameters?.docs?.source}}};const c=["Default"];export{t as Default,c as __namedExportsOrder,i as default};
