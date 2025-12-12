import{A as e,L as t,M as n,P as r,R as i,W as a,c as o,d as s,l as c,n as l,o as u,s as d,u as f,z as p}from"./index-A1ioPTrq.js";var m=a(p());o();const h=(e=[],t)=>{if(!Array.isArray(e)||!t)return[`All`];let n=t.split(`.`),r=e.map(e=>{let t=e;for(let e of n)if(t=t?.[e],t==null)return null;return t}).filter(Boolean);return[`All`,...[...new Set(r)]]};var g=a(e()),_=({optionsList:e,selectedValues:t,setSelectedValues:n,updateFilter:r,filterName:i,placeholder:a=`Select...`})=>{let o=e.map(e=>typeof e==`string`?{label:e,value:e}:e),c=e=>{let t=e?e.map(e=>e.value):[];t.includes(`All`)&&t.length>1&&(t=t.filter(e=>e!==`All`)),t.length===0&&(t=[`All`]),n(t),r(i,t)},l=o.filter(e=>t.includes(e.value));return(0,g.jsx)(`div`,{className:`mb-3`,children:(0,g.jsx)(s,{isMulti:!0,options:o,value:l,onChange:c,closeMenuOnSelect:!1,placeholder:a})})},v=d.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
  border: 1px solid #eee;
  position: sticky;
  top: 100px;
  transition: all 0.3s ease;

  /* 🔹 FILTER TITLE BAR */
  .filters-title {
    font-weight: 600;
    font-size: 18px;
    border-bottom: 2px solid #eee;
    padding: 10px 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    i {
      transition: transform 0.3s ease;
    }
  }

  .filters-title.open i {
    transform: rotate(180deg);
  }

  /* 🔹 FILTER BODY ANIMATION */
  .filters-body {
    max-height: 1000px;
    opacity: 1;
    overflow: visible;
    transition: all 0.3s ease;
  }

  .filters-body.closed {
    max-height: 0;
    opacity: 0;
    margin: 0;
    padding: 0;
  }

  .filter-section {
    margin-bottom: 18px;
  }

  .filter-toggle {
    background: transparent;
    border: none;
    font-weight: 600;
    color: #333;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #0d6efd;
    }

    i {
      transition: transform 0.3s ease;
    }

    &.open i {
      transform: rotate(180deg);
    }
  }

  .filter-content {
    margin-top: 4px;
    max-height: 0;
    overflow: visible;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .filter-content.open {
    max-height: 100px;
       opacity: 1;
    // padding-top: 8px;
  }

  /* 📱 MOBILE OPTIMIZATION */
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    box-shadow: none;
    padding: 0; /* remove padding completely */

    .filters-title {
      margin: 5px;
      padding: 6px 8px;
      border-bottom: none;
      font-size: 14px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      i {
        font-size: 16px;
      }
    }

    .filters-body {
      margin-top: 5px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      padding: 12px;
      transition: all 0.3s ease;
    }

    .filters-body.closed {
      max-height: 0;
      opacity: 0;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
  }
`;function y(){let{updateFilter:e,cityname:t,LoadingArea:n,cityId:r,state:i}=f(),[a,o]=(0,m.useState)([`All`]),[s,c]=(0,m.useState)([]),[l,d]=(0,m.useState)([]),[p,y]=(0,m.useState)([]),[b,x]=(0,m.useState)({sidebar:!0,area:!0,subcategory:!0}),[S,C]=(0,m.useState)(window.innerWidth<=768),w=e=>{x(t=>({...t,[e]:!t[e]}))};return(0,m.useEffect)(()=>{let e=()=>C(window.innerWidth<=768);return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,m.useEffect)(()=>{S&&x(e=>({...e,sidebar:!1}))},[S]),(0,m.useEffect)(()=>{if(i.Listing_Data?.length>0){let e=h(i.Listing_Data,`area.Location_name`);d(e);let t=i.Listing_Data.filter(e=>e.category_id===6),n=h(t,`sub_category_detail.name`);y(n)}},[i.Listing_Data]),(0,g.jsx)(`div`,{className:`col-lg-3 col-md-4`,children:(0,g.jsxs)(v,{children:[(0,g.jsxs)(`div`,{className:`filters-title ${b.sidebar?`open`:``}`,onClick:()=>w(`sidebar`),children:[(0,g.jsxs)(`span`,{children:[(0,g.jsx)(`i`,{className:`fas fa-sliders-h text-primary me-2`}),` Filters`]}),(0,g.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,g.jsxs)(`div`,{className:`filters-body ${b.sidebar?`open`:`closed`}`,children:[(0,g.jsxs)(`div`,{className:`filter-section`,children:[(0,g.jsxs)(`button`,{className:`filter-toggle ${b.area?`open`:``}`,onClick:()=>w(`area`),children:[`Area `,t?`in ${t}`:``,(0,g.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,g.jsx)(`div`,{className:`filter-content ${b.area?`open`:``}`,children:n?(0,g.jsxs)(`div`,{className:`w-100 text-center py-3`,children:[(0,g.jsx)(u,{}),(0,g.jsxs)(`p`,{className:`text-muted mt-2 mb-0`,children:[`Loading areas for `,t||`selected city`,`...`]})]}):r?l.length===0?(0,g.jsxs)(`div`,{className:`text-center py-3 text-warning fw-semibold`,children:[`No areas available for `,t,`.`]}):(0,g.jsx)(_,{optionsList:l,selectedValues:a,setSelectedValues:o,updateFilter:e,filterName:`area_id`,placeholder:`Select area(s)`}):(0,g.jsxs)(`div`,{className:`text-center py-3 text-muted`,children:[(0,g.jsx)(`p`,{className:`fw-semibold mb-1`,children:`Please select a city first`}),(0,g.jsx)(`small`,{children:`Choose a city to view nearby listings.`})]})})]}),i.category_id===6&&p?.length>0&&(0,g.jsxs)(`div`,{className:`filter-section`,children:[(0,g.jsxs)(`button`,{className:`filter-toggle ${b.subcategory?`open`:``}`,onClick:()=>w(`subcategory`),children:[`Subcategory Details`,(0,g.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,g.jsx)(`div`,{className:`filter-content ${b.subcategory?`open`:``}`,children:(0,g.jsx)(`div`,{className:`border rounded p-3`,children:(0,g.jsx)(_,{optionsList:p,selectedValues:s,setSelectedValues:c,updateFilter:e,filterName:`sub_category_detail_id`,placeholder:`Select subcategory(s)`})})})]})]})]})})}var b=y;o();function x(){i();let{state:e,cityId:t}=f(),[n,r]=(0,m.useState)([]),[a,o]=(0,m.useState)(!1);return parseFloat(localStorage.getItem(`user_latitude`)),parseFloat(localStorage.getItem(`user_longitude`)),(0,m.useEffect)(()=>{let e=JSON.parse(sessionStorage.getItem(`compareSchools`))||[];r(e)},[]),(0,m.useEffect)(()=>{sessionStorage.setItem(`compareSchools`,JSON.stringify(n))},[n]),e.filtered_Listing.filter(e=>n.includes(e.PartnerMaster_id)),(0,m.useEffect)(()=>{n.length>0&&(r([]),sessionStorage.removeItem(`compareSchools`))},[e.category_id,e.sub_category_id]),(0,g.jsx)(`div`,{className:`flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3`,children:(0,g.jsx)(l,{})})}var S=x;d.section`
 .listings-wrapper {
    background: #f9fafb; /* Light gray section bg */
    border: 1px solid #e5e7eb; /* Subtle gray border */
    border-radius: 12px;
    //  padding: 2rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    //  margin: 1rem 0;
  }
  .school-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 0.5rem;
    justify-items: center;
  }

  /* Responsive Breakpoints */
  @media (max-width: 992px) {
    .school-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    .school-grid {
      grid-template-columns: 1fr;
    }
  }

  .school-card {
    width: 100%;
    max-width: 350px;
    background: #f5f7f2c0;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .school-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .school-image-container {
    width: 100%;
    height: 150px;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .school-image {
    width: 100%;
    height: 100%;
      border-radius: 10px;
    object-fit: contain;
    background: #f9fafb;
  }

.status-badge {
  position: absolute;
  top: 0px;        /* distance from top */
  left: 0px;       /* stick to left edge */
  background-color: #42b682; /* red tone — change as needed */
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 0 6px 6px px ;
  padding: 4px 8px;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

  .school-content {
    padding: 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .school-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    text-transform: capitalize;
  }

  .school-location {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .school-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    font-size: 0.85rem;
    color: #374151;
    margin-top: 0.5rem;
  }

  .school-actions {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

.school-actions {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
}

.icon-btn {
  background: #fff;
  border: 1px solid #8a8b8b93;
  color: #42b682;
  font-size: 0.9rem;
  border-radius: 10px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 36px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.icon-btn:hover {
  background: #42b682;
  color: #fff;
  transform: translateY(-2px);
}

.whatsapp-btn {
  border-color: #25d366;
  color: #25d366;
}

.whatsapp-btn:hover {
  background: #25d366;
  color: #fff;
}

.compare-checkbox {
  cursor: pointer;
  accent-color: #42b682;
  scale: 1.2;
}

`;var C=c`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;d.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  display: ${({open:e})=>e?`block`:`none`};
`,d.div`
  position: fixed;
  bottom: 20px; right: 20px;
  z-index: 10001;

  .compare-box { position: relative; display: inline-block; }

  .compare-btn {
    background: #0056b3;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: bold;
    display: flex; align-items: center; gap: 6px;
  }
  .compare-btn span {
    background: #fff; color: #0056b3;
    font-weight: bold; padding: 2px 6px;
    border-radius: 50%; font-size: 12px;
  }

  .schools-tooltip {
    position: absolute; bottom: 45px; right: 0;
    background: #fff;
    border-radius: 10px;
    padding: 12px;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: ${C} 0.3s ease;
  }
  .schools { display: flex; gap: 12px; overflow-x: auto; }
  .school-card-mini {
    flex: 0 0 auto; width: 140px;
    background: #f8f9fa; border: 1px solid #eee;
    border-radius: 6px;
     padding: 6px; 
     font-size: 12px;
  }
  .img-wrap { position: relative; height: 70px; overflow: hidden; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .remove {
    position: absolute; top: 4px; right: 4px;
    background: red; color: #fff;
    border-radius: 50%; font-size: 12px;
    width: 18px; height: 18px; border: none;
  }
  .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
  .clear { border: none; background: transparent; color: red; cursor: pointer; }
`,o();function w(){let e=t(),[i,a]=(0,m.useState)(null);e.pathname.split(`/`).filter(e=>e);let{state:o,category:s,loading:c,error:l,dispatch:d,subLoading:p}=f(),h=e.state?.category_id||o.category_id,_=e.state?.sub_category_id||o.sub_category_id,v=e.state?.sub_category_Detail_id||o.sub_category_detail_id;return(0,m.useEffect)(()=>{h&&h!==`all`&&(a(h),d({type:`SET_CATEGORY`,payload:h})),_&&_!==`all`&&d({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:_}}),v&&v!==`all`&&d({type:`SET_FILTER`,payload:{name:`sub_category_detail_id`,value:v}})},[h,_,v]),(0,m.useEffect)(()=>{if(!e.state&&s.length>0&&!i){let e=s[0];a(e.id),d({type:`SET_CATEGORY`,payload:e.id})}},[s,e.state]),(0,m.useEffect)(()=>{if(o.sub_category.length>0&&(!o.sub_category_id||o.sub_category_id===`all`)){let e=o.sub_category[0];d({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}})}},[o.sub_category]),(0,m.useEffect)(()=>{o.sub_category.length>0&&_&&_!==`all`&&d({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:_}})},[o.sub_category,_]),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(T,{children:(0,g.jsxs)(`div`,{className:`container-fluid px-4  category-bar`,children:[l&&(0,g.jsx)(`div`,{className:`alert alert-danger text-center`,role:`alert`,children:`❌ Failed to load categories. Please try again.`}),(0,g.jsx)(`ul`,{className:`nav justify-content-center`,children:c?(0,g.jsx)(u,{}):s.map((e,t)=>(0,g.jsx)(`li`,{className:`nav-item fs-4`,children:(0,g.jsx)(r,{className:`nav-link ${i===e.id?`active`:``}`,onClick:()=>{a(e.id),d({type:`SET_CATEGORY`,payload:e.id})},children:e.name})},t))})]})}),(0,g.jsx)(`div`,{className:`container-fluid px-4 mt-1`,children:(0,g.jsxs)(`div`,{className:`row`,children:[(0,g.jsx)(b,{}),(0,g.jsxs)(`div`,{className:`col-lg-9 col-md-8`,children:[(0,g.jsxs)(`div`,{className:`results-header d-flex justify-content-between align-items-center mb-2`,children:[(0,g.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,g.jsxs)(`h4`,{className:`page-title mb-0`,children:[`List of`,` `,o.sub_category_id===`all`?o.category_id===`all`?`Schools`:s.find(e=>e.id===o.category_id)?.name:o.sub_category.find(e=>e.value===o.sub_category_id)?.label||`Category`]}),(0,g.jsx)(E,{children:(0,g.jsx)(`span`,{className:`results-count ms-3`,children:(0,g.jsxs)(`span`,{className:`badge bg-secondary`,children:[o.filtered_Listing.length,` `,o.sub_category_id===`all`?o.category_id===`all`?`Schools`:s.find(e=>e.id===o.category_id)?.name:o.sub_category.find(e=>e.value===o.sub_category_id)?.label||`Schools`,` `,`found`]})})})]}),(0,g.jsx)(`div`,{className:`sort-dropdown`,children:(0,g.jsxs)(`select`,{className:`form-select`,id:`sortBy`,children:[(0,g.jsx)(`option`,{value:`relevance`,children:`Sort By: Relevance`}),(0,g.jsx)(`option`,{value:`name`,children:`Name`}),(0,g.jsx)(`option`,{value:`fee`,children:`Fee`}),(0,g.jsx)(`option`,{value:`rating`,children:`Rating`})]})})]}),(0,g.jsx)(`div`,{className:`school-type-filters mb-4`,children:o.sub_category.map(e=>(0,g.jsxs)(`button`,{className:`btn school-type-btn d-flex align-items-center gap-2 ${o.sub_category_id===e.value?`active`:``}`,onClick:()=>d({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}}),children:[(0,g.jsx)(`i`,{className:`fas fa-check me-1`}),e.img&&(0,g.jsx)(`img`,{src:`${n}${e.img}`,alt:e.label,style:{height:`24px`,width:`24px`,objectFit:`contain`}}),(0,g.jsx)(`span`,{children:e.label})]},e.value))}),(0,g.jsx)(S,{showcard:!1})]})]})})]})}var T=d.section`
.category-bar .nav-link {
  position: relative;
  color: #333;
  padding-bottom: 6px;
  transition: color 0.2s;
  white-space: nowrap; 
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
}

.category-bar .nav-link:hover {
  color: var(--bs-primary);
}

.category-bar .nav-link:hover::after {
  width: 100%;
}

.category-bar .nav-link.active {
  color: var(--bs-primary);
}

.category-bar .nav-link.active::after {
  width: 100%;
}

/* ✅ Mobile responsive scrollable category bar */
@media (max-width: 768px) {
  .category-bar {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
     scrollbar-width: none;
  }

  .category-bar::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Safari */
  }

  .category-bar .nav {
    flex-wrap: nowrap;
    justify-content: flex-start !important;
    gap: 12px;
  }

  .category-bar .nav-item {
    display: inline-block;
  }

  .category-bar .nav-link {
    font-size: 1rem;
    padding: 8px 12px;
  }
}
`,E=d.div`
.results-count .badge {
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.875rem;
}

`,D=w;export{D as default};