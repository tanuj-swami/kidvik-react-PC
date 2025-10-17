import{t as e}from"./What_Drives_Us-CG423oYi.js";import{A as t,B as n,H as r,K as i,L as a,M as o,N as s,P as c,S as l,V as u,Z as d,_ as ee,b as f,c as p,f as m,l as h,m as g,n as _,o as v,p as y,s as b,t as x,u as S,v as C,w,y as T,z as E}from"./index-BwT3Dd-R.js";import{n as D,t as O}from"./GlobalOwlSlider -DTDfH-eQ.js";import"./Services-CP6Y9Acw.js";import"./Kidvik_programe-BfI1Wf-_.js";import"./Kidvik_Event-BgIPYBmY.js";import{t as k}from"./Blog-DI1wTo9m.js";import"./Testimonials-Dpr2WiDr.js";import"./Contact_us-cNNqqo91.js";var A=y(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),j=d(D()),M=d(i()),N=d(a());function P(){let[e,t]=(0,M.useState)([]),[n,r]=(0,M.useState)(!0);return(0,M.useEffect)(()=>{fetch(`${E}/Slider/?Slider_Plateform=web`).then(e=>e.json()).then(e=>{Array.isArray(e?.data)&&t(e.data)}).catch(e=>console.error(`Error fetching slider:`,e)).finally(()=>r(!1))},[]),n?(0,N.jsx)(v,{}):e.length===0?(0,N.jsx)(`div`,{className:`text-center py-5`,children:(0,N.jsx)(`h4`,{children:`No slides found`})}):(0,N.jsx)(j.default,{dots:!0,appendDots:e=>(0,N.jsx)(`ul`,{className:`custom-dots`,children:e}),customPaging:()=>(0,N.jsx)(`div`,{className:`custom-dot`}),infinite:!0,speed:800,autoplay:!0,autoplaySpeed:3e3,slidesToShow:1,slidesToScroll:1,arrows:!1,children:e.map((e,t)=>(0,N.jsx)(`div`,{className:`p-0 m-0`,children:(0,N.jsx)(`div`,{className:`slider-bg`,style:{backgroundImage:`linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('${E}${e.Slider_image}')`},children:(e.Slider_maintext||e.Slider_topline)&&(0,N.jsxs)(`div`,{className:`text-center align-items-center pt-5`,children:[e.Slider_topline&&(0,N.jsx)(`h3`,{className:`text-primary mb-3 display-5 `,children:e.Slider_topline}),e.Slider_maintext&&(0,N.jsx)(`h3`,{className:`display-5 text-white mb-4`,children:e.Slider_maintext}),(0,N.jsxs)(`div`,{children:[e.Slider_button_text1&&(0,N.jsx)(`a`,{href:``,className:`btn btn-primary px-4 py-3 px-md-5 me-3 btn-border-radius`,children:e.Slider_button_text1}),e.Slider_button_text2&&(0,N.jsx)(`a`,{href:``,className:`btn btn-primary px-4 py-3 px-md-5 btn-border-radius`,children:e.Slider_button_text2})]})]})})},t))})}var F=P;p();var I=b.div`
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
`,L=b.div`
  h1 {
    font-size: 2rem;
    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }

  p {
    transition: max-height 0.3s ease, overflow 0.3s ease;
    overflow: hidden;
  }
`;function R(){let[e,t]=(0,M.useState)(null),[n,r]=(0,M.useState)(!0),[i,a]=(0,M.useState)(!1);return(0,M.useEffect)(()=>{(async()=>{try{let e=await(await fetch(`${E}/AboutUs`)).json();e.data&&e.data.length>0&&t(e.data[0])}catch(e){console.error(`Error fetching About data:`,e)}finally{r(!1)}})()},[]),n?(0,N.jsx)(v,{}):e?(0,N.jsx)(`div`,{className:`container-fluid py-2 about`,children:(0,N.jsx)(`div`,{className:`container py-5`,children:(0,N.jsxs)(`div`,{className:`row g-5 align-items-center`,children:[(0,N.jsx)(`div`,{className:`col-lg-6`,children:(0,N.jsx)(I,{children:(0,N.jsx)(`video`,{muted:!0,autoPlay:!0,loop:!0,playsInline:!0,poster:`img/video-thumbnail.jpg`,children:(0,N.jsx)(`source`,{src:`${E}${e.AboutUs_Image}`,type:`video/mp4`})})})}),(0,N.jsx)(`div`,{className:`col-lg-6`,children:(0,N.jsxs)(L,{children:[(0,N.jsx)(`h4`,{className:`text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 rounded`,children:e.AboutUs_Top_Line}),(0,N.jsx)(`h1`,{className:`text-dark mb-4 fw-bold`,children:e.AboutUs_Heading}),(0,N.jsxs)(`div`,{className:`text-dark mb-3`,style:{whiteSpace:`pre-line`},children:[i?(0,N.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e.AboutUs_Description}}):(0,N.jsx)(`div`,{dangerouslySetInnerHTML:{__html:`${e.AboutUs_Description.slice(0,500)}...`}}),e.AboutUs_Description.length>500&&(0,N.jsx)(`button`,{className:`btn btn-link p-0`,onClick:()=>a(!i),children:i?`Read Less`:`Read More`})]}),e.AboutUs_More_Button===1&&(0,N.jsx)(`a`,{href:e.AboutUs_More_Button_link||`#`,className:`btn btn-primary px-5 py-3 ms-3 mt-3 rounded`,children:e.AboutUs_More_Button_text})]})})]})})}):(0,N.jsx)(`p`,{className:`text-center py-5`,children:`No About data found.`})}var z=R;D(),p(),b.div`
  position: relative;
  border-radius: 1rem;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  
  
  /* Light background based on props */
  background-color: ${e=>e.bg||`#d1fae5`}; /* default green-light */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .checkmark {
    position: absolute;
    top: 0.40rem;
    right: 0.50rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`,p(),b.section`
  padding: 3rem 1rem;
  background-color: #f9fafb;
