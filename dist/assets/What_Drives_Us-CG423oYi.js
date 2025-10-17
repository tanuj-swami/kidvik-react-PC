import{B as e,K as t,L as n,V as r,Z as i,c as a,p as o,s,t as c,x as l}from"./index-BwT3Dd-R.js";var u=o(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),d=o(`shield`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]),f=o(`target`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`circle`,{cx:`12`,cy:`12`,r:`6`,key:`1vlfrh`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}]]),p=o(`users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`,key:`16gr8j`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]);t(),a();var m=i(n()),h=[{icon:u,title:`child Oriented`,description:`Every decision we make puts parents and children at the center. We understand the challenges of parenting and build solutions that truly help.`,color:`#ef4444`},{icon:d,title:`Trust & Safety`,description:`All our partners are verified and reviewed. We maintain the highest standards to ensure your family's safety and peace of mind.`,color:`#2563eb`},{icon:p,title:`Community Driven`,description:`Real reviews from real parents. Our community shares honest experiences to help other families make informed decisions.`,color:`#16a34a`},{icon:f,title:`Local Focus`,description:`We believe in supporting local businesses and communities. Find services in your neighborhood and build lasting local connections.`,color:`#8b5cf6`}],g=s.div`
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: ${e=>e.bg||`#fff`};
  padding: 1.5rem;
    text-align: center;
    border-radius: 1rem;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`,_=s.div`
  width: 4rem;
  height: 4rem;
  background-color: ${e=>e.bg||`#f3f4f6`};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  transition: transform 0.3s;
  ${g}:hover & {
    transform: scale(1.1);
  }
`,v=({showCards:t=!0})=>(0,m.jsx)(`section`,{className:`py-5`,style:{background:e},children:(0,m.jsxs)(`div`,{className:`container mb-5`,children:[(0,m.jsx)(c,{icon:(0,m.jsx)(l,{}),Topheading:`What Drives Us`,firstHeading:`Guided by Purpose`,secondHeading:`, Inspired by Families`,description:`At the heart of everything we do lies a deep commitment to parents, safety, and community.\r
       We believe every decision should make life simpler, safer, and more connected for families..`}),(0,m.jsx)(r,{to:`about`,children:(0,m.jsx)(`div`,{className:`text-center`,children:(0,m.jsx)(`button`,{className:`btn btn-primary`,children:`Read More`})})}),t&&(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(`div`,{className:`row g-4`,children:h.map((e,t)=>{let n=e.icon;return(0,m.jsx)(`div`,{className:`col-12 col-md-6 col-lg-3 text-center`,children:(0,m.jsxs)(g,{children:[(0,m.jsx)(_,{bg:`#e3e8f1ff`,children:(0,m.jsx)(n,{size:24,color:e.color})}),(0,m.jsx)(`h5`,{className:`fw-semibold mb-2`,children:e.title}),(0,m.jsx)(`p`,{className:`text-muted`,children:e.description})]})},t)})})})]})});export{v as t};