import{R as l}from"./RainbowText-BAj0_Y1K.js";import"./iframe-rOG4V-f_.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,x={title:"Shared/RainbowText",component:l,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с радужной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"}}},s={args:{text:"Rainbow Text! 🌈"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Rainbow Text! 🌈");const n=window.getComputedStyle(t);e(n.animation).toBeDefined(),e(n.animation).toContain("rainbow")}},r={args:{text:"This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("This is a very long rainbow text");const n=window.getComputedStyle(t);e(n.animation).toBeDefined()}},c={args:{text:"Hi!"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Hi!");const n=window.getComputedStyle(t);e(n.animation).toBeDefined()}},m={args:{text:""},play:async({canvasElement:o})=>{await new Promise(n=>setTimeout(n,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toBeInTheDocument()}},i={args:{text:"🌈 Радужный текст с эмодзи 🎨"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Rainbow Text! 🌈"
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(textElement).toHaveTextContent("Rainbow Text! 🌈");

    // Проверяем анимацию
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
    expect(computedStyle.animation).toContain("rainbow");
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: "This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!"
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем длинный текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что весь текст отображается
    expect(textElement).toHaveTextContent("This is a very long rainbow text");

    // Проверяем анимацию для длинного текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Hi!"
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем короткий текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что короткий текст отображается
    expect(textElement).toHaveTextContent("Hi!");

    // Проверяем анимацию для короткого текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    text: ""
  },
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем пустой текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что элемент существует даже с пустым текстом
    expect(textElement).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: "🌈 Радужный текст с эмодзи 🎨"
  }
}`,...i.parameters?.docs?.source}}};const d=["Default","LongText","ShortText","EmptyText","WithEmojis"];export{s as Default,m as EmptyText,r as LongText,c as ShortText,i as WithEmojis,d as __namedExportsOrder,x as default};
