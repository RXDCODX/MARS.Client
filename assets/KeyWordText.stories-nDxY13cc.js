import{K as C}from"./KeyWordedText-DXsCrNBG.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-B0qy4s_C.js";import"./iframe-zpiOQtGo.js";import"./index-6iYvhkm2.js";const w={title:"Components/KeyWordText",component:C,parameters:{layout:"centered",docs:{description:{component:"Текст с выделением ключевых слов по символу-разделителю."}}},tags:["autodocs"],argTypes:{keyWordedString:{control:"text"},keyWordColor:{control:"color"},keySymbol:{control:"text"},isQuouted:{control:"boolean"},classNameForKeyWordedSpan:{control:"text"}}},e={args:{keyWordedString:"Это #ключевое слово в тексте",keyWordColor:"#ff0000",keySymbol:"#",isQuouted:!1}},o={args:{keyWordedString:'Текст с "кавычками" и #ключевыми словами',keyWordColor:"#00ff00",keySymbol:"#",isQuouted:!0}},r={args:{keyWordedString:"Много #ключевых #слов в #одном #тексте",keyWordColor:"#0000ff",keySymbol:"#",isQuouted:!1}},s={args:{keyWordedString:"Текст с @упоминаниями пользователей",keyWordColor:"#ffff00",keySymbol:"@",isQuouted:!1}},t={args:{keyWordedString:"Текст с #стилизованными ключевыми словами",keyWordColor:"#ff00ff",keySymbol:"#",isQuouted:!1,classNameForKeyWordedSpan:"custom-keyword-class"}};var a,d,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Это #ключевое слово в тексте',
    keyWordColor: '#ff0000',
    keySymbol: '#',
    isQuouted: false
  }
}`,...(n=(d=e.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};var l,y,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Текст с "кавычками" и #ключевыми словами',
    keyWordColor: '#00ff00',
    keySymbol: '#',
    isQuouted: true
  }
}`,...(c=(y=o.parameters)==null?void 0:y.docs)==null?void 0:c.source}}};var m,u,i;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Много #ключевых #слов в #одном #тексте',
    keyWordColor: '#0000ff',
    keySymbol: '#',
    isQuouted: false
  }
}`,...(i=(u=r.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var f,p,k;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Текст с @упоминаниями пользователей',
    keyWordColor: '#ffff00',
    keySymbol: '@',
    isQuouted: false
  }
}`,...(k=(p=s.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};var S,W,g;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Текст с #стилизованными ключевыми словами',
    keyWordColor: '#ff00ff',
    keySymbol: '#',
    isQuouted: false,
    classNameForKeyWordedSpan: 'custom-keyword-class'
  }
}`,...(g=(W=t.parameters)==null?void 0:W.docs)==null?void 0:g.source}}};const F=["Default","WithQuotes","MultipleKeywords","CustomSymbol","WithCustomClass"];export{s as CustomSymbol,e as Default,r as MultipleKeywords,t as WithCustomClass,o as WithQuotes,F as __namedExportsOrder,w as default};
