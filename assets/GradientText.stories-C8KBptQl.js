import{G as p}from"./GradientText-BKTq3OdN.js";import"./iframe-PHcFrRmL.js";import"./preload-helper-D9Z9MdNV.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,f={title:"Animations/GradientText",component:p,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с градиентной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"},fontWeight:{control:"number"},speed:{control:"select",options:["slow","normal","fast","very-slow"]}}},a={args:{text:"Gradient Text! ✨",fontWeight:600,speed:"normal"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Gradient Text! ✨");const n=window.getComputedStyle(t);e(n.fontWeight).toBe("600")}},r={args:{text:"Slow Gradient",fontWeight:400,speed:"slow"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument();const n=window.getComputedStyle(t);e(n.fontWeight).toBe("400")}},c={args:{text:"Fast Gradient",fontWeight:700,speed:"fast"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t),e(t).toBeInTheDocument();const n=window.getComputedStyle(t);e(n.fontWeight).toBe("700")}},l={args:{text:"This is a very long gradient text that demonstrates the animation effect across multiple words and characters with different speeds and weights!",fontWeight:500,speed:"very-slow"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("This is a very long gradient text");const n=window.getComputedStyle(t);e(n.fontWeight).toBe("500")}},m={args:{text:"Text with Shadow",speed:"normal",shadow:{enabled:!0,color:"rgba(0, 0, 0, 0.5)",blur:6,offsetX:3,offsetY:3}}},i={args:{text:"Large Gradient Text",fontSize:"48px",fontWeight:"bold"}},d={args:{text:"Custom Colors",colors:["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff"]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Gradient Text! ✨",
    fontWeight: 600,
    speed: "normal"
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(textElement).toHaveTextContent("Gradient Text! ✨");

    // Проверяем стили
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe("600");
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Slow Gradient",
    fontWeight: 400,
    speed: "slow"
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем медленную анимацию
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем стили для медленной анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe("400");
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Fast Gradient",
    fontWeight: 700,
    speed: "fast"
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем быструю анимацию
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement!);
    expect(textElement).toBeInTheDocument();

    // Проверяем стили для быстрой анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe("700");
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    text: "This is a very long gradient text that demonstrates the animation effect across multiple words and characters with different speeds and weights!",
    fontWeight: 500,
    speed: "very-slow"
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем длинный текст
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что весь текст отображается
    expect(textElement).toHaveTextContent("This is a very long gradient text");

    // Проверяем стили для очень медленной анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe("500");
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Text with Shadow",
    speed: "normal",
    shadow: {
      enabled: true,
      color: "rgba(0, 0, 0, 0.5)",
      blur: 6,
      offsetX: 3,
      offsetY: 3
    }
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Large Gradient Text",
    fontSize: "48px",
    fontWeight: "bold"
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Custom Colors",
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
  }
}`,...d.parameters?.docs?.source}}};const h=["Default","SlowSpeed","FastSpeed","LongText","WithShadow","LargeText","CustomColors"];export{d as CustomColors,a as Default,c as FastSpeed,i as LargeText,l as LongText,r as SlowSpeed,m as WithShadow,h as __namedExportsOrder,f as default};
