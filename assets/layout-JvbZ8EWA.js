import{u as d,r as n,j as e,N as o,O as m}from"./index-oo_Lm1wd.js";const i=[{title:"Home",route:"/"},{title:"How to use",route:"/how-to-use"},{title:"About",route:"/about"}],x=()=>{const{pathname:c}=d(),[a,l]=n.useState(!1),r=()=>{l(!a)};return n.useEffect(()=>{l(!1)},[c]),e.jsxs("div",{className:"app",children:[e.jsxs("nav",{className:"menu-bar",children:[e.jsx("div",{className:"logo",children:"Your Logo"}),e.jsx("div",{className:"menu-items",children:i.map(({route:s,title:t})=>e.jsx(o,{to:s,children:t},s))}),e.jsx("div",{className:"menu-toggle",onClick:r,children:e.jsxs("div",{className:`menu-icon ${a&&"open"}`,children:[e.jsx("div",{className:"line"}),e.jsx("div",{className:"line"}),e.jsx("div",{className:"line"})]})})]}),e.jsx("div",{className:`drawer ${a?"open":""}`,children:i.map(({route:s,title:t})=>e.jsx(o,{to:s,children:t},s))}),e.jsx("div",{className:"content",children:e.jsx(m,{})})]})};export{x as default};
