function N({title:h}){return document.title=h,null}const f={title:"Components/PageName",component:N,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения названия страницы."}}},tags:["autodocs"],argTypes:{title:{control:"text"}}},e={args:{title:"Главная страница"}},r={args:{title:"Очень длинное название страницы для демонстрации"}},t={args:{title:"Чат"}},a={args:{title:"Страница с символами: !@#$%^&*()"}};var s,o,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    title: 'Главная страница'
  }
}`,...(c=(o=e.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var n,m,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: 'Очень длинное название страницы для демонстрации'
  }
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,l,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Чат'
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var d,g,S;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: 'Страница с символами: !@#$%^&*()'
  }
}`,...(S=(g=a.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const x=["Default","LongName","ShortName","WithSpecialCharacters"];export{e as Default,r as LongName,t as ShortName,a as WithSpecialCharacters,x as __namedExportsOrder,f as default};
