import"./What_Drives_Us-BaOvqUSw.js";import{A as e,M as t,O as n,W as r,c as i,o as a,s as o,z as s}from"./index-A1ioPTrq.js";var c=r(s());i();var l=r(e());function u(){let[e,r]=(0,c.useState)(null),[i,o]=(0,c.useState)(!0),{topbarData:s}=n();return(0,c.useEffect)(()=>{(async()=>{try{let e=await(await fetch(`${t}/AboutUs`)).json();e.data&&e.data.length>0&&r(e.data[0])}catch(e){console.error(`Error fetching About data:`,e)}finally{o(!1)}})()},[]),i?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(a,{})}):e?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(`div`,{className:`container py-5`,children:(0,l.jsxs)(`div`,{className:`row g-5 align-items-center`,children:[(0,l.jsxs)(`div`,{className:`col-lg-6 wow fadeIn`,"data-wow-delay":`0.3s`,children:[(0,l.jsx)(`h4`,{className:`text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius`,children:`Our Story`}),(0,l.jsx)(`h1`,{className:`text-dark mb-4 fw-bold `,children:`“Making Parenting Easier, Smarter, and More Connected.”`}),(0,l.jsx)(`p`,{children:`Every parent wants the best for their child — yet finding trusted services, reliable guidance, and enriching activities often feels like an endless search. As parents ourselves, we’ve been there — navigating countless recommendations, comparing schools, healthcare providers, and experiences that truly nurture a child’s growth.`}),(0,l.jsx)(`p`,{children:`That’s where KIDVIK began — born from a heartfelt desire to make parenting simpler, smarter, and more connected.`}),(0,l.jsx)(`p`,{children:`We set out to create a platform where everything related to children — from education and healthcare to events, recreation, and essentials — comes together in one trusted space. A place where parents can explore verified options, make confident choices, and feel supported at every step.`}),(0,l.jsx)(`p`,{children:`What started as a personal need soon became our purpose: to empower parents with convenience and confidence, while helping children explore, learn, and thrive.`}),(0,l.jsx)(`p`,{children:`At KIDVIK, we’re more than just a platform — we’re a community built by parents, for parents. Every feature we design and every service we share carries one goal: to make raising happy, healthy, and confident kids a little easier every day.`}),(0,l.jsx)(`p`,{children:`Because when parents feel supported, children truly shine.`})]}),(0,l.jsx)(`div`,{className:`col-lg-6`,children:(0,l.jsx)(`div`,{className:`w-100 h-100`,children:(0,l.jsx)(`img`,{src:`/img/kidvik_app_ss/our_story.png`,alt:`Google Play`,className:`me-2`,style:{width:`100%`,height:`100%`}})})})]})})}):(0,l.jsx)(`p`,{className:`text-center py-5`,children:`No About data found.`})}var d=u;o.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 1rem;

  video {
    width: 100%;
    height: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 1rem;
  }

  @media (max-width: 992px) {
    video {
      max-height: 400px;
    }
  }

  @media (max-width: 576px) {
    video {
      max-height: 250px;
    }
  }
`;export{d as default};