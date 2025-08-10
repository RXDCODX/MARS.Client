import{j as p}from"./iframe-DfjFra_E.js";import{P as d}from"./PlayerCard-C8btL7Yc.js";import"./index-DDUjKJzf.js";import"./index-73zqftOg.js";import"./index-Chjiymov.js";import"./index-oSaGBWdX.js";import"./index-eIvpPVhI.js";import"./react-dRZq-Y5g.js";import"./useSiteColors-tsaUY5WF.js";import"./scoreboardStore-CdLYDQ0k.js";import"./Button-CxEJlOI-.js";import"./SignalRHubWrapper-BMh2Frid.js";import"./arrow-repeat-DGzhmTQY.js";const{expect:a}=__STORYBOOK_MODULE_TEST__,S={title:"Stream Components/Scoreboard/AdminPanel/PlayerCard",component:d,parameters:{layout:"centered",docs:{description:{component:"Карточка игрока для панели администратора. Позволяет редактировать имя, спонсора, счет, тег, флаг и статус игрока."}}},tags:["autodocs"],decorators:[e=>p.jsx("div",{style:{width:"400px",padding:"20px",background:"#f8f9fa"},children:p.jsx(e,{})})]},c={args:{playerIndex:1,label:"Player 1",accent:"#0dcaf0"},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}},o={args:{playerIndex:2,label:"Player 2",accent:"#6610f2"},parameters:{docs:{description:{story:"Карточка второго игрока с фиолетовым акцентом."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}},s={args:{playerIndex:1,label:"Custom Player",accent:"#ff6b35"},parameters:{docs:{description:{story:"Карточка игрока с кастомным оранжевым акцентом."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}},n={args:{playerIndex:1,label:"Very Long Player Label",accent:"#28a745"},parameters:{docs:{description:{story:"Карточка игрока с длинным названием."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}},l={args:{playerIndex:2,label:"Dark Player",accent:"#343a40"},parameters:{docs:{description:{story:"Карточка игрока с темным акцентом."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}},m={args:{playerIndex:1,label:"Neon Player",accent:"#00ff88"},parameters:{docs:{description:{story:"Карточка игрока с неоновым зеленым акцентом."}}},play:async({canvasElement:e})=>{await new Promise(t=>setTimeout(t,100)),a(e).toBeInTheDocument();const r=e.querySelector('[class*="player-card"]');a(r).toBeInTheDocument()}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 1,
    label: "Player 1",
    accent: "#0dcaf0"
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 2,
    label: "Player 2",
    accent: "#6610f2"
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка второго игрока с фиолетовым акцентом."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 1,
    label: "Custom Player",
    accent: "#ff6b35"
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока с кастомным оранжевым акцентом."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 1,
    label: "Very Long Player Label",
    accent: "#28a745"
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока с длинным названием."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 2,
    label: "Dark Player",
    accent: "#343a40"
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока с темным акцентом."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    playerIndex: 1,
    label: "Neon Player",
    accent: "#00ff88"
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока с неоновым зеленым акцентом."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};const b=["Player1","Player2","WithCustomAccent","LongLabel","DarkAccent","NeonAccent"];export{l as DarkAccent,n as LongLabel,m as NeonAccent,c as Player1,o as Player2,s as WithCustomAccent,b as __namedExportsOrder,S as default};
