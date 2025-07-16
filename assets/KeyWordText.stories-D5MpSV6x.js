import{K as i}from"./KeyWordedText-BELrIlw7.js";import"./iframe-B_oz8dKo.js";import"./index-P3iobJrg.js";import"./index-BU3mIPC_.js";import"./v4-BBZMrhdn.js";const{expect:o}=__STORYBOOK_MODULE_TEST__,k={title:"Shared/KeyWordText",component:i,parameters:{layout:"centered",docs:{description:{component:"Компонент для выделения ключевых слов в тексте."}}},tags:["autodocs"],argTypes:{keyWordedString:{control:"text"},keySymbol:{control:"text"},keyWordColor:{control:"color"},classNameForKeyWordedSpan:{control:"text"},isQuouted:{control:"boolean"}}},l={args:{keyWordedString:"Hello #world! This is a #test message.",keySymbol:"#",keyWordColor:"#ff0000",classNameForKeyWordedSpan:"keyword",isQuouted:!1},play:async({canvasElement:e})=>{await new Promise(y=>setTimeout(y,100)),o(e).toBeInTheDocument();const r=e.querySelector('[class*="keyword"]');o(r).toBeInTheDocument(),o(e).toHaveTextContent("Hello #world! This is a #test message.");const t=e.querySelectorAll('[class*="keyword"]');o(t.length).toBeGreaterThan(0);const s=t[0],d=window.getComputedStyle(s);o(d.color).toBe("rgb(255, 0, 0)")}},a={args:{keyWordedString:'This is a "quoted #keyword" example.',keySymbol:"#",keyWordColor:"#00ff00",classNameForKeyWordedSpan:"highlight",isQuouted:!0},play:async({canvasElement:e})=>{await new Promise(y=>setTimeout(y,100)),o(e).toBeInTheDocument();const r=e.querySelector('[class*="highlight"]');o(r).toBeInTheDocument(),o(e).toHaveTextContent('This is a "quoted #keyword" example.');const t=e.querySelectorAll('[class*="highlight"]');o(t.length).toBeGreaterThan(0);const s=t[0],d=window.getComputedStyle(s);o(d.color).toBe("rgb(0, 255, 0)")}},n={args:{keyWordedString:"Multiple #keywords in #one #sentence with #different #symbols.",keySymbol:"#",keyWordColor:"#0000ff",classNameForKeyWordedSpan:"multiple-keywords",isQuouted:!1},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),o(e).toBeInTheDocument();const r=e.querySelectorAll('[class*="multiple-keywords"]');o(r.length).toBeGreaterThan(1),r.forEach(t=>{const s=window.getComputedStyle(t);o(s.color).toBe("rgb(0, 0, 255)")}),o(e).toHaveTextContent("Multiple #keywords in #one #sentence")}},c={args:{keyWordedString:"This text has no keywords to highlight.",keySymbol:"#",keyWordColor:"#ff00ff",classNameForKeyWordedSpan:"no-keywords",isQuouted:!1},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),o(e).toBeInTheDocument();const r=e.querySelectorAll('[class*="no-keywords"]');o(r.length).toBe(0),o(e).toHaveTextContent("This text has no keywords to highlight.")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    keyWordedString: "Hello #world! This is a #test message.",
    keySymbol: "#",
    keyWordColor: "#ff0000",
    classNameForKeyWordedSpan: "keyword",
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста
    const textElement = canvasElement.querySelector('[class*="keyword"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(canvasElement).toHaveTextContent("Hello #world! This is a #test message.");

    // Проверяем выделение ключевых слов
    const keywords = canvasElement.querySelectorAll('[class*="keyword"]');
    expect(keywords.length).toBeGreaterThan(0);

    // Проверяем цвет ключевых слов
    const firstKeyword = keywords[0];
    const computedStyle = window.getComputedStyle(firstKeyword);
    expect(computedStyle.color).toBe("rgb(255, 0, 0)");
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    keyWordedString: 'This is a "quoted #keyword" example.',
    keySymbol: "#",
    keyWordColor: "#00ff00",
    classNameForKeyWordedSpan: "highlight",
    isQuouted: true
  },
  play: async ({
    canvasElement
  }) => {
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
    expect(computedStyle.color).toBe("rgb(0, 255, 0)");
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    keyWordedString: "Multiple #keywords in #one #sentence with #different #symbols.",
    keySymbol: "#",
    keyWordColor: "#0000ff",
    classNameForKeyWordedSpan: "multiple-keywords",
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
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
      expect(computedStyle.color).toBe("rgb(0, 0, 255)");
    });

    // Проверяем, что текст отображается полностью
    expect(canvasElement).toHaveTextContent("Multiple #keywords in #one #sentence");
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    keyWordedString: "This text has no keywords to highlight.",
    keySymbol: "#",
    keyWordColor: "#ff00ff",
    classNameForKeyWordedSpan: "no-keywords",
    isQuouted: false
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет выделенных ключевых слов
    const keywords = canvasElement.querySelectorAll('[class*="no-keywords"]');
    expect(keywords.length).toBe(0);

    // Проверяем, что текст отображается
    expect(canvasElement).toHaveTextContent("This text has no keywords to highlight.");
  }
}`,...c.parameters?.docs?.source}}};const g=["Default","WithQuotes","MultipleKeywords","NoKeywords"];export{l as Default,n as MultipleKeywords,c as NoKeywords,a as WithQuotes,g as __namedExportsOrder,k as default};
