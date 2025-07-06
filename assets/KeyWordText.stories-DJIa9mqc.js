import{w as d,e as o}from"./index-BnesSBbZ.js";import{K as v}from"./KeyWordedText-B9QtYvSn.js";import"./iframe-DqfnGlCG.js";import"./index-BekxroER.js";import"./index-D97MGZuM.js";import"./v4-BLKDVEyC.js";const D={title:"Shared/KeyWordText",component:v,parameters:{layout:"centered",docs:{description:{component:"Компонент для выделения ключевых слов в тексте."}}},tags:["autodocs"],argTypes:{keyWordedString:{control:"text"},keySymbol:{control:"text"},keyWordColor:{control:"color"},classNameForKeyWordedSpan:{control:"text"},isQuouted:{control:"boolean"}}},a={args:{keyWordedString:"Hello #world! This is a #test message.",keySymbol:"#",keyWordColor:"#ff0000",classNameForKeyWordedSpan:"keyword",isQuouted:!1},play:async({canvasElement:e})=>{d(e),await new Promise(i=>setTimeout(i,100)),o(e).toBeInTheDocument();const s=e.querySelector('[class*="keyword"]');o(s).toBeInTheDocument(),o(e).toHaveTextContent("Hello #world! This is a #test message.");const t=e.querySelectorAll('[class*="keyword"]');o(t.length).toBeGreaterThan(0);const r=t[0],y=window.getComputedStyle(r);o(y.color).toBe("rgb(255, 0, 0)")}},n={args:{keyWordedString:'This is a "quoted #keyword" example.',keySymbol:"#",keyWordColor:"#00ff00",classNameForKeyWordedSpan:"highlight",isQuouted:!0},play:async({canvasElement:e})=>{d(e),await new Promise(i=>setTimeout(i,100)),o(e).toBeInTheDocument();const s=e.querySelector('[class*="highlight"]');o(s).toBeInTheDocument(),o(e).toHaveTextContent('This is a "quoted #keyword" example.');const t=e.querySelectorAll('[class*="highlight"]');o(t.length).toBeGreaterThan(0);const r=t[0],y=window.getComputedStyle(r);o(y.color).toBe("rgb(0, 255, 0)")}},l={args:{keyWordedString:"Multiple #keywords in #one #sentence with #different #symbols.",keySymbol:"#",keyWordColor:"#0000ff",classNameForKeyWordedSpan:"multiple-keywords",isQuouted:!1},play:async({canvasElement:e})=>{d(e),await new Promise(t=>setTimeout(t,100)),o(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="multiple-keywords"]');o(s.length).toBeGreaterThan(1),s.forEach(t=>{const r=window.getComputedStyle(t);o(r.color).toBe("rgb(0, 0, 255)")}),o(e).toHaveTextContent("Multiple #keywords in #one #sentence")}},c={args:{keyWordedString:"This text has no keywords to highlight.",keySymbol:"#",keyWordColor:"#ff00ff",classNameForKeyWordedSpan:"no-keywords",isQuouted:!1},play:async({canvasElement:e})=>{d(e),await new Promise(t=>setTimeout(t,100)),o(e).toBeInTheDocument();const s=e.querySelectorAll('[class*="no-keywords"]');o(s.length).toBe(0),o(e).toHaveTextContent("This text has no keywords to highlight.")}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Hello #world! This is a #test message.',
    keySymbol: '#',
    keyWordColor: '#ff0000',
    classNameForKeyWordedSpan: 'keyword',
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста
    const textElement = canvasElement.querySelector('[class*="keyword"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(canvasElement).toHaveTextContent('Hello #world! This is a #test message.');

    // Проверяем выделение ключевых слов
    const keywords = canvasElement.querySelectorAll('[class*="keyword"]');
    expect(keywords.length).toBeGreaterThan(0);

    // Проверяем цвет ключевых слов
    const firstKeyword = keywords[0];
    const computedStyle = window.getComputedStyle(firstKeyword);
    expect(computedStyle.color).toBe('rgb(255, 0, 0)');
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var w,h,k;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'This is a "quoted #keyword" example.',
    keySymbol: '#',
    keyWordColor: '#00ff00',
    classNameForKeyWordedSpan: 'highlight',
    isQuouted: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста с кавычками
    const textElement = canvasElement.querySelector('[class*="highlight"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(canvasElement).toHaveTextContent('This is a "quoted #keyword" example.');

    // Проверяем выделение ключевых слов в кавычках
    const keywords = canvasElement.querySelectorAll('[class*="highlight"]');
    expect(keywords.length).toBeGreaterThan(0);

    // Проверяем цвет ключевых слов
    const firstKeyword = keywords[0];
    const computedStyle = window.getComputedStyle(firstKeyword);
    expect(computedStyle.color).toBe('rgb(0, 255, 0)');
  }
}`,...(k=(h=n.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var g,S,T;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'Multiple #keywords in #one #sentence with #different #symbols.',
    keySymbol: '#',
    keyWordColor: '#0000ff',
    classNameForKeyWordedSpan: 'multiple-keywords',
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие множественных ключевых слов
    const keywords = canvasElement.querySelectorAll('[class*="multiple-keywords"]');
    expect(keywords.length).toBeGreaterThan(1);

    // Проверяем, что все ключевые слова выделены
    keywords.forEach(keyword => {
      const computedStyle = window.getComputedStyle(keyword);
      expect(computedStyle.color).toBe('rgb(0, 0, 255)');
    });

    // Проверяем, что текст отображается полностью
    expect(canvasElement).toHaveTextContent('Multiple #keywords in #one #sentence');
  }
}`,...(T=(S=l.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var x,f,W;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'This text has no keywords to highlight.',
    keySymbol: '#',
    keyWordColor: '#ff00ff',
    classNameForKeyWordedSpan: 'no-keywords',
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет выделенных ключевых слов
    const keywords = canvasElement.querySelectorAll('[class*="no-keywords"]');
    expect(keywords.length).toBe(0);

    // Проверяем, что текст отображается
    expect(canvasElement).toHaveTextContent('This text has no keywords to highlight.');
  }
}`,...(W=(f=c.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};const H=["Default","WithQuotes","MultipleKeywords","NoKeywords"];export{a as Default,l as MultipleKeywords,c as NoKeywords,n as WithQuotes,H as __namedExportsOrder,D as default};
