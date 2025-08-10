import{M as a}from"./MetricCard-LiAajUN0.js";import"./iframe-gjcH4K4g.js";const i={title:"ControlRoom/MetricCard",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:{type:"select"},options:["blue","green","purple","orange","red","teal"]},trendDirection:{control:{type:"select"},options:["up","down","stable"]}}},e={args:{title:"Использование CPU",value:"67.5%",icon:"🖥️",color:"blue",trend:"+2.5%",trendDirection:"up"}},r={args:{title:"Использование памяти",value:"45.2%",icon:"💾",color:"green",trend:"-1.2%",trendDirection:"down"}},n={args:{title:"Активные соединения",value:"1,234",icon:"🔗",color:"purple",trend:"+15",trendDirection:"up"}},o={args:{title:"Ошибки (%)",value:"0.8%",icon:"⚠️",color:"red",trend:"-0.5%",trendDirection:"down"}},t={args:{title:"Время работы",value:"5д 12ч 34м",icon:"⏱️",color:"teal",trend:"Стабильно",trendDirection:"stable"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Использование CPU",
    value: "67.5%",
    icon: "🖥️",
    color: "blue",
    trend: "+2.5%",
    trendDirection: "up"
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Использование памяти",
    value: "45.2%",
    icon: "💾",
    color: "green",
    trend: "-1.2%",
    trendDirection: "down"
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Активные соединения",
    value: "1,234",
    icon: "🔗",
    color: "purple",
    trend: "+15",
    trendDirection: "up"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Ошибки (%)",
    value: "0.8%",
    icon: "⚠️",
    color: "red",
    trend: "-0.5%",
    trendDirection: "down"
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Время работы",
    value: "5д 12ч 34м",
    icon: "⏱️",
    color: "teal",
    trend: "Стабильно",
    trendDirection: "stable"
  }
}`,...t.parameters?.docs?.source}}};const l=["CPUUsage","MemoryUsage","ActiveConnections","ErrorRate","Uptime"];export{n as ActiveConnections,e as CPUUsage,o as ErrorRate,r as MemoryUsage,t as Uptime,l as __namedExportsOrder,i as default};