`,b.div`
  text-align: center;
  margin-bottom: 3rem;

  span {
    background-color: #e0f2fe;
    color: #0284c7;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  h2 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 2rem;

    span {
      color: #0284c7;
    }
  }

  p {
    margin-top: 0.75rem;
    color: #6b7280;
    font-size: 1rem;
  }
`,b.div`
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out; /* smooth animation for all properties */

  &:hover {
    transform: translateY(-5px); /* card lifts slightly */
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2); /* stronger shadow on hover */

    .btn-outline {
      background-color: #0284c7; /* blue bg */
      color: #ffffff; /* white text */
      border: 1px solid #0284c7;
    }
  }

  .icon {
    font-size: 2.5rem;
    transition: transform 0.3s; /* smooth icon effect if needed */
  }

  h3 {
    margin-top: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  ul {
    margin-top: 0.5rem;
    color: #374151;
    font-size: 0.875rem;
    padding-left: 1.25rem;
    list-style:none;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #0284c7;
    border-radius: 0.5rem;
    background: transparent;
    color: #0284c7;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-top: auto; /* push button to bottom */
  }

  .btn-outline .icon {
    font-size: 1rem;
    transition: transform 0.3s;
  }

//   &:hover .icon {
//     transform: scale(1.1); 
//   }


.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.icon {
  font-size: 2rem;
}

`,b.button`
  background-color: #0284c7;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0369a1;
  }
