import{j as e}from"./iframe-DfjFra_E.js";const a={"left-path":"_left-path_pwmhd_7","right-path":"_right-path_pwmhd_8"},o=()=>e.jsxs("div",{className:"choose-path",children:[e.jsx("a",{href:"/sr/tracklist",className:a["left-path"],children:"TrackList"}),e.jsx("a",{href:"/sr/videoscreen",className:a["right-path"],children:"VideoScreen"})]});o.__docgenInfo={description:"",methods:[],displayName:"ChoosePath"};const{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:"Stream Components/SoundRequest/ChoosePath",component:o,parameters:{layout:"centered",docs:{description:{component:"Компонент для выбора пути в системе звуковых запросов."}}},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{width:"400px",height:"300px",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden",padding:"20px"},children:e.jsx(s,{})})]},t={args:{},play:async({canvasElement:s})=>{await new Promise(n=>setTimeout(n,100)),r(s).toBeInTheDocument()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...t.parameters?.docs?.source}}};const d=["Default"];export{t as Default,d as __namedExportsOrder,i as default};
