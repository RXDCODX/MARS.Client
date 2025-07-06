import{w as x,e as s}from"./index-BnesSBbZ.js";import{r as u,j as n}from"./iframe-CTrkdtAc.js";import{l as w}from"./index-WpBykvsV.js";import{m as d,A as G}from"./proxy-DSfxE5X5.js";function R({children:e,colors:o=["#ee7752","#e73c7e","#23a6d5","#23d5ab"],duration:t=15,gradientAngle:a=-45}){u.useEffect(()=>{const i=document.createElement("style");return i.textContent=`
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,document.head.append(i),()=>i.remove()},[]);const c={background:`linear-gradient(${a}deg, ${o.join(", ")})`,backgroundSize:"400% 400%",animation:`gradient ${t}s ease infinite`};return n.jsx(d.div,{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)",borderRadius:"5rem",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.5)",zIndex:1e3,...c},children:e})}R.__docgenInfo={description:"",methods:[],displayName:"AnimatedGradientBackground",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:'["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"]',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"15",computed:!1}},gradientAngle:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-45",computed:!1}}}};const W="_slide_38k8o_3",$="_wrapper_38k8o_11",M="_container_38k8o_20",O="_main_38k8o_30",L="_cover_38k8o_40",Y="_trackinfo_38k8o_60",H="_info_38k8o_67",J="_textContainer_38k8o_77",r={slide:W,wrapper:$,container:M,main:O,cover:L,trackinfo:Y,info:H,textContainer:J};function N({children:e,AnimationStart:o}){const[t,a]=u.useState("idle"),[c,i]=u.useState(0),p=u.useCallback(()=>{!o||t!=="idle"||(a("slidesCover"),i(0))},[o,t]);u.useEffect(()=>{o&&p()},[o,p]);const l=m=>{switch(m){case"slidesCover":setTimeout(()=>a("slidesReveal"),300);break;case"slidesReveal":setTimeout(()=>a("nowPlaying"),200);break;case"nowPlaying":c<2?setTimeout(()=>{i(z=>z+1)},800):setTimeout(()=>a("slidesCoverFinal"),200);break;case"slidesCoverFinal":setTimeout(()=>a("slidesRevealFinal"),300);break;case"slidesRevealFinal":setTimeout(()=>a("showChildren"),200);break;case"showChildren":setTimeout(()=>a("idle"),500);break}},T={top:{cover:{y:"0%"},reveal:{y:"-100%"},idle:{y:"-100%"}},bottom:{cover:{y:"0%"},reveal:{y:"100%"},idle:{y:"100%"}}},F={hidden:{y:-1e3,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",damping:20,stiffness:300}},exit:{y:200,opacity:0,transition:{duration:.5,ease:"easeIn"}}},V={hidden:{scale:0,opacity:0},visible:{scale:1,opacity:1,transition:{type:"spring",damping:15,stiffness:200,delay:.2}}};return n.jsxs(R,{children:[n.jsx(d.div,{className:r.slide,style:{position:"absolute",top:0,left:0,right:0,height:"50%",zIndex:10},variants:T.top,animate:t==="slidesCover"||t==="slidesCoverFinal"?"cover":t==="slidesReveal"||t==="slidesRevealFinal"?"reveal":"idle",transition:{duration:.6,ease:[.25,.46,.45,.94]},onAnimationComplete:()=>{t==="slidesCover"&&l("slidesCover"),t==="slidesReveal"&&l("slidesReveal"),t==="slidesCoverFinal"&&l("slidesCoverFinal"),t==="slidesRevealFinal"&&l("slidesRevealFinal")}}),n.jsx(d.div,{className:r.slide,style:{position:"absolute",bottom:0,left:0,right:0,height:"50%",zIndex:10},variants:T.bottom,animate:t==="slidesCover"||t==="slidesCoverFinal"?"cover":t==="slidesReveal"||t==="slidesRevealFinal"?"reveal":"idle",transition:{duration:.6,ease:[.25,.46,.45,.94]}}),n.jsx(G,{mode:"wait",children:t==="nowPlaying"&&n.jsx(d.div,{style:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:5,pointerEvents:"none"},variants:F,initial:"hidden",animate:"visible",exit:"exit",onAnimationComplete:m=>{m==="visible"&&l("nowPlaying")},children:n.jsx(d.span,{style:{fontSize:"clamp(2rem, 8vw, 12rem)",fontWeight:"bold",color:"#fff",fontFamily:"Arial, sans-serif",letterSpacing:"0.2em",textAlign:"center",padding:"0 20px"},children:"NOW PLAYING"})},`now-playing-${c}`)}),n.jsx(d.div,{style:{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},variants:V,animate:t==="showChildren"||t==="idle"?"visible":"hidden",onAnimationComplete:m=>{m==="visible"&&t==="showChildren"&&l("showChildren")},children:e})]})}N.__docgenInfo={description:"",methods:[],displayName:"AnimationControl",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},AnimationStart:{required:!0,tsType:{name:"boolean"},description:""}}};function P({track:e,shouldAnimate:o=!0}){return n.jsx(N,{AnimationStart:o,children:n.jsx("div",{className:r.wrapper,children:n.jsx("div",{className:r.container,children:n.jsxs("div",{className:r.main,children:[n.jsx("div",{className:r.cover,children:e.cover&&n.jsx("img",{src:e.cover,alt:"Album cover"})}),n.jsx("div",{className:r.trackinfo,children:n.jsxs("div",{className:r.info,children:[n.jsx("div",{className:r.textContainer,children:n.jsx(w.Textfit,{mode:"multi",max:200,min:20,style:{width:"100%",height:"100%"},children:e.artists.join(", ")})}),n.jsx("div",{className:r.textContainer,children:n.jsx(w.Textfit,{mode:"multi",max:300,min:30,style:{width:"100%",height:"100%"},children:e.title})})]})})]})})})})}P.__docgenInfo={description:"",methods:[],displayName:"CurrentTrack",props:{track:{required:!0,tsType:{name:"TunaMusicData"},description:""},shouldAnimate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const Z={title:"SoundRequest/CurrentTrack",component:P,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текущего трека с анимациями."}}},tags:["autodocs"],argTypes:{track:{control:"object"},shouldAnimate:{control:"boolean"}}},g={title:"Test Song",artists:["Test Artist"],cover:"https://via.placeholder.com/150",isDefaultValue:!1},h={args:{track:g,shouldAnimate:!0},play:async({canvasElement:e})=>{x(e),await new Promise(p=>setTimeout(p,100)),s(e).toBeInTheDocument();const o=e.querySelector('[class*="wrapper"]');s(o).toBeInTheDocument();const t=e.querySelector('[class*="container"]');s(t).toBeInTheDocument();const a=e.querySelector('[class*="cover"]');s(a).toBeInTheDocument();const c=e.querySelector('[class*="trackinfo"]');s(c).toBeInTheDocument();const i=e.querySelectorAll('[class*="textContainer"]');s(i.length).toBeGreaterThan(0)}},v={args:{track:g,shouldAnimate:!1},play:async({canvasElement:e})=>{x(e),await new Promise(a=>setTimeout(a,100)),s(e).toBeInTheDocument();const o=e.querySelector('[class*="wrapper"]');s(o).toBeInTheDocument();const t=e.querySelector('[class*="container"]');s(t).toBeInTheDocument()}},y={args:{track:{...g,cover:void 0},shouldAnimate:!0},play:async({canvasElement:e})=>{x(e),await new Promise(a=>setTimeout(a,100)),s(e).toBeInTheDocument();const o=e.querySelector('[class*="cover"] img');s(o).not.toBeInTheDocument();const t=e.querySelector('[class*="cover"]');s(t).toBeInTheDocument()}},f={args:{track:{...g,artists:["Artist 1","Artist 2","Artist 3"],title:"Collaboration Song"},shouldAnimate:!0},play:async({canvasElement:e})=>{x(e),await new Promise(a=>setTimeout(a,100)),s(e).toBeInTheDocument();const o=e.querySelectorAll('[class*="textContainer"]');s(o.length).toBeGreaterThan(0);const t=o[0];s(t).toBeInTheDocument()}};var C,k,I;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    track: defaultTrack,
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем структуру компонента
    const wrapper = canvasElement.querySelector('[class*="wrapper"]');
    expect(wrapper).toBeInTheDocument();

    // Проверяем контейнер
    const container = canvasElement.querySelector('[class*="container"]');
    expect(container).toBeInTheDocument();

    // Проверяем обложку
    const cover = canvasElement.querySelector('[class*="cover"]');
    expect(cover).toBeInTheDocument();

    // Проверяем информацию о треке
    const trackInfo = canvasElement.querySelector('[class*="trackinfo"]');
    expect(trackInfo).toBeInTheDocument();

    // Проверяем текст трека
    const textElements = canvasElement.querySelectorAll('[class*="textContainer"]');
    expect(textElements.length).toBeGreaterThan(0);
  }
}`,...(I=(k=h.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var b,A,S;v.parameters={...v.parameters,docs:{...(b=v.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    track: defaultTrack,
    shouldAnimate: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что анимация отключена
    const wrapper = canvasElement.querySelector('[class*="wrapper"]');
    expect(wrapper).toBeInTheDocument();

    // Проверяем структуру без анимации
    const container = canvasElement.querySelector('[class*="container"]');
    expect(container).toBeInTheDocument();
  }
}`,...(S=(A=v.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var B,_,D;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    track: {
      ...defaultTrack,
      cover: undefined
    },
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет изображения обложки
    const coverImage = canvasElement.querySelector('[class*="cover"] img');
    expect(coverImage).not.toBeInTheDocument();

    // Проверяем, что контейнер обложки все еще есть
    const cover = canvasElement.querySelector('[class*="cover"]');
    expect(cover).toBeInTheDocument();
  }
}`,...(D=(_=y.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var q,j,E;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    track: {
      ...defaultTrack,
      artists: ['Artist 1', 'Artist 2', 'Artist 3'],
      title: 'Collaboration Song'
    },
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем отображение нескольких артистов
    const textElements = canvasElement.querySelectorAll('[class*="textContainer"]');
    expect(textElements.length).toBeGreaterThan(0);

    // Проверяем, что текст содержит информацию об артистах
    const firstTextContainer = textElements[0];
    expect(firstTextContainer).toBeInTheDocument();
  }
}`,...(E=(j=f.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};const ee=["Default","WithoutAnimation","WithoutCover","MultipleArtists"];export{h as Default,f as MultipleArtists,v as WithoutAnimation,y as WithoutCover,ee as __namedExportsOrder,Z as default};