`,p();var B=[{icon:(0,N.jsx)(o,{}),title:`Search & Discover`,description:`Enter your location and find services near you. Browse categories or search for specific needs.`,step:`01`,color:`text-primary`},{icon:(0,N.jsx)(w,{}),title:`Filter & Compare`,description:`Use smart filters to find exactly what you need. Compare ratings, prices, and reviews from real parents.`,step:`02`,color:`text-info`},{icon:(0,N.jsx)(T,{}),title:`Connect & Book`,description:`Contact service providers directly, book appointments, or visit locations with confidence.`,step:`03`,color:`text-success`}],V=()=>(0,N.jsx)(H,{children:(0,N.jsx)(`section`,{className:`py-5`,id:`how-it-works`,children:(0,N.jsxs)(`div`,{className:`container`,children:[(0,N.jsx)(x,{icon:(0,N.jsx)(f,{}),Topheading:`simple process`,firstHeading:`How Kidvik`,secondHeading:`Makes Parenting Easier`,description:`Finding the right services for your child shouldn’t be stressful. Our simple 4-step process helps you discover, compare, and connect with trusted local services.`}),(0,N.jsxs)(`div`,{className:`row g-4 position-relative`,children:[(0,N.jsx)(`div`,{className:`d-none d-lg-block position-absolute top-50 start-0 end-0 translate-middle-y mx-5`,children:(0,N.jsx)(`div`,{className:`w-100`,style:{height:`3px`,background:`linear-gradient(to right, #0d6efd, #6610f2, #198754)`}})}),B.map((e,t)=>(0,N.jsxs)(`div`,{className:`col-12 col-md-6 col-lg-4 text-center `,children:[(0,N.jsx)(`div`,{className:`step-circle bg-primary text-white mx-auto`,children:e.step}),(0,N.jsx)(`div`,{className:`card shadow-sm  h-100 mt-4 how-card `,children:(0,N.jsxs)(`div`,{className:`card-body`,children:[(0,N.jsx)(`div`,{className:`icon-box mx-auto mb-4 ${e.color}`,style:{background:`${e.color===`text-primary`?`#e7f1ff`:e.color===`text-info`?`#e0f7fa`:e.color===`text-warning`?`#fff3cd`:`#e9fbe7`}`},children:e.icon}),(0,N.jsx)(`h5`,{className:`fw-semibold mb-2`,children:e.title}),(0,N.jsx)(`p`,{className:`text-muted`,children:e.description})]})})]},t))]})]})})}),H=b.section`
  background: linear-gradient(135deg, #eaeef3ff, #eceef1ff); /* section ka halka gradient */

  .step-circle {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20px;
    position: relative;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .icon-box {
    width: 70px;
    height: 70px;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    transition: 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  /* Alag-alag color backgrounds */
  // .text-primary { background: #e7f1ff; color: #0d6efd; }
  // .text-info { background: #e0f7fa; color: #0dcaf0; }
  // .text-warning { background: #fff3cd; color: #ffc107; }
  // .text-success { background: #e9fbe7; color: #198754; }

  .how-card {
    background: #fff;
    border: 1px solid #d1cfcfff;
    border-radius: 1rem;
    box-shadow: 0 6px 15px rgba(0,0,0,0.09);
    transition: all 0.3s ease-in-out;
  }

  .how-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0,0,0,0.12);
  }

  .how-card:hover .icon-box {
    transform: scale(1.15);
  }
`,U=V;p();var W=b.div`
  width: 100%;
  max-width: 1140px; /* Match Bootstrap container-lg width */
  margin: 0 auto;
  padding: 0 1rem; /* Bootstrap default padding */
  
`,te=b.section`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 4rem 1rem;
  background: #f9fafb;
  gap: 2rem;
  min-height: 500px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    padding: 3rem 1rem;
    min-height: unset;
  }

  @media (max-width: 600px) {
    padding: 2rem 0.5rem;
  }
`,G=b.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .badge {
    display: inline-block;
    background: #e6fbe6;
    // color: #22c55e;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: 1em;
    padding: 0.3em 1em;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;

    .blue {
      color: #0284c7;
    }
  }

  p {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    max-width: 500px;
  }

  @media (max-width: 600px) {
    text-align: center;

    p {
      max-width: 100%;
      font-size: 0.95rem;
    }
  }
`,K=b.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 0.5em;
    flex: 1 1 45%;
    min-width: 140px;

    .icon {
      font-size: 1.2rem;
      border-radius: 50%;
      padding: 0.3em;
      margin-right: 0.3em;
    }

    &:nth-child(1) .icon { background: #e0f2fe; color: #0284c7; }
    &:nth-child(2) .icon { background: #fff7e6; color: #f59e0b; }
    &:nth-child(3) .icon { background: #e6fbe6; color: #22c55e; }
    &:nth-child(4) .icon { background: #f3e8ff; color: #a855f7; }
  }

  @media (max-width: 600px) {
    justify-content: center;

    li {
      flex: 1 1 100%;
      justify-content: center;
    }
  }
`,q=b.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  button {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.7em 1.5em;
    border-radius: 0.5em;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  .ios {
    background: #0284c7;
    color: #fff;
    &:hover { background: #026aa1; }
  }

  .android {
    background: #fff;
    color: #222;
    border: 1px solid #e5e7eb;
    &:hover { background: #f3f4f6; }
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;b.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  .star {
    color: #fbbf24;
    font-size: 1.2rem;
    margin-right: 0.3em;
  }
  .rating {
    font-weight: 600;
    margin-right: 1em;
  }
  .downloads {
    color: #6b7280;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;var J=b.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Required for absolute icons */
`,Y=b.div`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 1.2rem;
  border: 5px solid #0f0f0fff; /* Colored border for professional look */
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  position: relative;

  @media (max-width: 1024px) {
    max-width: 280px;
    max-height: 350px;
    object-fit: contain;
  }
  @media (max-width: 600px) {
    max-width: 200px;
    max-height: 300px;
    object-fit: contain;
    border-width: 2px;
    border-radius: 1rem;
  }

  .icon-top-right, .icon-bottom-left {
    position: absolute;
    background: #0284c7;
    color: white;
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 1.2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-top-right {
    top: 10px;
    right: 10px;
  }

  .icon-bottom-left {
    bottom: 10px;
    left: 10px;
    background: #fbbf24; /* Yellow star */
    color: white;
  }
`,X=b.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;function Z(){return(0,N.jsx)(W,{children:(0,N.jsxs)(te,{children:[(0,N.jsxs)(G,{children:[(0,N.jsxs)(`div`,{className:`badge f-bold fs-3 d-flex align-items-center gap-2 justify-content-center text-dark`,children:[`  `,(0,N.jsx)(t,{className:`text-dark`}),`Mobile App Available`]}),(0,N.jsxs)(`h2`,{children:[`Take Kidvik `,(0,N.jsx)(`span`,{className:`blue`,children:`On The Go`})]}),(0,N.jsx)(`p`,{children:`Access all of Kidvik’s features right from your smartphone. Find services, read reviews, book appointments, and stay connected anywhere.`}),(0,N.jsxs)(K,{children:[(0,N.jsxs)(`li`,{children:[(0,N.jsx)(`span`,{className:`icon`,children:(0,N.jsx)(t,{})}),`Location-based service discovery`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(`span`,{className:`icon`,children:(0,N.jsx)(C,{})}),`Instant notifications and updates`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(`span`,{className:`icon`,children:(0,N.jsx)(s,{})}),`Secure and verified providers`]}),(0,N.jsxs)(`li`,{children:[(0,N.jsx)(`span`,{className:`icon`,children:(0,N.jsx)(c,{})}),`Rate and review services`]})]}),(0,N.jsxs)(q,{children:[(0,N.jsxs)(`a`,{href:`#`,className:`d-flex align-items-center text-decoration-none justify-content-start p-2`,style:{color:`#000`,background:`#fff`,borderRadius:8,transition:`transform .2s ease`},onMouseEnter:e=>e.currentTarget.style.transform=`translateY(-3px)`,onMouseLeave:e=>e.currentTarget.style.transform=`translateY(0)`,children:[(0,N.jsx)(ee,{size:28,className:`me-2`}),(0,N.jsxs)(`div`,{style:{lineHeight:1},children:[(0,N.jsx)(`div`,{style:{fontSize:11},children:`Download on the`}),(0,N.jsx)(`div`,{style:{fontSize:17,fontWeight:`600`},children:`App Store`})]})]}),(0,N.jsxs)(`a`,{href:`#`,className:`d-flex align-items-center text-decoration-none justify-content-start p-2`,style:{color:`#000`,background:`#fff`,borderRadius:8,transition:`transform .2s ease`},onMouseEnter:e=>e.currentTarget.style.transform=`translateY(-3px)`,onMouseLeave:e=>e.currentTarget.style.transform=`translateY(0)`,children:[(0,N.jsx)(`img`,{src:`/img/logo/playstoreimg-removebg-preview.png`,alt:`Google Play`,className:`me-2`,style:{width:`28px`,height:`28px`,objectFit:`contain`}}),(0,N.jsxs)(`div`,{style:{lineHeight:1},children:[(0,N.jsx)(`div`,{style:{fontSize:11},children:`GET IT ON`}),(0,N.jsx)(`div`,{style:{fontSize:17,fontWeight:`600`},children:`Google Play`})]})]})]})]}),(0,N.jsx)(J,{children:(0,N.jsxs)(Y,{children:[(0,N.jsx)(X,{src:`/img/kidvik_app_ss/kidvik_app_ss.jpeg`,alt:`Kidvik App Screenshot`}),(0,N.jsx)(`span`,{className:`icon-top-right`,children:(0,N.jsx)(l,{})}),(0,N.jsx)(`span`,{className:`icon-bottom-left`,children:(0,N.jsx)(c,{})})]})})]})})}var Q=Z;p();var ne=()=>{let{partnerAuth:e}=g();return(0,N.jsx)(`div`,{className:`text-center`,children:(0,N.jsxs)(`div`,{className:`p-5 bg-primary-light rounded-3 shadow-lg`,children:[(0,N.jsx)(`h4`,{className:`fw-bold text-primary mb-3`,children:`Ready to Grow Your Business?`}),(0,N.jsx)(`p`,{className:`text-primary mb-4`,children:`Join thousands of trusted service providers who are already connecting with families through Kidvik. It's free to get started!`}),(0,N.jsxs)(`div`,{className:`d-flex flex-column flex-sm-row justify-content-center gap-3`,children:[(0,N.jsx)(r,{to:`${e?.partnerAccess?`park_listing`:`partner-signup`}`,children:(0,N.jsxs)(`button`,{className:`btn btn-primary d-flex align-items-center gap-2`,children:[(0,N.jsx)(m,{className:`me-1`}),` Become a Partner `,(0,N.jsx)(A,{className:`ms-1`})]})}),(0,N.jsx)(`button`,{className:`btn btn-primary`,children:`Learn More`})]})]})})};b.div`

  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    // box-shadow: 1px 8px 12px rgba(0, 0, 0, 0.2);
  }
`;var re=b.div`
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
`;b.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  svg {
    font-size: 2.5rem; 
  }

  ${re}:hover & {
    transform: scale(1.1);
  }
`;var ie=ne;p();var ae=b.section`
  padding: 4rem 1rem;
  // background-color: ${n} ;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`,oe=h`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;b.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${oe} 0.6s ease forwards;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  h5 {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  p {
    font-size: 0.9rem;
    color: #6b7280;
    min-height: 60px;
  }

  .quote {
    margin-top: 1rem;
    font-size: 0.9rem;
    font-style: italic;
    color: #0284c7;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    img {
      width: 80px;
      height: 80px;
    }
  }
`;var se=b.div`
  .quote {
    // margin-top: 1rem;
    font-size: 1rem;
    font-style: italic;
    color: #0284c7;
  }
`,ce=b.section`
  .category-bar .nav-link {
    position: relative;
    color: #333;
    padding-bottom: 6px;
    transition: color 0.2s;
    white-space: nowrap;
    font-weight: 500;
    cursor: pointer;
  }

  .category-bar .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 3px;
    background-color: #42B682;
    transition: width 0.3s ease-in-out;
    cursor: pointer;
  }

  .category-bar .nav-link:hover,
  .category-bar .nav-link.active,
  .category-bar .nav-link:focus {
    color: var(--bs-primary);
  }

  .category-bar .nav-link:hover::after,
  .category-bar .nav-link.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .category-bar {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,0,0,0.25) transparent;
    }

    .category-bar::-webkit-scrollbar {
      height: 6px;
    }

    .category-bar::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.25);
      border-radius: 8px;
    }

    .category-bar .nav {
      flex-wrap: nowrap;
      justify-content: flex-start !important;
      gap: 12px;
      padding: 8px 12px;
    }

    .category-bar .nav-item {
      display: inline-block;
    }

    .category-bar .nav-link {
      font-size: 1rem;
      padding: 8px 12px;
    }
  }
