import{r as t,j as l}from"./iframe-PHcFrRmL.js";import"./preload-helper-D9Z9MdNV.js";const h=["PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1","PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1","PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1"],S=()=>{const y=t.useRef(null),e=t.useRef(null),[f,I]=t.useState(!0),[b,i]=t.useState(!1),[T,g]=t.useState(""),a=t.useCallback(()=>{const n=Math.floor(Math.random()*h.length);return h[n]},[]);t.useEffect(()=>((async()=>{if(y.current&&!e.current)try{if(!window.YT){const r=document.createElement("script");r.src="https://www.youtube.com/iframe_api";const o=document.getElementsByTagName("script")[0];o.parentNode?.insertBefore(r,o),await new Promise(c=>{window.onYouTubeIframeAPIReady=()=>c()})}const s=a();g(s),e.current=new window.YT.Player(y.current,{height:"100%",width:"100%",playerVars:{autoplay:1,controls:1,playsinline:1,mute:f?1:0},events:{onReady:r=>{console.log("YouTube player is ready"),i(!1);const o=Math.floor(Math.random()*200),c=Math.floor(Math.random()*60);r.target.loadPlaylist({listType:"playlist",list:s,index:o,startSeconds:c}),r.target.setShuffle(!0)},onStateChange:r=>{console.log("Player state changed:",r.data),r.data===window.YT.PlayerState.ENDED&&r.target.nextVideo()},onError:r=>{console.error("YouTube player error:",r.data),i(!0),setTimeout(()=>{if(e.current){const o=a();g(o);const c=Math.floor(Math.random()*200),P=Math.floor(Math.random()*60);e.current.loadPlaylist({listType:"playlist",list:o,index:c,startSeconds:P}),setTimeout(()=>{e.current&&e.current.setShuffle(!0)},1e3)}},2e3)}}})}catch(s){console.error("Error initializing player:",s),i(!0)}})(),()=>{e.current&&(e.current.destroy(),e.current=null)}),[a]);const M=t.useCallback(()=>{f&&e.current&&(I(!1),e.current.unMute())},[f]),w=t.useCallback(()=>{if(i(!1),e.current){const n=a();g(n);const s=Math.floor(Math.random()*200),r=Math.floor(Math.random()*60);e.current.loadPlaylist({listType:"playlist",list:n,index:s,startSeconds:r}),setTimeout(()=>{e.current&&e.current.setShuffle(!0)},1e3)}},[a]);return l.jsxs("div",{className:"afk-screen-container",onClick:M,children:[b&&l.jsxs("div",{className:"error-message",children:[l.jsx("p",{children:"Ошибка загрузки видео"}),l.jsx("button",{onClick:w,className:"retry-button",children:"Попробовать снова"})]}),l.jsx("div",{ref:y,className:"youtube-player"})]})};S.__docgenInfo={description:"",methods:[],displayName:"AFKScreen"};const Y={title:"OBS Components/AFKScreen",component:S,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент AFK экрана с использованием YouTube IFrame API. Автоматически воспроизводит YouTube видео из плейлиста, включает автозапуск, зацикливание и управление звуком. Использует официальную библиотеку youtube-player для надежной работы."}}},tags:["autodocs"],argTypes:{videoId:{control:"text",description:"ID YouTube видео",defaultValue:"6oMsWcCDGnw"},playlistId:{control:"text",description:"ID YouTube плейлиста",defaultValue:"PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1"},autoplay:{control:"boolean",description:"Автоматический запуск воспроизведения",defaultValue:!0},controls:{control:"boolean",description:"Показ элементов управления",defaultValue:!0},loop:{control:"boolean",description:"Зацикливание видео",defaultValue:!0},muted:{control:"boolean",description:"Запуск без звука",defaultValue:!0}}},d={args:{},parameters:{docs:{description:{story:"Основной вид компонента с автоматическим воспроизведением YouTube видео. Плеер автоматически запускается, зацикливается и воспроизводит видео из плейлиста. Включает обработку событий готовности, изменения состояния и ошибок."}}}},u={args:{videoId:"dQw4w9WgXcQ",playlistId:"PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1"},parameters:{docs:{description:{story:"Компонент с кастомным видео и плейлистом. Демонстрирует использование пропсов для настройки воспроизведения."}}}},m={args:{controls:!1,muted:!1},parameters:{docs:{description:{story:"Компонент без элементов управления и со звуком. Подходит для фонового воспроизведения в OBS."}}}},p={args:{},parameters:{layout:"fullscreen",docs:{description:{story:"Компонент в полноэкранном режиме для OBS. Плеер занимает весь экран и автоматически адаптируется под размер контейнера."}}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Основной вид компонента с автоматическим воспроизведением YouTube видео. " + "Плеер автоматически запускается, зацикливается и воспроизводит видео из плейлиста. " + "Включает обработку событий готовности, изменения состояния и ошибок."
      }
    }
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    videoId: "dQw4w9WgXcQ",
    playlistId: "PLB6r_8YDnipME_VANRWiiBgI9-rabmmL1"
  },
  parameters: {
    docs: {
      description: {
        story: "Компонент с кастомным видео и плейлистом. " + "Демонстрирует использование пропсов для настройки воспроизведения."
      }
    }
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    controls: false,
    muted: false
  },
  parameters: {
    docs: {
      description: {
        story: "Компонент без элементов управления и со звуком. " + "Подходит для фонового воспроизведения в OBS."
      }
    }
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Компонент в полноэкранном режиме для OBS. " + "Плеер занимает весь экран и автоматически адаптируется под размер контейнера."
      }
    }
  }
}`,...p.parameters?.docs?.source}}};const E=["Default","CustomVideo","NoControls","Fullscreen"];export{u as CustomVideo,d as Default,p as Fullscreen,m as NoControls,E as __namedExportsOrder,Y as default};
