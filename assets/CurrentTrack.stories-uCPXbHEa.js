import{r as u,j as n}from"./iframe-gjcH4K4g.js";import{l as T}from"./index-LmWpYbeC.js";import{m as d,A as S}from"./proxy-Cqwafwtn.js";import"./index-Chjiymov.js";function w({children:t,colors:a=["#ee7752","#e73c7e","#23a6d5","#23d5ab"],duration:e=15,gradientAngle:s=-45}){u.useEffect(()=>{const i=document.createElement("style");return i.textContent=`
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
    `,document.head.append(i),()=>i.remove()},[]);const c={background:`linear-gradient(${s}deg, ${a.join(", ")})`,backgroundSize:"400% 400%",animation:`gradient ${e}s ease infinite`};return n.jsx(d.div,{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)",borderRadius:"5rem",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.5)",zIndex:1e3,...c},children:t})}w.__docgenInfo={description:"",methods:[],displayName:"AnimatedGradientBackground",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:'["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"]',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"15",computed:!1}},gradientAngle:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-45",computed:!1}}}};const _="_slide_rl92j_3",j="_wrapper_rl92j_11",B="_container_rl92j_20",D="_main_rl92j_30",q="_cover_rl92j_40",E="_trackinfo_rl92j_60",R="_info_rl92j_67",N="_textContainer_rl92j_76",r={slide:_,wrapper:j,container:B,main:D,cover:q,trackinfo:E,info:R,textContainer:N};function C({children:t,AnimationStart:a}){const[e,s]=u.useState("idle"),[c,i]=u.useState(0),p=u.useCallback(()=>{!a||e!=="idle"||(s("slidesCover"),i(0))},[a,e]);u.useEffect(()=>{a&&p()},[a,p]);const l=m=>{switch(m){case"slidesCover":setTimeout(()=>s("slidesReveal"),300);break;case"slidesReveal":setTimeout(()=>s("nowPlaying"),200);break;case"nowPlaying":c<2?setTimeout(()=>{i(k=>k+1)},800):setTimeout(()=>s("slidesCoverFinal"),200);break;case"slidesCoverFinal":setTimeout(()=>s("slidesRevealFinal"),300);break;case"slidesRevealFinal":setTimeout(()=>s("showChildren"),200);break;case"showChildren":setTimeout(()=>s("idle"),500);break}},g={top:{cover:{y:"0%"},reveal:{y:"-100%"},idle:{y:"-100%"}},bottom:{cover:{y:"0%"},reveal:{y:"100%"},idle:{y:"100%"}}},I={hidden:{y:-1e3,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",damping:20,stiffness:300}},exit:{y:200,opacity:0,transition:{duration:.5,ease:"easeIn"}}},A={hidden:{scale:0,opacity:0},visible:{scale:1,opacity:1,transition:{type:"spring",damping:15,stiffness:200,delay:.2}}};return n.jsxs(w,{children:[n.jsx(d.div,{className:r.slide,style:{position:"absolute",top:0,left:0,right:0,height:"50%",zIndex:10},variants:g.top,animate:e==="slidesCover"||e==="slidesCoverFinal"?"cover":e==="slidesReveal"||e==="slidesRevealFinal"?"reveal":"idle",transition:{duration:.6,ease:[.25,.46,.45,.94]},onAnimationComplete:()=>{e==="slidesCover"&&l("slidesCover"),e==="slidesReveal"&&l("slidesReveal"),e==="slidesCoverFinal"&&l("slidesCoverFinal"),e==="slidesRevealFinal"&&l("slidesRevealFinal")}}),n.jsx(d.div,{className:r.slide,style:{position:"absolute",bottom:0,left:0,right:0,height:"50%",zIndex:10},variants:g.bottom,animate:e==="slidesCover"||e==="slidesCoverFinal"?"cover":e==="slidesReveal"||e==="slidesRevealFinal"?"reveal":"idle",transition:{duration:.6,ease:[.25,.46,.45,.94]}}),n.jsx(S,{mode:"wait",children:e==="nowPlaying"&&n.jsx(d.div,{style:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:5,pointerEvents:"none"},variants:I,initial:"hidden",animate:"visible",exit:"exit",onAnimationComplete:m=>{m==="visible"&&l("nowPlaying")},children:n.jsx(d.span,{style:{fontSize:"clamp(2rem, 8vw, 12rem)",fontWeight:"bold",color:"#fff",fontFamily:"Arial, sans-serif",letterSpacing:"0.2em",textAlign:"center",padding:"0 20px"},children:"NOW PLAYING"})},`now-playing-${c}`)}),n.jsx(d.div,{style:{position:"relative",zIndex:1,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},variants:A,animate:e==="showChildren"||e==="idle"?"visible":"hidden",onAnimationComplete:m=>{m==="visible"&&e==="showChildren"&&l("showChildren")},children:t})]})}C.__docgenInfo={description:"",methods:[],displayName:"AnimationControl",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},AnimationStart:{required:!0,tsType:{name:"boolean"},description:""}}};function b({track:t,shouldAnimate:a=!0}){return n.jsx(C,{AnimationStart:a,children:n.jsx("div",{className:r.wrapper,children:n.jsx("div",{className:r.container,children:n.jsxs("div",{className:r.main,children:[n.jsx("div",{className:r.cover,children:t.cover&&n.jsx("img",{src:t.cover,alt:"Album cover"})}),n.jsx("div",{className:r.trackinfo,children:n.jsxs("div",{className:r.info,children:[n.jsx(T.Textfit,{mode:"multi",className:r.textContainer,max:9999,min:20,style:{width:"100%",textAlign:"end",color:"var(--site-text-warning) !important"},children:t.artists.join(", ")}),n.jsx(T.Textfit,{mode:"multi",className:r.textContainer,max:9999,min:30,style:{width:"100%",textAlign:"end",color:"var(--site-text-light)"},children:t.title})]})})]})})})})}b.__docgenInfo={description:"",methods:[],displayName:"CurrentTrack",props:{track:{required:!0,tsType:{name:"TunaMusicData"},description:""},shouldAnimate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const{expect:o}=__STORYBOOK_MODULE_TEST__,V={title:"SoundRequest/CurrentTrack",component:b,parameters:{layout:"centered",docs:{description:{component:"Компонент для отображения текущего трека с анимациями."}}},tags:["autodocs"],argTypes:{track:{control:"object"},shouldAnimate:{control:"boolean"}}},f={title:"Test Song",artists:["Test Artist"],cover:"https://via.placeholder.com/150",album_url:"https://via.placeholder.com/150",duration:180,progress:0,status:"playing"},v={args:{track:f,shouldAnimate:!0},play:async({canvasElement:t})=>{await new Promise(p=>setTimeout(p,100)),o(t).toBeInTheDocument();const a=t.querySelector('[class*="wrapper"]');o(a).toBeInTheDocument();const e=t.querySelector('[class*="container"]');o(e).toBeInTheDocument();const s=t.querySelector('[class*="cover"]');o(s).toBeInTheDocument();const c=t.querySelector('[class*="trackinfo"]');o(c).toBeInTheDocument();const i=t.querySelectorAll('[class*="textContainer"]');o(i.length).toBeGreaterThan(0)}},h={args:{track:f,shouldAnimate:!1},play:async({canvasElement:t})=>{await new Promise(s=>setTimeout(s,100)),o(t).toBeInTheDocument();const a=t.querySelector('[class*="wrapper"]');o(a).toBeInTheDocument();const e=t.querySelector('[class*="container"]');o(e).toBeInTheDocument()}},y={args:{track:{...f,cover:""},shouldAnimate:!0},play:async({canvasElement:t})=>{await new Promise(s=>setTimeout(s,100)),o(t).toBeInTheDocument();const a=t.querySelector('[class*="cover"] img');o(a).not.toBeInTheDocument();const e=t.querySelector('[class*="cover"]');o(e).toBeInTheDocument()}},x={args:{track:{...f,artists:["Artist 1","Artist 2","Artist 3"],title:"Collaboration Song"},shouldAnimate:!0},play:async({canvasElement:t})=>{await new Promise(s=>setTimeout(s,100)),o(t).toBeInTheDocument();const a=t.querySelectorAll('[class*="textContainer"]');o(a.length).toBeGreaterThan(0);const e=a[0];o(e).toBeInTheDocument()}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    track: defaultTrack,
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

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
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    track: defaultTrack,
    shouldAnimate: false
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

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
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    track: {
      ...defaultTrack,
      cover: ""
    },
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

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
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    track: {
      ...defaultTrack,
      artists: ["Artist 1", "Artist 2", "Artist 3"],
      title: "Collaboration Song"
    },
    shouldAnimate: true
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

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
}`,...x.parameters?.docs?.source}}};const O=["Default","WithoutAnimation","WithoutCover","MultipleArtists"];export{v as Default,x as MultipleArtists,h as WithoutAnimation,y as WithoutCover,O as __namedExportsOrder,V as default};