`;function le(){let[e,t]=(0,M.useState)([]),[n,r]=(0,M.useState)(!0),{category:i,loading:a,error:o}=S(),[s,c]=(0,M.useState)(`all`),[l,u]=(0,M.useState)([]);return(0,M.useEffect)(()=>{(async()=>{try{let e=await(await fetch(`${E}/trending_master/`)).json();t(e.data)}catch(e){console.error(`Error fetching trending:`,e)}finally{r(!1)}})()},[]),(0,M.useEffect)(()=>{if(s===`all`)u(e);else{let t=e.filter(e=>String(e.category_id)===String(s));u(t)}},[s,e]),(0,N.jsxs)(ae,{children:[(0,N.jsx)(x,{firstHeading:`Trending`,secondHeading:`on Kidvik`,description:`See what other parents are loving! Explore, compare, and connect with trusted local services for your child.`}),(0,N.jsx)(ce,{children:(0,N.jsxs)(`div`,{className:`container-fluid px-4 category-bar`,children:[o&&(0,N.jsx)(`div`,{className:`alert alert-danger text-center`,role:`alert`,children:`❌ Failed to load categories. Please try again.`}),(0,N.jsx)(`ul`,{className:`nav justify-content-center`,children:a?(0,N.jsx)(`p`,{className:`text-center text-secondary`,children:`Loading categories...`}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`li`,{className:`nav-item fs-5`,children:(0,N.jsx)(`span`,{className:`nav-link ${s===`all`?`active`:``}`,onClick:()=>c(`all`),children:`All`})}),i.map(e=>(0,N.jsx)(`li`,{className:`nav-item fs-5`,children:(0,N.jsx)(`span`,{className:`nav-link ${s===e.id?`active`:``}`,onClick:()=>c(e.id),children:e.name})},e.id))]})})]})}),n?(0,N.jsx)(v,{}):l.length>0?(0,N.jsx)(O,{children:l.map(e=>(0,N.jsx)(`div`,{className:`p-2`,children:(0,N.jsxs)(`div`,{className:`card h-100 shadow-sm small-card`,children:[(0,N.jsx)(`img`,{src:`${E}${e.img}`,className:`card-img-top rounded-top`,alt:e.title,style:{height:`150px`,objectFit:`cover`}}),(0,N.jsxs)(`div`,{className:`card-body d-flex flex-column p-3`,children:[(0,N.jsx)(se,{children:(0,N.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center`,children:[(0,N.jsx)(`h6`,{className:`card-title text-primary fw-bold mb-2 `,style:{fontSize:`1rem`},children:e.title.length>40?e.title.slice(0,40)+`...`:e.title}),e.quote&&(0,N.jsxs)(`div`,{className:`quote`,children:[`"`,e.quote,`"`]})]})}),(0,N.jsx)(`p`,{className:`card-text text-muted mb-2`,style:{fontSize:`1rem`,flexGrow:1},children:e.description.length>100?e.description.slice(0,100)+`...`:e.description})]})]})},e.id))}):(0,N.jsxs)(`p`,{className:`text-muted fw-medium`,style:{height:`250px`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`1.1rem`,backgroundColor:`#c2e4cdd5`,borderRadius:`10px`,marginTop:`1rem`},children:[(0,N.jsx)(`i`,{className:`bi bi-info-circle me-2 text-secondary`}),`No trending data available`]})]})}p();var ue=b.div`
  margin-top: 2rem;
`,de=b.h4`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`,fe=b.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`,pe=b.div`
  background: #ffffff;
  border: 1px solid #4caf5080;
  border-radius: 12px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    border-color: #4caf50;
  }

  img {
    max-width: 80px;
    max-height: 80px;
    margin-bottom: 0.8rem;
    object-fit: contain;
  }

  h6 {
    margin-top: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    word-wrap: break-word;
  }
