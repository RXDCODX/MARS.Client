function o({title:s}){return document.title=s,null}const c={title:"Components/PageName",component:o,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения названия страницы."}}},tags:["autodocs"],argTypes:{title:{control:"text"}}},e={args:{title:"Главная страница"}},r={args:{title:"Очень длинное название страницы для демонстрации"}},t={args:{title:"Чат"}},a={args:{title:"Страница с символами: !@#$%^&*()"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Главная страница"
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Очень длинное название страницы для демонстрации"
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Чат"
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Страница с символами: !@#$%^&*()"
  }
}`,...a.parameters?.docs?.source}}};const n=["Default","LongName","ShortName","WithSpecialCharacters"];export{e as Default,r as LongName,t as ShortName,a as WithSpecialCharacters,n as __namedExportsOrder,c as default};
