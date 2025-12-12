import React from "react";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { FaCogs } from "react-icons/fa";
import { BASE_URL } from "../Helper/Base_Url";
import { useAPI } from "../Contaxt/ALL_APi_Call/API_Call_Contaxt";

function About_more() {
const {aboutData, isLoading} = useAPI();

  if (isLoading) return <p className="text-center py-5">Loading...</p>;

  return (
    <>
      <div className="py-5">
        <div className="container">

          {/* Show Privacy Policy */}
          {/* <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(aboutData?.privacy_policy),
            }}
          ></div> */}

          {/* <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(aboutData?.terms_conditions),
            }}
          ></div> */}

          {/* If you want Cookies Policy */}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(aboutData?.cookies_policy),
            }}
          ></div>

        </div>
      </div>
    </>
  );
}

export default About_more;
