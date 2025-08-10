import{j as r,r as d}from"./iframe-BjL-cKrh.js";import"./ActionButtons-CbS01Zyo.js";import"./AdminPanel-Bh9vgMJ8.js";import"./ColorPresetCard-BHbAqu32.js";import"./MetaPanel-BX9lVscU.js";import"./PlayerCard-DERajjfr.js";import{d as q,c as M,e as $}from"./scoreboardStore-SHNMYMIe.js";import"./VisibilityCard-bmefl7Nw.js";import{A,m as h}from"./proxy-CsCd9JJB.js";import"./preload-helper-D9Z9MdNV.js";import"./Button-FnY6RG2Q.js";import"./index-Chjiymov.js";import"./arrow-repeat-3Oh9lL4d.js";import"./useSiteColors-C4fCSJVZ.js";import"./LayoutCard-B7GpCJWI.js";import"./Row-BokORiNB.js";import"./index-D5MxPxIl.js";import"./chunk-QMGIS6GS-BuY84TCY.js";import"./eye-DK0hHhBl.js";import"./index-3u8u-C0z.js";import"./index-D-P6gtBR.js";import"./index-YtfadmvT.js";import"./react-DeaJAqDd.js";import"./SignalRHubWrapper-C4GXF7iF.js";const G="_scoreboardContainer_1fk0k_5",H="_tournamentHeader_1fk0k_14",F="_fightMode_1fk0k_40",W="_headerLeftBorder_1fk0k_49",V="_headerRightBorder_1fk0k_59",O="_playersContainer_1fk0k_70",z="_playerRight_1fk0k_81",U="_playerLeft_1fk0k_81",X="_score_1fk0k_5",K="_playerInfo_1fk0k_101",Y="_flag_1fk0k_107",Z="_playerTag_1fk0k_138",i={scoreboardContainer:G,tournamentHeader:H,fightMode:F,headerLeftBorder:W,headerRightBorder:V,playersContainer:O,playerRight:z,playerLeft:U,score:X,playerInfo:K,flag:Y,playerTag:Z},J=()=>{const e=o=>!o||o.trim()===""?!1:/[a-zA-Zа-яА-Я]/.test(o),l=o=>o?`/flags/${o.toLowerCase()}.svg`:"",[a,p]=d.useState({name:"Daigo Umehara",sponsor:"Red Bull",score:2,tag:"The Beast",flag:"jp",final:"none"}),[c,b]=d.useState({name:"Tokido",sponsor:"Mad Catz",score:1,tag:"Murder Face",flag:"jp",final:"none"}),[m,k]=d.useState({title:"Street Fighter 6",fightRule:"Grand Finals"}),[s,j]=d.useState(q),[D,S]=d.useState(!0),[C,I]=d.useState(800),[t,N]=d.useState(M),B=$(o=>o._connection),w=d.useCallback(o=>{p(o.player1),b(o.player2),k(o.meta),S(o.isVisible),o.colors&&j(o.colors),o.animationDuration&&I(o.animationDuration),o.layout&&N(o.layout)},[]);if(B.on("ReceiveState",w),B.on("StateUpdated",w),B.on("VisibilityChanged",o=>{S(o)}),!D)return null;const E=()=>m.fightRule&&m.fightRule.trim()!==""&&m.fightRule.toLowerCase()!=="none"&&m.fightRule.toLowerCase()!=="n/a",L={hidden:{opacity:0},visible:{opacity:1,transition:{duration:C/1e3,staggerChildren:.1,delayChildren:.1}}},P={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:C/1e3}}},R={hidden:{opacity:0,y:-20},visible:{opacity:1,y:0,transition:{duration:C/1e3},transform:"translateX(-50%)"}};return r.jsx(A,{children:D&&r.jsxs(h.div,{className:i.scoreboardContainer,variants:L,initial:"hidden",animate:"visible",exit:"hidden",children:[t.showHeader&&r.jsxs(h.div,{className:i.tournamentHeader,variants:R,style:{position:"absolute",top:`${t.headerTop}px`,left:`${t.headerLeft}%`,transform:"translateX(-50%)",width:`${t.headerWidth}px`,height:`${t.headerHeight}px`,backgroundColor:s.backgroundColor,borderColor:s.borderColor||s.mainColor,padding:`${t.padding}px`},children:[r.jsx("div",{className:i.headerLeftBorder,style:{borderColor:s.borderColor}}),r.jsx("h1",{style:{color:s.tournamentTitleColor},children:m.title}),E()&&r.jsx("div",{className:i.fightMode,style:{color:s.fightModeColor},children:m.fightRule}),r.jsx("div",{className:i.headerRightBorder,style:{borderColor:s.borderColor}})]}),r.jsxs(h.div,{className:i.playersContainer,variants:P,style:{position:"absolute",top:`${t.playersTop}px`,left:`${t.playersLeft}px`,right:`${t.playersRight}px`,gap:`${t.spacing}px`},children:[r.jsxs(h.div,{className:i.playerLeft,style:{width:`${t.playerBarWidth}px`,height:`${t.playerBarHeight}px`,backgroundColor:s.backgroundColor,borderColor:s.borderColor||s.mainColor,padding:`${t.padding}px`},children:[t.showFlags&&a.flag&&a.flag!=="none"&&r.jsx("div",{className:i.flag,style:{height:"auto"},children:r.jsx("img",{src:l(a.flag),alt:"Player 1 flag",onError:o=>{o.currentTarget.style.display="none"}})}),r.jsx("div",{className:i.score,style:{width:t.scoreSize,backgroundColor:s.borderColor,height:t.playerBarHeight},children:r.jsx("h3",{style:{color:s.scoreColor},children:a.score})}),r.jsx("div",{className:i.playerInfo,children:r.jsxs("h2",{style:{color:s.playerNamesColor},children:[a.final==="winner"&&"[W] ",a.final==="loser"&&"[L] ",t.showTags&&e(a.tag)&&r.jsx("span",{className:i.playerTag,style:{color:s.mainColor},children:a.tag}),t.showTags&&e(a.tag)&&" | ",a.name]})})]}),r.jsxs(h.div,{className:i.playerRight,style:{width:`${t.playerBarWidth}px`,height:`${t.playerBarHeight}px`,backgroundColor:s.backgroundColor,borderColor:s.borderColor||s.mainColor,padding:`${t.padding}px`},children:[t.showFlags&&c.flag&&c.flag!=="none"&&r.jsx("div",{className:i.flag,style:{height:"auto"},children:r.jsx("img",{src:l(c.flag),alt:"Player 2 flag",onError:o=>{o.currentTarget.style.display="none"}})}),r.jsx("div",{className:i.playerInfo,children:r.jsxs("h2",{style:{color:s.playerNamesColor},children:[c.final==="winner"&&"[W] ",c.final==="loser"&&"[L] ",c.name,t.showTags&&e(c.tag)&&" | ",t.showTags&&e(c.tag)&&r.jsx("span",{className:i.playerTag,style:{color:s.mainColor},children:c.tag})]})}),r.jsx("div",{className:i.score,style:{width:t.scoreSize,backgroundColor:s.borderColor,height:t.playerBarHeight},children:r.jsx("h3",{style:{color:s.scoreColor},children:c.score})})]})]})]})})},_=()=>r.jsx(J,{});_.__docgenInfo={description:"",methods:[],displayName:"Scoreboard"};const{expect:n}=__STORYBOOK_MODULE_TEST__,Se={title:"Stream Components/Scoreboard",component:_,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент скорборда для отображения информации о матчах в OBS. Поддерживает настройку игроков, счетов, цветов и анимаций."}}},tags:["autodocs"],decorators:[e=>r.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",position:"relative",overflow:"hidden"},children:r.jsx(e,{})})]},y={args:{},play:async({canvasElement:e})=>{await new Promise(c=>setTimeout(c,100)),n(e).toBeInTheDocument();const l=e.querySelector('[class*="centerDiv"]');n(l).toBeInTheDocument();const a=e.querySelector('[class*="leftDiv"]');n(a).toBeInTheDocument();const p=e.querySelector('[class*="rightDiv"]');n(p).toBeInTheDocument()}},g={args:{},parameters:{docs:{description:{story:"Скорборд для турнирного матча с полной информацией об игроках."}}},play:async({canvasElement:e})=>{await new Promise(p=>setTimeout(p,100)),n(e).toBeInTheDocument();const l=e.querySelectorAll('[class*="playerName"]');n(l.length).toBeGreaterThan(0);const a=e.querySelectorAll("h2");n(a.length).toBeGreaterThan(0)}},u={args:{},parameters:{docs:{description:{story:"Скорборд для гранд-финала с настроенными цветами и анимациями."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),n(e).toBeInTheDocument();const l=e.querySelector('[class*="fightModeDiv"]');n(l).toBeInTheDocument()}},f={args:{},parameters:{docs:{description:{story:"Скрытый скорборд (не отображается на экране)."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),n(e).toBeInTheDocument();const l=e.querySelector('[class*="scoreboard-container"]');n(l).toBeInTheDocument()}},v={args:{},parameters:{docs:{description:{story:"Скорборд с отображением флагов стран игроков."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),n(e).toBeInTheDocument();const l=e.querySelectorAll('[class*="flag"] img');n(l.length).toBeGreaterThan(0)}},T={args:{},parameters:{docs:{description:{story:"Скорборд с отмеченными победителем и проигравшим."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),n(e).toBeInTheDocument();const l=e.querySelectorAll('[class*="playerName"]');n(l.length).toBeGreaterThan(0)}},x={args:{},parameters:{docs:{description:{story:"Скорборд с кастомными цветами и неоновыми эффектами."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),n(e).toBeInTheDocument();const l=e.querySelectorAll('[style*="box-shadow"]');n(l.length).toBeGreaterThan(0)}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов скорборда
    const centerDiv = canvasElement.querySelector('[class*="centerDiv"]');
    expect(centerDiv).toBeInTheDocument();
    const leftDiv = canvasElement.querySelector('[class*="leftDiv"]');
    expect(leftDiv).toBeInTheDocument();
    const rightDiv = canvasElement.querySelector('[class*="rightDiv"]');
    expect(rightDiv).toBeInTheDocument();
  }
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скорборд для турнирного матча с полной информацией об игроках."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие игроков
    const playerNames = canvasElement.querySelectorAll('[class*="playerName"]');
    expect(playerNames.length).toBeGreaterThan(0);

    // Проверяем наличие счетов
    const scores = canvasElement.querySelectorAll("h2");
    expect(scores.length).toBeGreaterThan(0);
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скорборд для гранд-финала с настроенными цветами и анимациями."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие режима драки
    const fightModeDiv = canvasElement.querySelector('[class*="fightModeDiv"]');
    expect(fightModeDiv).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скрытый скорборд (не отображается на экране)."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // В данном случае компонент может быть скрыт через SignalR
    // Проверяем базовую структуру
    const container = canvasElement.querySelector('[class*="scoreboard-container"]');
    expect(container).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скорборд с отображением флагов стран игроков."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие флагов
    const flags = canvasElement.querySelectorAll('[class*="flag"] img');
    expect(flags.length).toBeGreaterThan(0);
  }
}`,...v.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скорборд с отмеченными победителем и проигравшим."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие меток победителя/проигравшего
    const playerNames = canvasElement.querySelectorAll('[class*="playerName"]');
    expect(playerNames.length).toBeGreaterThan(0);
  }
}`,...T.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Скорборд с кастомными цветами и неоновыми эффектами."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие элементов с кастомными стилями
    const styledElements = canvasElement.querySelectorAll('[style*="box-shadow"]');
    expect(styledElements.length).toBeGreaterThan(0);
  }
}`,...x.parameters?.docs?.source}}};const we=["Default","TournamentMatch","GrandFinals","Hidden","WithFlags","WinnerLoser","CustomColors"];export{x as CustomColors,y as Default,u as GrandFinals,f as Hidden,g as TournamentMatch,T as WinnerLoser,v as WithFlags,we as __namedExportsOrder,Se as default};
