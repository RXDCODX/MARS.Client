import{w as p,e as t}from"./index-BnesSBbZ.js";import{G as F}from"./GradientText-Cc2GKIik.js";import"./iframe-CTrkdtAc.js";const Y={title:"Animations/GradientText",component:F,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текста с градиентной анимацией."}}},tags:["autodocs"],argTypes:{text:{control:"text"},fontWeight:{control:"number"},speed:{control:"select",options:["slow","normal","fast","very-slow"]}}},a={args:{text:"Gradient Text! ✨",fontWeight:600,speed:"normal"},play:async({canvasElement:e})=>{p(e),await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="gradient"]');t(o).toBeInTheDocument(),t(o).toHaveTextContent("Gradient Text! ✨");const n=window.getComputedStyle(o);t(n.fontWeight).toBe("600")}},r={args:{text:"Slow Gradient",fontWeight:400,speed:"slow"},play:async({canvasElement:e})=>{p(e),await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="gradient"]');t(o).toBeInTheDocument();const n=window.getComputedStyle(o);t(n.fontWeight).toBe("400")}},c={args:{text:"Fast Gradient",fontWeight:700,speed:"fast"},play:async({canvasElement:e})=>{p(e),await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="gradient"]');t(o).toBeInTheDocument();const n=window.getComputedStyle(o);t(n.fontWeight).toBe("700")}},i={args:{text:"This is a very long gradient text that demonstrates the animation effect across multiple words and characters with different speeds and weights!",fontWeight:500,speed:"very-slow"},play:async({canvasElement:e})=>{p(e),await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="gradient"]');t(o).toBeInTheDocument(),t(o).toHaveTextContent("This is a very long gradient text");const n=window.getComputedStyle(o);t(n.fontWeight).toBe("500")}},m={args:{text:"Text with Shadow",speed:"normal",shadow:{enabled:!0,color:"rgba(0, 0, 0, 0.5)",blur:6,offsetX:3,offsetY:3}}},l={args:{text:"Large Gradient Text",fontSize:"48px",fontWeight:"bold"}},d={args:{text:"Custom Colors",colors:["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff"]}};var u,g,x;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    text: 'Gradient Text! ✨',
    fontWeight: 600,
    speed: 'normal'
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
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(textElement).toHaveTextContent('Gradient Text! ✨');

    // Проверяем стили
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe('600');
  }
}`,...(x=(g=a.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,h,w;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    text: 'Slow Gradient',
    fontWeight: 400,
    speed: 'slow'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем медленную анимацию
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем стили для медленной анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe('400');
  }
}`,...(w=(h=r.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var y,S,T;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'Fast Gradient',
    fontWeight: 700,
    speed: 'fast'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем быструю анимацию
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем стили для быстрой анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe('700');
  }
}`,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var v,E,B;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    text: 'This is a very long gradient text that demonstrates the animation effect across multiple words and characters with different speeds and weights!',
    fontWeight: 500,
    speed: 'very-slow'
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
    const textElement = canvasElement.querySelector('[class*="gradient"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что весь текст отображается
    expect(textElement).toHaveTextContent('This is a very long gradient text');

    // Проверяем стили для очень медленной анимации
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.fontWeight).toBe('500');
  }
}`,...(B=(E=i.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var W,C,D;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    text: 'Text with Shadow',
    speed: 'normal',
    shadow: {
      enabled: true,
      color: 'rgba(0, 0, 0, 0.5)',
      blur: 6,
      offsetX: 3,
      offsetY: 3
    }
  }
}`,...(D=(C=m.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var I,G,b;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    text: 'Large Gradient Text',
    fontSize: '48px',
    fontWeight: 'bold'
  }
}`,...(b=(G=l.parameters)==null?void 0:G.docs)==null?void 0:b.source}}};var q,P,L;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    text: 'Custom Colors',
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
  }
}`,...(L=(P=d.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};const _=["Default","SlowSpeed","FastSpeed","LongText","WithShadow","LargeText","CustomColors"];export{d as CustomColors,a as Default,c as FastSpeed,l as LargeText,i as LongText,r as SlowSpeed,m as WithShadow,_ as __namedExportsOrder,Y as default};
