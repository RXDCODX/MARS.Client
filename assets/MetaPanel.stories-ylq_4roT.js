import{j as l}from"./iframe-PHcFrRmL.js";import{M as p}from"./MetaPanel-D89qBjud.js";import"./preload-helper-D9Z9MdNV.js";import"./useSiteColors-BsKrCtLD.js";import"./scoreboardStore-CgHsYiJp.js";import"./Button-loYsoPvK.js";import"./index-Chjiymov.js";import"./SignalRHubWrapper-CTmjHOC8.js";import"./index-DwFFu-Uq.js";import"./react-XNwDcf-4.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,v={title:"Stream Components/Scoreboard/AdminPanel/MetaPanel",component:p,parameters:{layout:"centered",docs:{description:{component:"Панель для настройки мета-информации скорборда: название турнира и правила боя."}}},tags:["autodocs"],argTypes:{setMeta:{action:"meta changed"}},decorators:[e=>l.jsx("div",{style:{width:"400px",padding:"20px",background:"#f8f9fa"},children:l.jsx(e,{})})]},r={args:{meta:{title:"Tournament Name",fightRule:"Grand Finals"}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelector('[class*="meta-panel"]');t(a).toBeInTheDocument()}},s={args:{meta:{title:"Street Fighter 6 Championship",fightRule:"Grand Finals"}},parameters:{docs:{description:{story:"Мета-панель для турнирного матча."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelector('input[placeholder*="title"]');t(a).toBeInTheDocument()}},n={args:{meta:{title:"Exhibition Match",fightRule:"Best of 3"}},parameters:{docs:{description:{story:"Мета-панель для выставочного матча."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelector('input[placeholder*="fight"]');t(a).toBeInTheDocument()}},c={args:{meta:{title:"Season Finals",fightRule:"Best of 5"}},parameters:{docs:{description:{story:"Мета-панель для финального матча сезона."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelectorAll('input[type="text"]');t(a.length).toBeGreaterThan(0)}},i={args:{meta:{title:"",fightRule:""}},parameters:{docs:{description:{story:"Мета-панель с пустыми полями."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelector('[class*="card"]');t(a).toBeInTheDocument()}},m={args:{meta:{title:"Very Long Tournament Name That Might Overflow",fightRule:"Special Rules for This Tournament"}},parameters:{docs:{description:{story:"Мета-панель с длинным названием турнира."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const a=e.querySelector('[class*="card-header"]');t(a).toBeInTheDocument()}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "Tournament Name",
      fightRule: "Grand Finals"
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие панели мета-информации
    const panel = canvasElement.querySelector('[class*="meta-panel"]');
    expect(panel).toBeInTheDocument();
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "Street Fighter 6 Championship",
      fightRule: "Grand Finals"
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Мета-панель для турнирного матча."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие поля названия турнира
    const titleInput = canvasElement.querySelector('input[placeholder*="title"]');
    expect(titleInput).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "Exhibition Match",
      fightRule: "Best of 3"
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Мета-панель для выставочного матча."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие поля правил боя
    const fightRuleInput = canvasElement.querySelector('input[placeholder*="fight"]');
    expect(fightRuleInput).toBeInTheDocument();
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "Season Finals",
      fightRule: "Best of 5"
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Мета-панель для финального матча сезона."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие всех полей ввода
    const inputs = canvasElement.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBeGreaterThan(0);
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "",
      fightRule: ""
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Мета-панель с пустыми полями."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие карточки
    const card = canvasElement.querySelector('[class*="card"]');
    expect(card).toBeInTheDocument();
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    meta: {
      title: "Very Long Tournament Name That Might Overflow",
      fightRule: "Special Rules for This Tournament"
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Мета-панель с длинным названием турнира."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие заголовка карточки
    const cardHeader = canvasElement.querySelector('[class*="card-header"]');
    expect(cardHeader).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};const w=["Default","Tournament","Exhibition","Finals","Empty","LongTitle"];export{r as Default,i as Empty,n as Exhibition,c as Finals,m as LongTitle,s as Tournament,w as __namedExportsOrder,v as default};
