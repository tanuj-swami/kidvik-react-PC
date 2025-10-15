import{t as e}from"./What_Drives_Us-LQubXAyK.js";import{F as t,L as n,P as r,W as i,Y as a,a as o,o as s,s as c}from"./index-jgXFUliQ.js";var l=a(i());c();var u=a(t());function d(){let[t,i]=(0,l.useState)(null),[a,s]=(0,l.useState)(!0),{topbarData:c}=r();return(0,l.useEffect)(()=>{(async()=>{try{let e=await(await fetch(`${n}/AboutUs`)).json();e.data&&e.data.length>0&&i(e.data[0])}catch(e){console.error(`Error fetching About data:`,e)}finally{s(!1)}})()},[]),a?(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(o,{})}):t?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(`div`,{className:`container-fluid py-5 about bg-light`,style:{backgroundPosition:`center center`,backgroundRepeat:`no-repeat`,backgroundSize:`cover`},children:[(0,u.jsx)(`div`,{className:`container py-5`,children:(0,u.jsxs)(`div`,{className:`row g-5 align-items-center`,children:[(0,u.jsx)(`div`,{className:`col-lg-6`,children:(0,u.jsx)(p,{children:(0,u.jsx)(`video`,{autoPlay:!0,loop:!0,playsInline:!0,poster:`img/video-thumbnail.jpg`,children:(0,u.jsx)(`source`,{src:`${n}${t.AboutUs_Image}`,type:`video/mp4`})})})}),(0,u.jsxs)(`div`,{className:`col-lg-6 wow fadeIn`,"data-wow-delay":`0.3s`,children:[(0,u.jsx)(`h4`,{className:`text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius`,children:t?.AboutUs_Top_Line}),(0,u.jsx)(`h1`,{className:`text-dark mb-4 fw-bold `,children:t?.AboutUs_Heading}),(0,u.jsx)(`p`,{className:`text-dark mb-4`,dangerouslySetInnerHTML:{__html:t?.AboutUs_Description}})]})]})}),(0,u.jsx)(e,{showCards:!0}),(0,u.jsxs)(`div`,{className:`container`,children:[(0,u.jsx)(`div`,{dangerouslySetInnerHTML:{__html:t?.key_Points}}),c?.topbar_text&&(0,u.jsxs)(`div`,{className:`text-dark text-center mx-auto d-flex align-items-center gap-2 bg-light p-3 rounded-pill px-3`,children:[(0,u.jsx)(`span`,{children:c?.topbar_text}),c?.Button_text&&(0,u.jsx)(`a`,{href:c?.Button_link||`#`,className:`btn btn-sm btn-dark rounded-pill px-3`,children:c?.Button_text})]})]})]})}):(0,u.jsx)(`p`,{className:`text-center py-5`,children:`No About data found.`})}var f=d,p=s.div`
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
`;export{f as default};