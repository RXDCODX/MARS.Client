import{G as _}from"./GradientText-D62lPnGf.js";import"./iframe-D1A6zj-g.js";const{expect:e}=__STORYBOOK_MODULE_TEST__,U={title:"Animations/GradientText",component:_,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с градиентной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"},fontWeight:{control:"number"},speed:{control:"select",options:["slow","normal","fast","very-slow"]}}},a={args:{text:"Gradient Text! ✨",fontWeight:600,speed:"normal"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("Gradient Text! ✨");const n=window.getComputedStyle(t);e(n.fontWeight).toBe("600")}},r={args:{text:"Slow Gradient",fontWeight:400,speed:"slow"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument();const n=window.getComputedStyle(t);e(n.fontWeight).toBe("400")}},c={args:{text:"Fast Gradient",fontWeight:700,speed:"fast"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t),e(t).toBeInTheDocument();const n=window.getComputedStyle(t);e(n.fontWeight).toBe("700")}},l={args:{text:"This is a very long gradient text that demonstrates the animation effect across multiple words and characters with different speeds and weights!",fontWeight:500,speed:"very-slow"},play:async({canvasElement:o})=>{await new Promise(s=>setTimeout(s,100)),e(o).toBeInTheDocument();const t=o.querySelector('[class*="gradient"]');e(t).toBeInTheDocument(),e(t).toHaveTextContent("This is a very long gradient text");const n=window.getComputedStyle(t);e(n.fontWeight).toBe("500")}},m={args:{text:"Text with Shadow",speed:"normal",shadow:{enabled:!0,color:"rgba(0, 0, 0, 0.5)",blur:6,offsetX:3,offsetY:3}}},i={args:{text:"Large Gradient Text",fontSize:"48px",fontWeight:"bold"}},d={args:{text:"Custom Colors",colors:["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff"]}};var p,u,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(x=(u=a.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,f,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var w,y,S;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(S=(y=c.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,v,E;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(E=(v=l.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};var B,W,C;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(C=(W=m.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var D,I,b;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    text: "Large Gradient Text",
    fontSize: "48px",
    fontWeight: "bold"
  }
}`,...(b=(I=i.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var G,q,P;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    text: "Custom Colors",
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
  }
}`,...(P=(q=d.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};const F=["Default","SlowSpeed","FastSpeed","LongText","WithShadow","LargeText","CustomColors"];export{d as CustomColors,a as Default,c as FastSpeed,i as LargeText,l as LongText,r as SlowSpeed,m as WithShadow,F as __namedExportsOrder,U as default};
