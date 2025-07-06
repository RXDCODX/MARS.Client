import{w as l,e}from"./index-BnesSBbZ.js";import{R as I}from"./RainbowText-DOyXZpbl.js";import"./iframe-DqfnGlCG.js";const q={title:"Shared/RainbowText",component:I,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с радужной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"}}},s={args:{text:"Rainbow Text! 🌈"},play:async({canvasElement:t})=>{l(t),await new Promise(a=>setTimeout(a,100)),e(t).toBeInTheDocument();const o=t.querySelector('[class*="rainbow"]');e(o).toBeInTheDocument(),e(o).toHaveTextContent("Rainbow Text! 🌈");const n=window.getComputedStyle(o);e(n.animation).toBeDefined(),e(n.animation).toContain("rainbow")}},c={args:{text:"This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!"},play:async({canvasElement:t})=>{l(t),await new Promise(a=>setTimeout(a,100)),e(t).toBeInTheDocument();const o=t.querySelector('[class*="rainbow"]');e(o).toBeInTheDocument(),e(o).toHaveTextContent("This is a very long rainbow text");const n=window.getComputedStyle(o);e(n.animation).toBeDefined()}},r={args:{text:"Hi!"},play:async({canvasElement:t})=>{l(t),await new Promise(a=>setTimeout(a,100)),e(t).toBeInTheDocument();const o=t.querySelector('[class*="rainbow"]');e(o).toBeInTheDocument(),e(o).toHaveTextContent("Hi!");const n=window.getComputedStyle(o);e(n.animation).toBeDefined()}},m={args:{text:""},play:async({canvasElement:t})=>{l(t),await new Promise(n=>setTimeout(n,100)),e(t).toBeInTheDocument();const o=t.querySelector('[class*="rainbow"]');e(o).toBeInTheDocument(),e(o).toBeInTheDocument()}},i={args:{text:"🌈 Радужный текст с эмодзи 🎨"}};var p,u,x;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    text: 'Rainbow Text! 🌈'
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
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(textElement).toHaveTextContent('Rainbow Text! 🌈');

    // Проверяем анимацию
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
    expect(computedStyle.animation).toContain('rainbow');
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var d,w,T;c.parameters={...c.parameters,docs:{...(d=c.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    text: 'This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем длинный текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что весь текст отображается
    expect(textElement).toHaveTextContent('This is a very long rainbow text');

    // Проверяем анимацию для длинного текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  }
}`,...(T=(w=c.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var y,h,E;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'Hi!'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем короткий текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что короткий текст отображается
    expect(textElement).toHaveTextContent('Hi!');

    // Проверяем анимацию для короткого текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  }
}`,...(E=(h=r.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var S,v,g;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    text: ''
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

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
}`,...(g=(v=m.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var D,B,b;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    text: '🌈 Радужный текст с эмодзи 🎨'
  }
}`,...(b=(B=i.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};const P=["Default","LongText","ShortText","EmptyText","WithEmojis"];export{s as Default,m as EmptyText,c as LongText,r as ShortText,i as WithEmojis,P as __namedExportsOrder,q as default};
