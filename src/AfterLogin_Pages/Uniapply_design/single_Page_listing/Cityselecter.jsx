import React, { useState, useMemo, useEffect } from "react";
import { MapPin, ChevronDown, Crosshair, ChevronRight, ChevronLeft } from "lucide-react";
import { BASE_URL } from "../../../Helper/Base_Url";
import FilterableSelect from "../../../Helper/FilterableSelect";
import { Use_Listing_Filter } from "../../Listing_contaxt/Listing_Contaxt";
import { showToast } from "../../../Helper/toastService";
import styled from "styled-components";
import { Loading } from "../../../Helper/Loader";


// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(26, 24, 24, 0.7);
//   backdrop-filter: blur(5px);
//    z-index: 999;
//   border-radius: 10px;
//   display: ${({ open }) => (open ? "block" : "none")};
//   transition: all 0.3s ease;
// `;

function Cityselecter({
  cities,
  selectedId,
  setSelectedId,
  selectedCityName,
  setSelectedCityName,
  selectedArea,
  setSelectedArea,
  selectedAreaName,
  setSelectedAreaName,
  selectedCity,
  open,
  setOpen,
  query,
  setQuery,
  popoverRef,
  Allcities,
  Citiesdrowen,
  Allcityloading
}) {
  const [cityAreas, setCityAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [activeCityId , setActiveCityId] = useState(null);
  const [cityName, setCityName] = useState(selectedCityName || "");
  const {setCityId , setcityname} = Use_Listing_Filter();
  // Fetch areas only when user selects a city
  const fetchCityAreas = async cityId => {
    if (!cityId) return;
    setLoadingAreas(true);
    // setActiveCityId(cityId);
    try {
      const res = await fetch(`${BASE_URL}/location_mst/?city_id=${cityId}&is_primary=1`);
      const data = await res.json();
      setCityAreas(data.data || []);
    } catch (err) {
      console.error(err);
      setCityAreas([]);
    } finally {
      setLoadingAreas(false);
    }
  };

  // Load saved area from localStorage on mount
  useEffect(() => {
    const areaId = Number(localStorage.getItem("selectedAreaId"));
    const cityId = Number(localStorage.getItem("selectedCityId"));
    if (!areaId || !cityId) return;

    setSelectedArea(areaId);
    setSelectedAreaName(localStorage.getItem("selectedAreaName") || "");
    setSelectedId(cityId);
    setCityId(cityId)
    setcityname(localStorage.getItem("selectedCityName") || "")
    setSelectedCityName(localStorage.getItem("selectedCityName") || "");
    setCityName(localStorage.getItem("selectedCityName") || "");

    fetchCityAreas(cityId);
  }, []);

  const Selectedareaobject = useMemo(
    () => cityAreas.find(c => c.id === selectedArea),
    [selectedArea, cityAreas]
  );

  const handleBack = () => {
    setActiveCityId(null);
    setCityAreas([]);
  };

  // const cityOptions = Allcities.map(c => ({ label: c.City_name, value: c.id }));


  const handleDetectLocation = () => {
  if (!navigator.geolocation) {
       showToast("Geolocation is not supported by your browser", "info");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      console.log("latitude, longitude",latitude, longitude)
      try {
        // Call reverse geocoding API to get city name
        // You can use any geocoding API like OpenStreetMap Nominatim or Google Maps
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        console.log("location",data);
        const detectedCityName = data.address.city || data.address.town || data.address.village;

        if (!detectedCityName) {
           showToast("Could not detect city from your location", "error" );
          return;
        }

        // Find city object from your Allcities list
        const detectedCity = Allcities.find(
          (c) => c.City_name.toLowerCase() === detectedCityName.toLowerCase()
        );

        // if (!detectedCity) {
        //   alert(`We do not have listings in ${detectedCityName}`);
        //   return;
        // }

        // Update states just like when user selects a city
        setSelectedId(detectedCity.id);
        setCityId(detectedCity.id);
        setSelectedCityName(detectedCity.City_name);
        setcityname(detectedCity.City_name)
        setSelectedArea(null);
        setSelectedAreaName("");
        setCityName(detectedCity.City_name);

        // Persist in session storage
        localStorage.setItem("selectedCityId", detectedCity.id);
        localStorage.setItem("selectedCityName", detectedCity.City_name);

        // Fetch areas for that city
        fetchCityAreas(detectedCity.id);

        setOpen(false);
      } catch (err) {
        console.error(err);
        alert("Failed to detect city from your location");
      }
    },
    (error) => {
      console.error(error);
      alert("Failed to get your location");
    }
  );
};

const filteredCities = useMemo(() => {
  if (!query) return [...Allcities].sort((a, b) =>
    a.City_name.localeCompare(b.City_name)
  );
  return Allcities
    .filter(city => city.City_name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.City_name.localeCompare(b.City_name));
}, [query, Allcities]);



  return (
    <>
    <div className="col-12 col-md-4 mb-1">
      {/* <Overlay open={open} /> */}
      {/* Main button */}
      <button
        type="button"
        className="btn  w-100 d-flex align-items-center justify-content-between shadow-lg"
        onClick={() => {
          setOpen(!open)
           setQuery("");

        }}
        style={{borderRadius:"10px", border:"2px solid #d8d5d5ec"}}
      >
        <div className="d-flex align-items-center">
          <MapPin size={20} style={{ color: "#B22222" }} className="me-2" />
          <span>
            {Selectedareaobject
              ? `${Selectedareaobject.city?.City_name}   `
              //  ${Selectedareaobject.Location_name}
             
              : selectedAreaName && selectedCityName
                ? `${selectedCityName}   `
                  // ${selectedAreaName}
               
                : selectedCityName
                  ? selectedCityName
                  : "Select City"}
          </span>
        </div>
        <ChevronDown size={16} className="ms-2 text-secondary" />
      </button>

      {/* Popover */}
      {open && (
        <div
          ref={popoverRef}
          className="card_1 shadow position-absolute p-3 mt-1 w-90"
          style={{ zIndex: 1050, maxHeight: "70vh", overflowY: "auto" }}
        >
          {/* Search Input */}
          <div className="d-flex flex-column flex-sm-row mb-3 gap-2">
            <div className="d-flex align-items-center flex-grow-1 border rounded p-2">
              <MapPin size={20} style={{ color: "#B22222" }} className="me-2" />

              <input
                type="text"
                className="form-control"
                placeholder="Search Location, City..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />

              <button type="button" className="btn btn-outline-danger d-flex align-items-center"  onClick={handleDetectLocation}>
                <Crosshair size={16} className="me-1" />
                <span className="small">Detect</span>
              </button>
            </div>
          </div>

          {/* Cities list */}
          {!activeCityId && (
            <>
              <h6 className="fw-semibold">Popular Locations</h6>
              <div className="row row-cols-1 row-cols-sm-2 g-2 mb-3">
                {cities.map(p => (
                  <div key={p.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className={`btn w-100 d-flex justify-content-between align-items-center border ${selectedId === p.id ? "text-white bg-primary" : "text-dark"
                          }`}
                        onClick={() => {
                          setSelectedId(p.id);
                          setCityId(p.id)
                          setSelectedCityName(p.City_name);
                          setcityname(p.City_name)
                          setSelectedArea(null);
                          setSelectedAreaName("");
                          setOpen(false);
                        }}
                      >
                        {p.City_name}
                        <button
                          className="btn d-flex align-items-center justify-content-center p-1 ms-2"
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: "1px solid #42B682",
                            backgroundColor: "#fff",
                            color: "#42B682",
                          }}
                          onClick={e => {
                            e.stopPropagation();
                            fetchCityAreas(p.id);
                            setCityName(p.City_name);
                          }}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

             <h6 className="fw-semibold">Other Locations ({Allcities.length})</h6>

<div
  className="d-flex flex-column gap-1 p-2 border rounded"
  style={{ maxHeight: "300px", overflowY: "auto" }}
>
  {Allcityloading ? (
    <Loading />
  ) : filteredCities.length > 0 ? (
    filteredCities.map(o => (
      <div key={o.id} className="d-flex justify-content-between align-items-center">
        <button
          className={`btn w-100 d-flex justify-content-between align-items-center border ${
            selectedId === o.id ? "text-white bg-primary" : "text-dark"
          }`}
          onClick={() => {
            setSelectedId(o.id);
            setCityId(o.id);
            setSelectedCityName(o.City_name);
            setcityname(o.City_name);
            setSelectedArea(null);
            setSelectedAreaName("");
            setOpen(false);
          }}
        >
          {o.City_name}
          <button
            type="button"
            className="btn d-flex align-items-center justify-content-center p-1 ms-2"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid #42B682",
              backgroundColor: "#fff",
              color: "#42B682",
            }}
            onClick={e => {
              e.stopPropagation();
              fetchCityAreas(o.id);
              setCityName(o.City_name);
            }}
          >
            <ChevronRight size={20} />
          </button>
        </button>
      </div>
    ))
  ) : (
    <p className="text-center text-muted m-0">No cities found</p>
  )}
</div>


            </>
          )}

          {/* Areas list */}
          {activeCityId && (
            <div>
              <div className="d-flex align-items-center mb-2">
                <div className="me-2" onClick={handleBack} style={{ cursor: "pointer" }}>
                  <ChevronLeft size={20} /> Back
                </div>
                <h6 className="fw-semibold mb-0">Popular Areas in {cityName}</h6>
              </div>

              <div
                className="d-flex flex-column gap-1 p-2 border rounded"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {loadingAreas ? (
                  <span>Loading areas...</span>
                ) : cityAreas.length > 0 ? (
                  cityAreas.map(area => (
                    <button
                      key={area.id}
                      className={`btn btn-sm text-start w-100 fs-6 fw-bold ${selectedArea === area.id ? "bg-primary text-white" : ""
                        }`}
                      onClick={() => {
                        setSelectedArea(area.id);
                        setSelectedAreaName(area.Location_name);
                        setSelectedId(area.city_id);
                        setSelectedCityName(area.city?.City_name || "");
                        setCityName(area.city?.City_name || "");
                        setOpen(false);
                      }}
                    >
                      {area.Location_name}
                    </button>
                  ))
                ) : (
                  <span>No areas found</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    
    </>
  );
}

export default Cityselecter;
