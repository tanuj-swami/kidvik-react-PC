import React, { useEffect, useState } from "react";
import "./Detail_page_style/Detail_page.css";

import Banner from "./Banner/Banner";
import Info_card from "./Info_card/Info_card";
import Tab_navigation from "./Tab Navigation/Tab_navigation";
import { useParams } from "react-router-dom";
import { useAPI } from "../../Contaxt/ALL_APi_Call/API_Call_Contaxt";
import Facility from "./Tabs_content/Facility/Facility";
import Overviwe from "./Tabs_content/Overviwe/Overviwe";
import Address from "./Tabs_content/Address/Address";
import Contact from "./Tabs_content/Contact/Contact";
import Review from "./Tabs_content/Review/Review";
import Partner_staff from "./Partner_staff/Partner_staff";
import Social_Link from "./Tabs_content/Social_link/Social_Link";
import Timing from "./Tabs_content/Timing/Timing";
import Education_Detail from "./Tabs_content/Education/Education_Detail";
import Education_admission_criteria from "./Tabs_content/Education/Education Admission Criteria/Education_admission_criteria";
import Education_fee from "./Tabs_content/Education/Education_fee/Education_fee";
import Medical_detail from "./Tabs_content/Medical/Medical_detail";
import Event_Detail from "./Tabs_content/Event/Event_Detail";
import Event_Tickets_Schedule from "./Tabs_content/Event/Event Tickets & Schedule/Event_Tickets_Schedule";
import Kids_Essential_Detail from "./Tabs_content/Kids Essential Detail/Kids_Essential_Detail";
import Recreational_Activities_Detail from "./Tabs_content/Reacreational/Recreational_Activities_Detail";
import Recreational_program from "./Tabs_content/Reacreational/Recreational_program/Recreational_program";
import { Loading } from "../../Helper/Loader";

function SchoolProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { Getsinglepartner, singledetail  , detailloading} = useAPI();
  const { slug } = useParams();

  console.log(slug)
  useEffect(() => {
    Getsinglepartner(slug)
  }, [slug])

  const renderContent = () => {
    let content;

    switch (activeTab) {
      case "Overview":
        content = (
          <>
            <Overviwe singledetail={singledetail} />

          </>
        );
        break;

      case "Address":
        content = (
          <>
            <Address singledetail={singledetail} />
          </>
        );
        break;

      case "Facilities":
        content = (
          <>
            <Facility partner_facility={singledetail?.partner_facility} />
          </>
        );
        break;

      case "Contact":
        content = (
          <>
            <Contact singledetail={singledetail} />

          </>
        );
        break;

      case "Reviews":
        content = (
          <>
            <Review singledetail={singledetail} />

          </>
        );
        break;

      case "Team":
        content = (
          <>
            <Partner_staff partnerStaff={singledetail} />

          </>
        );
        break;

      case "Social Link":
        content = (
          <>
            <Social_Link instituteSocialLinks={singledetail} />

          </>
        );
        break;

      case "Timing":
        content = (
          <>
            <Timing instituteTiming={singledetail} />
          </>
        );
        break;

      case "Education Detail":
        content = (
          <>
           <Education_Detail  singledetail={singledetail}/>
          </>
        );
        break;


      case "Education Admission Criteria":
        content = (
          <>
           <Education_admission_criteria  singledetail={singledetail}/>
          </>
        );
        break;

      case "Education Fee detail":
        content = (
          <>
           <Education_fee  singledetail={singledetail}/>
          </>
        );
        break;

      case "Medical Detail":
        content = (
          <>
           <Medical_detail  singledetail={singledetail}/>
          </>
        );
        break;

      case "Events":
        content = (
          <>
           <Event_Detail  singledetail={singledetail}/>
          </>
        );
        break;


      case "Event Tickets & Schedule":
        content = (
          <>
           <Event_Tickets_Schedule  singledetail={singledetail}/>
          </>
        );
        break;

      case "Kids Essential Detail":
        content = (
          <>
           <Kids_Essential_Detail singledetail={singledetail}/>
          </>
        );
        break;

      case "Activity Overview":
        content = (
          <>
           <Recreational_Activities_Detail singledetail={singledetail}/>
          </>
        );
        break;

      case "Recreational Programs":
        content = (
          <>
           <Recreational_program singledetail={singledetail}/>
          </>
        );
        break;

      default:
        content = null;
    }

    // ✅ Common wrapper
    return <div className="content ">{content}</div>;
  };


  return (
    <div className="school-profile">
      {detailloading ? (<>
      <Loading/>
      
      </>) :(<>
      
      
      <Banner singledetail={singledetail} />
      <Info_card singledetail={singledetail} />
      <div className="tabs-container">

        <Tab_navigation activeTab={activeTab} setActiveTab={setActiveTab} singledetail={singledetail} />

        {renderContent()}

      </div> 
 </>)}
    </div>
  );
}

export default SchoolProfile;
