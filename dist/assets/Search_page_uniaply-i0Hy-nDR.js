import{B as e,D as t,E as n,F as r,H as i,I as a,L as o,M as s,N as c,S as l,U as u,W as d,Y as f,a as p,c as m,h,k as g,l as _,o as v,s as y,u as b,w as x,z as S}from"./index-jgXFUliQ.js";var C=f(d());y();const w=(e=[],t)=>{if(!Array.isArray(e)||!t)return[`All`];let n=t.split(`.`),r=e.map(e=>{let t=e;for(let e of n)if(t=t?.[e],t==null)return null;return t}).filter(Boolean);return[`All`,...[...new Set(r)]]};var T=f(r()),E=({optionsList:e,selectedValues:t,setSelectedValues:n,updateFilter:r,filterName:i,placeholder:a=`Select...`})=>{let o=e.map(e=>typeof e==`string`?{label:e,value:e}:e),s=e=>{let t=e?e.map(e=>e.value):[];t.includes(`All`)&&t.length>1&&(t=t.filter(e=>e!==`All`)),t.length===0&&(t=[`All`]),n(t),r(i,t)},c=o.filter(e=>t.includes(e.value));return(0,T.jsx)(`div`,{className:`mb-3`,children:(0,T.jsx)(b,{isMulti:!0,options:o,value:c,onChange:s,closeMenuOnSelect:!1,placeholder:a})})},D=v.div`
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
`;function O(){let{updateFilter:e,cityname:t,LoadingArea:n,cityId:r,state:i}=_(),[a,o]=(0,C.useState)([`All`]),[s,c]=(0,C.useState)([]),[l,u]=(0,C.useState)([]),[d,f]=(0,C.useState)([]),[m,h]=(0,C.useState)({sidebar:!0,area:!0,subcategory:!0}),[g,v]=(0,C.useState)(window.innerWidth<=768),y=e=>{h(t=>({...t,[e]:!t[e]}))};return(0,C.useEffect)(()=>{let e=()=>v(window.innerWidth<=768);return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,C.useEffect)(()=>{g&&h(e=>({...e,sidebar:!1}))},[g]),(0,C.useEffect)(()=>{if(i.Listing_Data?.length>0){let e=w(i.Listing_Data,`area.Location_name`);u(e);let t=i.Listing_Data.filter(e=>e.category_id===6),n=w(t,`sub_category_detail.name`);f(n)}},[i.Listing_Data]),(0,T.jsx)(`div`,{className:`col-lg-3 col-md-4`,children:(0,T.jsxs)(D,{children:[(0,T.jsxs)(`div`,{className:`filters-title ${m.sidebar?`open`:``}`,onClick:()=>y(`sidebar`),children:[(0,T.jsxs)(`span`,{children:[(0,T.jsx)(`i`,{className:`fas fa-sliders-h text-primary me-2`}),` Filters`]}),(0,T.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,T.jsxs)(`div`,{className:`filters-body ${m.sidebar?`open`:`closed`}`,children:[(0,T.jsxs)(`div`,{className:`filter-section`,children:[(0,T.jsxs)(`button`,{className:`filter-toggle ${m.area?`open`:``}`,onClick:()=>y(`area`),children:[`Area `,t?`in ${t}`:``,(0,T.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,T.jsx)(`div`,{className:`filter-content ${m.area?`open`:``}`,children:n?(0,T.jsxs)(`div`,{className:`w-100 text-center py-3`,children:[(0,T.jsx)(p,{}),(0,T.jsxs)(`p`,{className:`text-muted mt-2 mb-0`,children:[`Loading areas for `,t||`selected city`,`...`]})]}):r?l.length===0?(0,T.jsxs)(`div`,{className:`text-center py-3 text-warning fw-semibold`,children:[`No areas available for `,t,`.`]}):(0,T.jsx)(E,{optionsList:l,selectedValues:a,setSelectedValues:o,updateFilter:e,filterName:`area_id`,placeholder:`Select area(s)`}):(0,T.jsxs)(`div`,{className:`text-center py-3 text-muted`,children:[(0,T.jsx)(`p`,{className:`fw-semibold mb-1`,children:`Please select a city first`}),(0,T.jsx)(`small`,{children:`Choose a city to view nearby listings.`})]})})]}),i.category_id===6&&d?.length>0&&(0,T.jsxs)(`div`,{className:`filter-section`,children:[(0,T.jsxs)(`button`,{className:`filter-toggle ${m.subcategory?`open`:``}`,onClick:()=>y(`subcategory`),children:[`Subcategory Details`,(0,T.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,T.jsx)(`div`,{className:`filter-content ${m.subcategory?`open`:``}`,children:(0,T.jsx)(`div`,{className:`border rounded p-3`,children:(0,T.jsx)(E,{optionsList:d,selectedValues:s,setSelectedValues:c,updateFilter:e,filterName:`sub_category_detail_id`,placeholder:`Select subcategory(s)`})})})]})]})]})})}var k=O;const A=(e,t,n,r)=>{if(!e||!t||!n||!r)return null;let i=e=>e*Math.PI/180,a=i(n-e),o=i(r-t),s=Math.sin(a/2)*Math.sin(a/2)+Math.cos(i(e))*Math.cos(i(n))*Math.sin(o/2)*Math.sin(o/2);return(6371*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)))).toFixed(2)};y();function j(){u();let{state:r,cityId:i}=_(),[d,f]=(0,C.useState)([]),[m,v]=(0,C.useState)(!1),y=parseFloat(localStorage.getItem(`user_latitude`)),b=parseFloat(localStorage.getItem(`user_longitude`));(0,C.useEffect)(()=>{let e=JSON.parse(sessionStorage.getItem(`compareSchools`))||[];f(e)},[]),(0,C.useEffect)(()=>{sessionStorage.setItem(`compareSchools`,JSON.stringify(d))},[d]);let w=async e=>{f(t=>{let n;if(t.includes(e))n=t.filter(t=>t!==e),h(`user`,`Remove from Compare`,`Explore Page`,e).catch(e=>console.error(`Error logging remove compare action:`,e));else{if(t.length>=3)return a(`You can only compare up to 3 listings`,`error`),t;n=[...t,e],h(`user`,`Add to Compare`,`Explore Page`,e).catch(e=>console.error(`Error logging add compare action:`,e))}return n})},E=e=>{f(t=>t.filter(t=>t!==e))},D=()=>{f([])},O=r.filtered_Listing.filter(e=>d.includes(e.PartnerMaster_id));(0,C.useEffect)(()=>{d.length>0&&(f([]),sessionStorage.removeItem(`compareSchools`))},[r.category_id,r.sub_category_id]);let k=e=>{let t=String(e).trim();return/^[6-9]\d{9}$/.test(t)};return console.log(`state.filtered_Listing`,r.filtered_Listing),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(N,{children:(0,T.jsx)(`div`,{className:`listings-wrapper`,children:(0,T.jsx)(`div`,{className:`school-grid min-h-[14rem] grid grid-cols-1 md:grid-cols-3 gap-4`,children:i?r.isLoading?(0,T.jsx)(`div`,{className:`flex items-center justify-center h-64 col-span-3`,children:(0,T.jsx)(p,{})}):r.filtered_Listing.length===0?(0,T.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3`,children:[(0,T.jsx)(`h2`,{className:`text-xl font-semibold text-gray-800 mb-2`,children:`No listings found`}),(0,T.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Try changing your filters or selecting another city.`})]}):r.filtered_Listing.map(r=>{let i=r?.Latitude&&r?.longitute&&y&&b?A(y,b,r.Latitude,r.longitute):null;return(0,T.jsxs)(`div`,{className:`school-card`,children:[(0,T.jsxs)(`div`,{className:`school-image-container`,children:[(0,T.jsx)(`img`,{src:r?.logo?`${o}${r.logo}`:`/img/logo/Kidvik_Final_logo01.jpg.png`,alt:r.listing_name,className:`school-image`}),(0,T.jsx)(`span`,{className:`status-badge d-flex align-items-center gap-1 px-2 py-1 rounded`,children:r?.subscription_type?.SubscriptionType_name})]}),(0,T.jsxs)(`div`,{className:`school-content`,children:[(0,T.jsxs)(e,{to:`/partner/${r.slug}`,onClick:e=>handleClick(e,r),children:[(0,T.jsx)(`h5`,{className:`school-name`,children:r.listing_name}),(0,T.jsxs)(`p`,{className:`school-location d-flex align-items-center gap-1 m-0`,children:[(0,T.jsx)(n,{className:`text-danger`,title:`home`}),r?.area?.Location_name||`Unknown Area`,`,`,` `,r?.city?.City_name||`Unknown City`]})]}),(0,T.jsx)(`p`,{className:`school-distance d-flex align-items-center gap-1 m-0`,children:i?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(t,{className:`text-danger`}),` `,i,` km away`]}):`Distance not available`}),(0,T.jsxs)(`div`,{children:[`Type:`,(0,T.jsxs)(`strong`,{children:[` `,r?.sub_category?.name]})]}),(0,T.jsxs)(`div`,{className:`d-flex align-items-center  justify-content-between`,children:[(0,T.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,T.jsxs)(`button`,{className:` btn-sm btn-success d-flex align-items-center gap-2`,children:[(0,T.jsx)(s,{}),` `,r?.average_rating||`0.0`]}),(0,T.jsxs)(`span`,{className:`ms-1`,children:[r?.total_reviews||0,` reviews`]})]}),(0,T.jsx)(e,{to:`/partner/${r.slug}`,onClick:e=>handleClick(e,r),children:(0,T.jsx)(l,{size:20,color:`#42b682`,title:`View Details`})})]}),(0,T.jsxs)(`div`,{className:`school-actions d-flex flex-wrap align-items-center gap-1`,children:[(0,T.jsxs)(`label`,{className:`d-flex align-items-center gap-2`,children:[(0,T.jsx)(`input`,{type:`checkbox`,className:`compare-checkbox mt-lg-2 mt-md-2`,checked:d.includes(r.PartnerMaster_id),onChange:()=>w(r.PartnerMaster_id)}),`Compare`]}),r.geo_location&&(0,T.jsx)(e,{to:r.geo_location,onClick:e=>handleClick(e,r),target:`_blank`,children:(0,T.jsx)(`button`,{className:`icon-btn`,title:`View on Map`,children:(0,T.jsx)(t,{size:20})})}),r.website&&(0,T.jsx)(`a`,{href:r.website,target:`_blank`,rel:`noopener noreferrer`,children:(0,T.jsx)(`button`,{className:`icon-btn`,title:`Visit Website`,children:(0,T.jsx)(x,{size:20})})}),r.list_mobno&&(0,T.jsx)(`a`,{href:`tel:${r.list_mobno}`,children:(0,T.jsx)(`button`,{className:`icon-btn`,title:`Call Now`,children:(0,T.jsx)(g,{size:20})})}),k(r.whats_up)&&(0,T.jsx)(`a`,{href:`https://wa.me/91${r.whats_up}`,target:`_blank`,rel:`noopener noreferrer`,children:(0,T.jsx)(`button`,{className:`icon-btn `,title:`Chat on WhatsApp`,children:(0,T.jsx)(c,{size:20})})})]})]})]},r.PartnerMaster_id)}):(0,T.jsxs)(`div`,{className:`flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3`,children:[(0,T.jsx)(`h2`,{className:`text-xl font-semibold text-gray-800 mb-2`,children:`Please select a city first`}),(0,T.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Choose a city to view listings near you.`})]})})})}),O.length>0&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(F,{open:m,onMouseLeave:()=>v(!1)}),(0,T.jsx)(I,{children:(0,T.jsxs)(`div`,{className:`compare-box`,onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),children:[(0,T.jsx)(S,{to:`/compare/?ids=${O.map(e=>e.PartnerMaster_id).join(`,`)}`,children:(0,T.jsxs)(`button`,{className:`compare-btn`,children:[`COMPARE `,(0,T.jsxs)(`span`,{children:[` `,O.length]})]})}),m&&(0,T.jsxs)(`div`,{className:`schools-tooltip`,children:[(0,T.jsx)(`div`,{className:`schools`,children:O.map(e=>(0,T.jsxs)(`div`,{className:`school-card-mini`,children:[(0,T.jsxs)(`div`,{className:`img-wrap`,children:[(0,T.jsx)(`img`,{src:e?.logo?`${o}${e.logo}`:`/img/logo/Kidvik_Final_logo01.jpg.png`,alt:e.listing_name}),(0,T.jsx)(`button`,{className:`remove`,onClick:()=>E(e.PartnerMaster_id),children:`✕`})]}),(0,T.jsx)(`p`,{className:`name`,children:e.listing_name}),(0,T.jsxs)(`p`,{className:`location`,children:[e?.area?.Location_name||`Unknown Area`,`,`,` `,e?.city?.City_name||`Unknown City`]})]},e.PartnerMaster_id))}),(0,T.jsx)(`div`,{className:`actions`,children:(0,T.jsx)(`button`,{className:`clear`,onClick:D,children:`Clear All`})})]})]})})]})]})}var M=j,N=v.section`
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

`,P=m`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`,F=v.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  display: ${({open:e})=>e?`block`:`none`};
`,I=v.div`
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
    animation: ${P} 0.3s ease;
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
`;y();function L(){let e=i(),[t,n]=(0,C.useState)(null);e.pathname.split(`/`).filter(e=>e);let{state:r,category:a,loading:s,error:c,dispatch:l,subLoading:u}=_(),d=e.state?.category_id||r.category_id,f=e.state?.sub_category_id||r.sub_category_id,m=e.state?.sub_category_Detail_id||r.sub_category_detail_id;return(0,C.useEffect)(()=>{d&&d!==`all`&&(n(d),l({type:`SET_CATEGORY`,payload:d})),f&&f!==`all`&&l({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:f}}),m&&m!==`all`&&l({type:`SET_FILTER`,payload:{name:`sub_category_detail_id`,value:m}})},[d,f,m]),(0,C.useEffect)(()=>{if(!e.state&&a.length>0&&!t){let e=a[0];n(e.id),l({type:`SET_CATEGORY`,payload:e.id})}},[a,e.state]),(0,C.useEffect)(()=>{if(r.sub_category.length>0&&(!r.sub_category_id||r.sub_category_id===`all`)){let e=r.sub_category[0];l({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}})}},[r.sub_category]),(0,C.useEffect)(()=>{r.sub_category.length>0&&f&&f!==`all`&&l({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:f}})},[r.sub_category,f]),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(R,{children:(0,T.jsxs)(`div`,{className:`container-fluid px-4  category-bar`,children:[c&&(0,T.jsx)(`div`,{className:`alert alert-danger text-center`,role:`alert`,children:`❌ Failed to load categories. Please try again.`}),(0,T.jsx)(`ul`,{className:`nav justify-content-center`,children:s?(0,T.jsx)(p,{}):a.map((e,r)=>(0,T.jsx)(`li`,{className:`nav-item fs-4`,children:(0,T.jsx)(S,{className:`nav-link ${t===e.id?`active`:``}`,onClick:()=>{n(e.id),l({type:`SET_CATEGORY`,payload:e.id})},children:e.name})},r))})]})}),(0,T.jsx)(`div`,{className:`container-fluid px-4 mt-1`,children:(0,T.jsxs)(`div`,{className:`row`,children:[(0,T.jsx)(k,{}),(0,T.jsxs)(`div`,{className:`col-lg-9 col-md-8`,children:[(0,T.jsxs)(`div`,{className:`results-header d-flex justify-content-between align-items-center mb-2`,children:[(0,T.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,T.jsxs)(`h4`,{className:`page-title mb-0`,children:[`List of`,` `,r.sub_category_id===`all`?r.category_id===`all`?`Schools`:a.find(e=>e.id===r.category_id)?.name:r.sub_category.find(e=>e.value===r.sub_category_id)?.label||`Category`]}),(0,T.jsx)(z,{children:(0,T.jsx)(`span`,{className:`results-count ms-3`,children:(0,T.jsxs)(`span`,{className:`badge bg-secondary`,children:[r.filtered_Listing.length,` `,r.sub_category_id===`all`?r.category_id===`all`?`Schools`:a.find(e=>e.id===r.category_id)?.name:r.sub_category.find(e=>e.value===r.sub_category_id)?.label||`Schools`,` `,`found`]})})})]}),(0,T.jsx)(`div`,{className:`sort-dropdown`,children:(0,T.jsxs)(`select`,{className:`form-select`,id:`sortBy`,children:[(0,T.jsx)(`option`,{value:`relevance`,children:`Sort By: Relevance`}),(0,T.jsx)(`option`,{value:`name`,children:`Name`}),(0,T.jsx)(`option`,{value:`fee`,children:`Fee`}),(0,T.jsx)(`option`,{value:`rating`,children:`Rating`})]})})]}),(0,T.jsx)(`div`,{className:`school-type-filters mb-4`,children:r.sub_category.map(e=>(0,T.jsxs)(`button`,{className:`btn school-type-btn d-flex align-items-center gap-2 ${r.sub_category_id===e.value?`active`:``}`,onClick:()=>l({type:`SET_FILTER`,payload:{name:`sub_category_id`,value:e.value}}),children:[(0,T.jsx)(`i`,{className:`fas fa-check me-1`}),e.img&&(0,T.jsx)(`img`,{src:`${o}${e.img}`,alt:e.label,style:{height:`24px`,width:`24px`,objectFit:`contain`}}),(0,T.jsx)(`span`,{children:e.label})]},e.value))}),(0,T.jsx)(M,{showcard:!1})]})]})})]})}var R=v.section`
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
`,z=v.div`
.results-count .badge {
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.875rem;
}

`,B=L;export{B as default};