import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaMapMarked} from "react-icons/fa";
import { BASE_URL } from "../../../Helper/Base_Url";
import { calculateDistance } from "../../../Helper/calculateDistance";

function Banner({ singledetail }) {
  const bannerImg = singledetail?.banner_img
    ? `${BASE_URL}${singledetail.banner_img}`
    : "/img/logo/Kidvik_Final_logo01.jpg.png";

  const logoImg = singledetail?.logo
    ? `${BASE_URL}${singledetail.logo}`
    : "/img/logo/Kidvik_Final_logo01.jpg.png";

      const userLat = parseFloat(localStorage.getItem("user_latitude"));
      const userLon = parseFloat(localStorage.getItem("user_longitude"));

  const distance =
    singledetail?.Latitude && singledetail?.longitute && userLat && userLon
      ? calculateDistance(userLat, userLon, singledetail?.Latitude, singledetail?.longitute)
      : null;

  return (
    <section
      className="school-banner"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="banner-overlay">
        <motion.div
          className="banner-container"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* LEFT: Logo */}
          <div className="banner-left">
            <img
              src={logoImg}
              alt="School Logo"
              className="banner-logo"
              loading="lazy"
            />
          </div>

          {/* RIGHT: Info */}
          <div className="banner-right">
            <div className="banner-top">
              <h2 className="banner-title">
                {singledetail?.listing_name}
                {singledetail?.short_name && (
                  <span className="banner-short">
                    {" "}
                    ({singledetail.short_name})
                  </span>
                )}
              </h2>
              {/* <span className="verified-badge">
                <i className="fas fa-shield-alt"></i> Verified by School
              </span> */}
            </div>

            {singledetail?.Tag_Line && (
              <p className="banner-tagline">“{singledetail.Tag_Line}”</p>
            )}

            <div className="d-flex align-items-center gap-1 mt-1">
              <button className=" btn-sm btn-success d-flex align-items-center gap-2">
                <FaStar /> {singledetail?.average_rating || "0.0"}
              </button>
              <span className="ms-1">{singledetail?.total_reviews || 0} reviews</span>
            </div>

            <p className="school-distance d-flex align-items-center gap-1 m-0">
              {distance ? (
                <>
                  <FaMapMarked className="text-white" size={20}/> {distance} km away
                </>
              ) : (
                "Distance not available"
              )}
            </p>
            <div className="banner-address">
              <i className="fas fa-map-marker-alt"></i>
              <span>{singledetail?.address_1}</span>
              <button className="show-map">Show on map</button>
            </div>


            {/* <div className="banner-views">
              <i className="fas fa-eye"></i>
              <span>{singledetail?.views || "11431"}</span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Banner;
