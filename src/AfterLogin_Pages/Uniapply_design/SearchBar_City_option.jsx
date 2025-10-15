import React, { useEffect, useMemo, useRef, useState } from "react";
import Cityselecter from "./single_Page_listing/Cityselecter";
import { Search } from "lucide-react";
import { BASE_URL } from "../../Helper/Base_Url";
import { Use_Listing_Filter } from "../Listing_contaxt/Listing_Contaxt";
import { Modal } from "react-bootstrap";
import Search_bar_listing from "./single_Page_listing/Search_bar_listing";

export default function CityLocationPicker() {
  const popularIds = [2, 3, 4, 5];
  const { Allcities , Allcityloading} = Use_Listing_Filter();
 const { Citiesdrowen } = Use_Listing_Filter();
  // ✅ Load selections only from localStorage
  const storedCityId = localStorage.getItem("selectedCityId");
  const storedCityName = localStorage.getItem("selectedCityName");
  const storedAreaId = localStorage.getItem("selectedAreaId");
  const storedAreaName = localStorage.getItem("selectedAreaName");
  const storedQuery = localStorage.getItem("searchQuery") || "";

  // console.log(storedCityId ,storedCityName,storedAreaId, storedAreaName )
  const [cities, setCities] = useState([]);
  const [selectedId , setSelectedId] = useState(storedCityId ? Number(storedCityId) : null);
  const [selectedCityName, setSelectedCityName] = useState(storedCityName || "");
  const [selectedArea, setSelectedArea] = useState(storedAreaId ? Number(storedAreaId) : null);
  const [selectedAreaName, setSelectedAreaName] = useState(storedAreaName || "");
const [query, setQuery] = useState(storedQuery || "");
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // Selected City object
  const selectedCity = useMemo(
    () => Allcities.find(c => c.id === selectedId) ?? { id: selectedId, City_name: selectedCityName },
    [selectedId, Allcities, selectedCityName]
  );

  const popular = useMemo(() => cities.filter(c => popularIds.includes(c.id)), [cities]);
  const others = useMemo(() => cities.filter(c => !popularIds.includes(c.id)), [cities]);

  // Fetch cities only once
  useEffect(() => {
    if (cities.length === 0) {
      fetch(`${BASE_URL}/city/?is_primary=1`)
        .then(res => res.json())
        .then(data => setCities(data.data || []))
        .catch(err => console.error(err));
    }
  }, [cities.length]);

  // Persist selections to localStorage
  useEffect(() => {
    if (selectedId) localStorage.setItem("selectedCityId", selectedId);
    if (selectedCityName) localStorage.setItem("selectedCityName", selectedCityName);
    if (selectedArea) localStorage.setItem("selectedAreaId", selectedArea);
    if (selectedAreaName) localStorage.setItem("selectedAreaName", selectedAreaName);
    localStorage.setItem("searchQuery", query);
  }, [selectedId, selectedCityName, selectedArea, selectedAreaName, query]);

  // Close popover on outside click or Escape
  useEffect(() => {
    const handleClick = e => open && popoverRef.current && !popoverRef.current.contains(e.target) && setOpen(false);
    const handleEsc = e => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  
useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
         localStorage.setItem("user_latitude", latitude);
         localStorage.setItem("user_longitude", longitude);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const detectedCityName = data.address.city || data.address.town || data.address.village;
          console.log(data);
          if (!detectedCityName) return;

          const detectedCity = Allcities.find(
            (c) => c.City_name.toLowerCase() === detectedCityName.toLowerCase()
          );

          if (detectedCity) {
            setSelectedId(detectedCity.id);
            setSelectedCityName(detectedCity.City_name);
            
          }
        } catch (err) {
          console.error("Error detecting location", err);
        }
      });
    }
  }, [Allcities, selectedId]);

  
  return (
    <>
    <div className="container mt-1 " style={{ maxWidth: "900px" }}>
      <div className="row  align-items-center bg-white border rounded shadow-sm p-2">

        <Cityselecter
          cities={cities}
          popular={popular}
          others={others}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          selectedCityName={selectedCityName}
          setSelectedCityName={setSelectedCityName}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          selectedAreaName={selectedAreaName}
          setSelectedAreaName={setSelectedAreaName}
          selectedCity={selectedCity}
          open={open}
          setOpen={setOpen}
          query={query}
          setQuery={setQuery}
          popoverRef={popoverRef}
          Allcities={Allcities}
          Citiesdrowen={Citiesdrowen}
          Allcityloading={Allcityloading}

        />

        <Search_bar_listing  
        open={open}
        setOpen={setOpen}/>

      </div>
    </div>




    </>

    


  );
}
