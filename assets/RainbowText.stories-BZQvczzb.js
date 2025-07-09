import{R as b}from"./RainbowText-C581mKAB.js";import"./iframe-D1A6zj-g.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,C={title:"Shared/RainbowText",component:b,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с радужной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"}}},s={args:{text:"Rainbow Text! 🌈"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Rainbow Text! 🌈");const n=window.getComputedStyle(t);e(n.animation).toBeDefined(),e(n.animation).toContain("rainbow")}},r={args:{text:"This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("This is a very long rainbow text");const n=window.getComputedStyle(t);e(n.animation).toBeDefined()}},c={args:{text:"Hi!"},play:async({canvasElement:o})=>{await new Promise(a=>setTimeout(a,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Hi!");const n=window.getComputedStyle(t);e(n.animation).toBeDefined()}},m={args:{text:""},play:async({canvasElement:o})=>{await new Promise(n=>setTimeout(n,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="rainbow"]');e(t).toBeInTheDocument(),e(t).toBeInTheDocument()}},i={args:{text:"🌈 Радужный текст с эмодзи 🎨"}};var l,p,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,d,T;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(T=(d=r.parameters)==null?void 0:d.docs)==null?void 0:T.source}}};var w,y,h;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(h=(y=c.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var E,S,g;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(g=(S=m.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var D,v,B;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    text: "🌈 Радужный текст с эмодзи 🎨"
  }
}`,...(B=(v=i.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};const H=["Default","LongText","ShortText","EmptyText","WithEmojis"];export{s as Default,m as EmptyText,r as LongText,c as ShortText,i as WithEmojis,H as __namedExportsOrder,C as default};
