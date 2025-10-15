import React from "react";
import { usePartnerLogin } from "../Contaxt/PartnarLogin_context";

function Top_Heading({ subtitile, titile, slug , formData }) {
  // Heading text decide करो (Add vs Edit)
  // const {} = usePartnerLogin();
  const {Listingname} = usePartnerLogin();

  const getTitle = () => {
    if (slug) {
      // Edit mode
      const listingName =
        Listingname && Listingname !== "undefined"
          ? Listingname
          : "";
          
      const personName =
        formData?.category?.name && formData?.category?.name !== "undefined"
          ? formData?.category?.name
          : "";

      if (listingName || personName) {
        return `Edit ${titile}  –  ${listingName}${
          personName ? ` (${personName})` : ""
        }`;
      }
      return `Edit ${titile} - ${slug} `;
    } else {
      // Add mode
      return titile;
    }
  };

  // console.log(" formData", formData)
  return (
    <div
      className="mx-auto text-center wow fadeIn"
      data-wow-delay="0.1s"
      style={{ maxWidth: 700 }}
    >
      <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
        {subtitile}
      </h4>
      {/* <h1 className="mb-4 display-5">{getTitle()}</h1> */}
            <h1 className="mb-4 display-5">{titile}</h1>

    </div>
  );
}

export default Top_Heading;
