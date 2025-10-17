import{C as e,D as t,F as n,G as r,H as i,K as a,L as o,O as s,P as c,R as l,T as u,V as d,W as f,Z as p,c as m,d as h,g,j as _,k as v,l as y,o as b,r as x,s as S,u as C,z as w}from"./index-BwT3Dd-R.js";var T=p(a());m();const E=(e=[],t)=>{if(!Array.isArray(e)||!t)return[`All`];let n=t.split(`.`),r=e.map(e=>{let t=e;for(let e of n)if(t=t?.[e],t==null)return null;return t}).filter(Boolean);return[`All`,...[...new Set(r)]]};var D=p(o()),O=({optionsList:e,selectedValues:t,setSelectedValues:n,updateFilter:r,filterName:i,placeholder:a=`Select...`})=>{let o=e.map(e=>typeof e==`string`?{label:e,value:e}:e),s=e=>{let t=e?e.map(e=>e.value):[];t.includes(`All`)&&t.length>1&&(t=t.filter(e=>e!==`All`)),t.length===0&&(t=[`All`]),n(t),r(i,t)},c=o.filter(e=>t.includes(e.value));return(0,D.jsx)(`div`,{className:`mb-3`,children:(0,D.jsx)(h,{isMulti:!0,options:o,value:c,onChange:s,closeMenuOnSelect:!1,placeholder:a})})},k=S.div`
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
`;function A(){let{updateFilter:e,cityname:t,LoadingArea:n,cityId:r,state:i}=C(),[a,o]=(0,T.useState)([`All`]),[s,c]=(0,T.useState)([]),[l,u]=(0,T.useState)([]),[d,f]=(0,T.useState)([]),[p,m]=(0,T.useState)({sidebar:!0,area:!0,subcategory:!0}),[h,g]=(0,T.useState)(window.innerWidth<=768),_=e=>{m(t=>({...t,[e]:!t[e]}))};return(0,T.useEffect)(()=>{let e=()=>g(window.innerWidth<=768);return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,T.useEffect)(()=>{h&&m(e=>({...e,sidebar:!1}))},[h]),(0,T.useEffect)(()=>{if(i.Listing_Data?.length>0){let e=E(i.Listing_Data,`area.Location_name`);u(e);let t=i.Listing_Data.filter(e=>e.category_id===6),n=E(t,`sub_category_detail.name`);f(n)}},[i.Listing_Data]),(0,D.jsx)(`div`,{className:`col-lg-3 col-md-4`,children:(0,D.jsxs)(k,{children:[(0,D.jsxs)(`div`,{className:`filters-title ${p.sidebar?`open`:``}`,onClick:()=>_(`sidebar`),children:[(0,D.jsxs)(`span`,{children:[(0,D.jsx)(`i`,{className:`fas fa-sliders-h text-primary me-2`}),` Filters`]}),(0,D.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,D.jsxs)(`div`,{className:`filters-body ${p.sidebar?`open`:`closed`}`,children:[(0,D.jsxs)(`div`,{className:`filter-section`,children:[(0,D.jsxs)(`button`,{className:`filter-toggle ${p.area?`open`:``}`,onClick:()=>_(`area`),children:[`Area `,t?`in ${t}`:``,(0,D.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,D.jsx)(`div`,{className:`filter-content ${p.area?`open`:``}`,children:n?(0,D.jsxs)(`div`,{className:`w-100 text-center py-3`,children:[(0,D.jsx)(b,{}),(0,D.jsxs)(`p`,{className:`text-muted mt-2 mb-0`,children:[`Loading areas for `,t||`selected city`,`...`]})]}):r?l.length===0?(0,D.jsxs)(`div`,{className:`text-center py-3 text-warning fw-semibold`,children:[`No areas available for `,t,`.`]}):(0,D.jsx)(O,{optionsList:l,selectedValues:a,setSelectedValues:o,updateFilter:e,filterName:`area_id`,placeholder:`Select area(s)`}):(0,D.jsxs)(`div`,{className:`text-center py-3 text-muted`,children:[(0,D.jsx)(`p`,{className:`fw-semibold mb-1`,children:`Please select a city first`}),(0,D.jsx)(`small`,{children:`Choose a city to view nearby listings.`})]})})]}),i.category_id===6&&d?.length>0&&(0,D.jsxs)(`div`,{className:`filter-section`,children:[(0,D.jsxs)(`button`,{className:`filter-toggle ${p.subcategory?`open`:``}`,onClick:()=>_(`subcategory`),children:[`Subcategory Details`,(0,D.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,D.jsx)(`div`,{className:`filter-content ${p.subcategory?`open`:``}`,children:(0,D.jsx)(`div`,{className:`border rounded p-3`,children:(0,D.jsx)(O,{optionsList:d,selectedValues:s,setSelectedValues:c,updateFilter:e,filterName:`sub_category_detail_id`,placeholder:`Select subcategory(s)`})})})]})]})]})})}var j=A;m();function M(){r();let{state:a,cityId:o}=C(),[f,p]=(0,T.useState)([]),[m,h]=(0,T.useState)(!1),y=parseFloat(localStorage.getItem(`user_latitude`)),S=parseFloat(localStorage.getItem(`user_longitude`));(0,T.useEffect)(()=>{let e=JSON.parse(sessionStorage.getItem(`compareSchools`))||[];p(e)},[]),(0,T.useEffect)(()=>{sessionStorage.setItem(`compareSchools`,JSON.stringify(f))},[f]);let E=async e=>{p(t=>{let n;if(t.includes(e))n=t.filter(t=>t!==e),g(`user`,`Remove from Compare`,`Explore Page`,e).catch(e=>console.error(`Error logging remove compare action:`,e));else{if(t.length>=3)return l(`You can only compare up to 3 listings`,`error`),t;n=[...t,e],g(`user`,`Add to Compare`,`Explore Page`,e).catch(e=>console.error(`Error logging add compare action:`,e))}return n})},O=e=>{p(t=>t.filter(t=>t!==e))},k=()=>{p([])},A=a.filtered_Listing.filter(e=>f.includes(e.PartnerMaster_id));(0,T.useEffect)(()=>{f.length>0&&(p([]),sessionStorage.removeItem(`compareSchools`))},[a.category_id,a.sub_category_id]);let j=e=>{let t=String(e).trim();return/^[6-9]\d{9}$/.test(t)};return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(P,{children:(0,D.jsx)(`div`,{className:`listings-wrapper`,children:(0,D.jsx)(`div`,{className:`school-grid min-h-[14rem] grid grid-cols-1 md:grid-cols-3 gap-4`,children:o?a.isLoading?(0,D.jsx)(`div`,{className:`flex items-center justify-center h-64 col-span-3`,children:(0,D.jsx)(b,{})}):a.filtered_Listing.length===0?(0,D.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3`,children:[(0,D.jsx)(`h2`,{className:`text-xl font-semibold text-gray-800 mb-2`,children:`No listings found`}),(0,D.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Try changing your filters or selecting another city.`})]}):a.filtered_Listing.map(r=>{let a=r?.Latitude&&r?.longitute&&y&&S?x(y,S,r.Latitude,r.longitute):null;return(0,D.jsxs)(`div`,{className:`school-card`,children:[(0,D.jsxs)(`div`,{className:`school-image-container`,children:[(0,D.jsx)(`img`,{src:r?.logo?`${w}${r.logo}`:`/img/logo/Kidvik_Final_logo01.jpg.png`,alt:r.listing_name,className:`school-image`}),(0,D.jsx)(`span`,{className:`status-badge d-flex align-items-center gap-1 px-2 py-1 rounded`,children:r?.subscription_type?.SubscriptionType_name})]}),(0,D.jsxs)(`div`,{className:`school-content`,children:[(0,D.jsxs)(i,{to:`/partner/${r.slug}`,onClick:e=>handleClick(e,r),children:[(0,D.jsx)(`h5`,{className:`school-name`,children:r.listing_name}),(0,D.jsxs)(`p`,{className:`school-location d-flex align-items-center gap-1 m-0`,children:[(0,D.jsx)(t,{className:`text-danger`,title:`home`}),r?.area?.Location_name||`Unknown Area`,`,`,` `,r?.city?.City_name||`Unknown City`]})]}),(0,D.jsx)(`p`,{className:`school-distance d-flex align-items-center gap-1 m-0`,children:a?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(s,{className:`text-black`,size:20}),` `,a,` km away`]}):`Distance not available`}),(0,D.jsxs)(`div`,{children:[`Type:`,(0,D.jsxs)(`strong`,{children:[` `,r?.sub_category?.name]})]}),(0,D.jsxs)(`div`,{className:`d-flex align-items-center  justify-content-between`,children:[(0,D.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,D.jsxs)(`button`,{className:` btn-sm btn-success d-flex align-items-center gap-2`,children:[(0,D.jsx)(c,{}),` `,r?.average_rating||`0.0`]}),(0,D.jsxs)(`span`,{className:`ms-1`,children:[r?.total_reviews||0,` reviews`]})]}),(0,D.jsx)(i,{to:`/partner/${r.slug}`,onClick:e=>handleClick(e,r),children:(0,D.jsx)(e,{size:20,color:`#42b682`,title:`View Details`})})]}),(0,D.jsxs)(`div`,{className:`school-actions d-flex flex-wrap align-items-center gap-1`,children:[(0,D.jsxs)(`label`,{className:`d-flex align-items-center gap-2`,children:[(0,D.jsx)(`input`,{type:`checkbox`,className:`compare-checkbox mt-lg-2 mt-md-2`,checked:f.includes(r.PartnerMaster_id),onChange:()=>E(r.PartnerMaster_id)}),`Compare`]}),r.geo_location&&(0,D.jsx)(i,{to:r.geo_location,onClick:e=>handleClick(e,r),target:`_blank`,children:(0,D.jsx)(`button`,{className:`icon-btn`,title:`View on Map`,children:(0,D.jsx)(v,{size:20})})}),r.website&&(0,D.jsx)(`a`,{href:r.website,target:`_blank`,rel:`noopener noreferrer`,children:(0,D.jsx)(`button`,{className:`icon-btn`,title:`Visit Website`,children:(0,D.jsx)(u,{size:20})})}),r.list_mobno&&(0,D.jsx)(`a`,{href:`tel:${r.list_mobno}`,children:(0,D.jsx)(`button`,{className:`icon-btn`,title:`Call Now`,children:(0,D.jsx)(_,{size:20})})}),j(r.whats_up)&&(0,D.jsx)(`a`,{href:`https://wa.me/91${r.whats_up}`,target:`_blank`,rel:`noopener noreferrer`,children:(0,D.jsx)(`button`,{className:`icon-btn `,title:`Chat on WhatsApp`,children:(0,D.jsx)(n,{size:20})})})]})]})]},r.PartnerMaster_id)}):(0,D.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3`,children:[(0,D.jsx)(`h2`,{className:`text-xl font-semibold text-gray-800 mb-2`,children:`Please select a city first`}),(0,D.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Choose a city to view listings near you.`})]})})})}),A.length>0&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(I,{open:m,onMouseLeave:()=>h(!1)}),(0,D.jsx)(L,{children:(0,D.jsxs)(`div`,{className:`compare-box`,onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1),children:[(0,D.jsx)(d,{to:`/compare/?ids=${A.map(e=>e.PartnerMaster_id).join(`,`)}`,children:(0,D.jsxs)(`button`,{className:`compare-btn`,children:[`COMPARE `,(0,D.jsxs)(`span`,{children:[` `,A.length]})]})}),m&&(0,D.jsxs)(`div`,{className:`schools-tooltip`,children:[(0,D.jsx)(`div`,{className:`schools`,children:A.map(e=>(0,D.jsxs)(`div`,{className:`school-card-mini`,children:[(0,D.jsxs)(`div`,{className:`img-wrap`,children:[(0,D.jsx)(`img`,{src:e?.logo?`${w}${e.logo}`:`/img/logo/Kidvik_Final_logo01.jpg.png`,alt:e.listing_name}),(0,D.jsx)(`button`,{className:`remove`,onClick:()=>O(e.PartnerMaster_id),children:`✕`})]}),(0,D.jsx)(`p`,{className:`name`,children:e.listing_name}),(0,D.jsxs)(`p`,{className:`location`,children:[e?.area?.Location_name||`Unknown Area`,`,`,` `,e?.city?.City_name||`Unknown City`]})]},e.PartnerMaster_id))}),(0,D.jsx)(`div`,{className:`actions`,children:(0,D.jsx)(`button`,{className:`clear`,onClick:k,children:`Clear All`})})]})]})})]})]})}var N=M,P=S.section`
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

`,F=y`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`,I=S.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  display: ${({open:e})=>e?`block`:`none`};
`,L=S.div`
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
    animation: ${F} 0.3s ease;
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
`;m();function R(){let e=f(),[t,n]=(0,T.useState)(null);e.pathname.split(`/`).filter(e=>e);let{state:r,category:i,loading:a,error:o,dispatch:s,subLoading:c}=C(),l=e.state?.category_id||r.category_id,u=e.state?.sub_category_id||r.sub_category_id,p=e.state?.sub_category_Detail_id||r.sub_category_detail_id;return(0,T.useEffect)(()=>{l&&l!==`all`&&(n(l),s({type:`SET_CATEGORY`,payload:l})),u&&u!==`all`&&s({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:u}}),p&&p!==`all`&&s({type:`SET_FILTER`,payload:{name:`sub_category_detail_id`,value:p}})},[l,u,p]),(0,T.useEffect)(()=>{if(!e.state&&i.length>0&&!t){let e=i[0];n(e.id),s({type:`SET_CATEGORY`,payload:e.id})}},[i,e.state]),(0,T.useEffect)(()=>{if(r.sub_category.length>0&&(!r.sub_category_id||r.sub_category_id===`all`)){let e=r.sub_category[0];s({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}})}},[r.sub_category]),(0,T.useEffect)(()=>{r.sub_category.length>0&&u&&u!==`all`&&s({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:u}})},[r.sub_category,u]),(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(z,{children:(0,D.jsxs)(`div`,{className:`container-fluid px-4  category-bar`,children:[o&&(0,D.jsx)(`div`,{className:`alert alert-danger text-center`,role:`alert`,children:`❌ Failed to load categories. Please try again.`}),(0,D.jsx)(`ul`,{className:`nav justify-content-center`,children:a?(0,D.jsx)(b,{}):i.map((e,r)=>(0,D.jsx)(`li`,{className:`nav-item fs-4`,children:(0,D.jsx)(d,{className:`nav-link ${t===e.id?`active`:``}`,onClick:()=>{n(e.id),s({type:`SET_CATEGORY`,payload:e.id})},children:e.name})},r))})]})}),(0,D.jsx)(`div`,{className:`container-fluid px-4 mt-1`,children:(0,D.jsxs)(`div`,{className:`row`,children:[(0,D.jsx)(j,{}),(0,D.jsxs)(`div`,{className:`col-lg-9 col-md-8`,children:[(0,D.jsxs)(`div`,{className:`results-header d-flex justify-content-between align-items-center mb-2`,children:[(0,D.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,D.jsxs)(`h4`,{className:`page-title mb-0`,children:[`List of`,` `,r.sub_category_id===`all`?r.category_id===`all`?`Schools`:i.find(e=>e.id===r.category_id)?.name:r.sub_category.find(e=>e.value===r.sub_category_id)?.label||`Category`]}),(0,D.jsx)(B,{children:(0,D.jsx)(`span`,{className:`results-count ms-3`,children:(0,D.jsxs)(`span`,{className:`badge bg-secondary`,children:[r.filtered_Listing.length,` `,r.sub_category_id===`all`?r.category_id===`all`?`Schools`:i.find(e=>e.id===r.category_id)?.name:r.sub_category.find(e=>e.value===r.sub_category_id)?.label||`Schools`,` `,`found`]})})})]}),(0,D.jsx)(`div`,{className:`sort-dropdown`,children:(0,D.jsxs)(`select`,{className:`form-select`,id:`sortBy`,children:[(0,D.jsx)(`option`,{value:`relevance`,children:`Sort By: Relevance`}),(0,D.jsx)(`option`,{value:`name`,children:`Name`}),(0,D.jsx)(`option`,{value:`fee`,children:`Fee`}),(0,D.jsx)(`option`,{value:`rating`,children:`Rating`})]})})]}),(0,D.jsx)(`div`,{className:`school-type-filters mb-4`,children:r.sub_category.map(e=>(0,D.jsxs)(`button`,{className:`btn school-type-btn d-flex align-items-center gap-2 ${r.sub_category_id===e.value?`active`:``}`,onClick:()=>s({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}}),children:[(0,D.jsx)(`i`,{className:`fas fa-check me-1`}),e.img&&(0,D.jsx)(`img`,{src:`${w}${e.img}`,alt:e.label,style:{height:`24px`,width:`24px`,objectFit:`contain`}}),(0,D.jsx)(`span`,{children:e.label})]},e.value))}),(0,D.jsx)(N,{showcard:!1})]})]})})]})}var z=S.section`
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
`,B=S.div`
.results-count .badge {
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.875rem;
}

`,V=R;export{V as default};