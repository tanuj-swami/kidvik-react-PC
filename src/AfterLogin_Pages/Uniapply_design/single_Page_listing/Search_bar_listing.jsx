import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Helper/Base_Url";
import { Use_Listing_Filter } from "../../Listing_contaxt/Listing_Contaxt";
import styled from "styled-components";
import { showToast } from "../../../Helper/toastService";

// const Overlay = styled.div`
//   position: fixed;
//   top: 0; left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0,0,0,0.5); // dim background
//   backdrop-filter: blur(5px); // blur effect
//   z-index: 9998;
//   display: ${({ open }) => (open ? "block" : "none")};
//   transition: all 0.3s ease;
// `;

function Search_bar_listing({setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
    const [placeholder, setPlaceholder] = useState("Search...");
  const [showDropdown, setShowDropdown] = useState(false);
  const { cityId} = Use_Listing_Filter();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

    const placeholderWords = [
    // "Recreational Activities",
    // "Schools",
    // "Hospitals",
    // "Events",
    // "Kids Essentials",
  "schools near you",
  "fun events for kids",
  "trusted hospitals",
  "recreational activities",
  "essential baby products",
  "what’s poppin in your city",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(placeholderWords[0]);
  // ✅ Fetch suggestions dynamically as user types
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setPlaceholder("Search " + currentWord.slice(0, typingIndex) + "...");

      if (typingIndex === currentWord.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTypingIndex(0);
          const nextIndex = (currentIndex + 1) % placeholderWords.length;
          setCurrentIndex(nextIndex);
          setCurrentWord(placeholderWords[nextIndex]);
        }, 1500); // pause before next word
      } else {
        setTypingIndex((prev) => prev + 1);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [typingIndex, currentWord, currentIndex]);

  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim() ||  !cityId ) {
        setSuggestions([]);
         return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(
          `${BASE_URL}/partner_master/?city_id=${cityId}&search=${searchTerm.trim()}`
        );
        const data = await res.json();
        
        setSuggestions(data?.data || []);

      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400); // debounce typing

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, cityId]);

  // ✅ Handle search form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityId) {
       showToast("Please select a city first!","info");
      return;
    }
    if (!searchTerm.trim()) {

      showToast("Please Enter a Listing Name To Search!");
      return;
    }

    try {
      setIsSearching(true);
      const res = await fetch(
        `${BASE_URL}/partner_master/?city_id=${cityId}&search=${searchTerm.trim()}`
      );
      const data = await res.json();
      if (data?.data?.length > 0) {
        const firstResult = data.data[0];
        navigate(`/partner/${firstResult.slug}`);
      } else {
        alert("No listings found.");
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
      setShowDropdown(false);
    }
  };

  // ✅ Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle selecting a suggestion
  const handleSelect = (slug, name) => {
    setSearchTerm(name);
    setShowDropdown(false);
    navigate(`/partner/${slug}`);
  };

  return (
    <>
{/* <Overlay open={showDropdown && searchTerm.trim().length > 0} /> */}
    <div className="col-12 col-md-8 position-relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="d-flex w-100">
        <input
          type="text"
          className="form-control shadow-lg"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
             if (!cityId) {
              showToast("Please select a city first!","info");
              setOpen(true);
              // showToast("Please select a city first!","warning")
      return; // prevent typing
    }
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
                  style={{borderRadius:"10px", border:"2px solid #d8d5d5ec"}}

        />
        <button
          className="btn btn-primary ms-2 d-none d-md-inline"
          type="submit"
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : <Search size={16} />}
        </button>
      </form>

      {/* ✅ Dropdown Suggestions */}
    {showDropdown && suggestions.length > 0 && (
  <ul
    className="list-group position-absolute w-100 mt-2 border-0 shadow-lg bg-white rounded-3 overflow-hidden"
    style={{
      maxHeight: "300px",        // max height, scroll after this
      overflowY: "auto",         // enable vertical scrolling
      zIndex: 99999,
      animation: "fadeIn 0.15s ease-in-out",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    }}
  >
    {suggestions.map((item, index) => (
      <li
        key={item.PartnerMaster_id}
        className={`list-group-item d-flex justify-content-between align-items-center border-0 border-bottom ${
          index === suggestions.length - 1 ? "border-0" : ""
        }`}
        style={{
          cursor: "pointer",
          padding: "12px 16px",
          transition: "background-color 0.2s ease, transform 0.1s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f6f9fc";
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onClick={() => handleSelect(item.slug, item.listing_name)}
      >
        <div className="text-truncate" style={{ maxWidth: "70%" }}>
          <strong className="text-dark">{item.listing_name}</strong>
        </div>
        <small className="text-muted text-end">
          {item?.area?.Location_name || ""}, {item?.city?.City_name || ""}
        </small>
      </li>
    ))}
  </ul>
)}

{/* No results found */}
{showDropdown   && suggestions.length === 0 && (
  <div
    className="position-absolute w-100 mt-2 bg-white border-0 shadow-lg rounded-3 text-center text-muted fw-medium py-3"
    style={{
      zIndex: 99999,
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      animation: "fadeIn 0.2s ease-in-out",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    }}
  >
    <i className="bi bi-search me-2 text-secondary"></i>
    No results found
  </div>
)}


    </div>
    
    </>
  );
}




export default Search_bar_listing;