`;function $({selectedCategory:e,ref:t}){let{subcategories:r,subcatlaoding:i}=_();if(i)return(0,N.jsx)(`p`,{children:`Loading...`});let a={};return r.forEach(e=>{let t=e.category?.name||`Uncategorized`;a[t]||(a[t]=[]),a[t].push(e)}),(0,N.jsx)(`div`,{className:`py-5`,style:{background:n},children:(0,N.jsx)(`div`,{className:`container`,children:Object.keys(a).map((e,t)=>(0,N.jsxs)(ue,{children:[(0,N.jsx)(de,{children:e}),(0,N.jsx)(fe,{children:a[e].map(e=>(0,N.jsx)(u,{to:`/explore`,state:{category_id:e?.category_id,sub_category_id:e?.id},children:(0,N.jsxs)(pe,{children:[(0,N.jsx)(`img`,{src:`${E}${e.icon_img}`,alt:e.name}),(0,N.jsx)(`h6`,{children:e.name})]},e.id)}))})]},t))})})}var me=$;p(),b.div`
  margin-top: 2rem;
`;var he=b.h4`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`,ge=b.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`,_e=b.div`
  background: #ffffff;
  border: 1px solid #4caf5080;
  border-radius: 12px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    border-color: #4caf50;
  }

  img {
    max-width: 80px;
    max-height: 80px;
    margin-bottom: 0.8rem;
    object-fit: contain;
  }

  h6 {
    margin-top: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    word-wrap: break-word;
  }
`;function ve(){let{category:e,loading:t}=S(),r=(0,M.useRef)(null),[i,a]=(0,M.useState)(null),o=e=>{a(e),r.current?.scrollIntoView({behavior:`smooth`,block:`start`})};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`div`,{className:`py-5`,style:{background:n},children:(0,N.jsxs)(`div`,{className:`container`,children:[(0,N.jsx)(he,{children:`Explore Categories`}),(0,N.jsx)(ge,{children:t?(0,N.jsxs)(N.Fragment,{children:[` `,(0,N.jsx)(v,{}),` `]}):e.map(e=>(0,N.jsx)(u,{to:`/explore`,state:{category_id:e.id},children:(0,N.jsxs)(_e,{onClick:()=>o(e.name),children:[(0,N.jsx)(`img`,{src:`${E}${e.icon_img}`,alt:e.name}),(0,N.jsx)(`h6`,{children:e.name})]},e?.id)}))})]})}),(0,N.jsx)(me,{ref:r,selectedCategory:i})]})}var ye=ve;function be(){return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(F,{}),(0,N.jsx)(z,{}),(0,N.jsx)(e,{showCards:!1}),(0,N.jsx)(Q,{}),(0,N.jsx)(ye,{}),(0,N.jsx)(le,{}),(0,N.jsx)(k,{}),(0,N.jsx)(U,{}),(0,N.jsx)(ie,{})]})}var xe=be;export{xe as default};