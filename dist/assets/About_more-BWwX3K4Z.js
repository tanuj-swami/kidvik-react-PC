import{t as e}from"./What_Drives_Us-CG423oYi.js";import{I as t,K as n,L as r,Z as i,c as a,o,s,z as c}from"./index-BwT3Dd-R.js";var l=i(n());a();var u=i(r());function d(){let[n,r]=(0,l.useState)(null),[i,a]=(0,l.useState)(!0),{topbarData:s}=t();return(0,l.useEffect)(()=>{(async()=>{try{let e=await(await fetch(`${c}/AboutUs`)).json();e.data&&e.data.length>0&&r(e.data[0])}catch(e){console.error(`Error fetching About data:`,e)}finally{a(!1)}})()},[]),i?(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(o,{})}):n?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(`div`,{className:`container-fluid py-5 about bg-light`,style:{backgroundPosition:`center center`,backgroundRepeat:`no-repeat`,backgroundSize:`cover`},children:[(0,u.jsx)(`div`,{className:`container py-5`,children:(0,u.jsxs)(`div`,{className:`row g-5 align-items-center`,children:[(0,u.jsx)(`div`,{className:`col-lg-6`,children:(0,u.jsx)(p,{children:(0,u.jsx)(`video`,{autoPlay:!0,loop:!0,playsInline:!0,poster:`img/video-thumbnail.jpg`,children:(0,u.jsx)(`source`,{src:`${c}${n.AboutUs_Image}`,type:`video/mp4`})})})}),(0,u.jsxs)(`div`,{className:`col-lg-6 wow fadeIn`,"data-wow-delay":`0.3s`,children:[(0,u.jsx)(`h4`,{className:`text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius`,children:n?.AboutUs_Top_Line}),(0,u.jsx)(`h1`,{className:`text-dark mb-4 fw-bold `,children:n?.AboutUs_Heading}),(0,u.jsx)(`p`,{className:`text-dark mb-4`,dangerouslySetInnerHTML:{__html:n?.AboutUs_Description}})]})]})}),(0,u.jsx)(e,{showCards:!0}),(0,u.jsxs)(`div`,{className:`container`,children:[(0,u.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n?.key_Points}}),s?.topbar_text&&(0,u.jsxs)(`div`,{className:`text-dark text-center mx-auto d-flex align-items-center gap-2 bg-light p-3 rounded-pill px-3`,children:[(0,u.jsx)(`span`,{children:s?.topbar_text}),s?.Button_text&&(0,u.jsx)(`a`,{href:s?.Button_link||`#`,className:`btn btn-sm btn-dark rounded-pill px-3`,children:s?.Button_text})]})]})]})}):(0,u.jsx)(`p`,{className:`text-center py-5`,children:`No About data found.`})}var f=d,p=s.div`
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