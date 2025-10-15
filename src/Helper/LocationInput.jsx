import { useState } from "react";
import { MdMyLocation } from "react-icons/md"; // Material "my location" icon



export  function CurrentLocation({ setFormData }) {
    const [active, setActive] = useState(false);


  const  getLocation = () => {
    if (navigator.geolocation) {

      // navigator.geolocation.getCurrentPosition(
      //   (pos) => {
      //     const { latitude, longitude } = pos.coords;
      //     const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

      //     setFormData((prev) => ({
      //       ...prev,
      //       geo_location: url,
      //       Latitude: latitude.toString(),
      //       longitute: longitude.toString(),
      //     }));
      //      setActive(true);
      //   },
      //   () => alert("Location access denied!")
      // );
      navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
console.log("longitude",longitude)
    setFormData((prev) => ({
      ...prev,
      geo_location: url,
      Latitude: latitude.toString(),
      longitute: longitude.toString(), 
    }));
    
    setActive(true);
  },
  () => alert("Location access denied!"),
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
);


    }
  };

  
  return (
  //  <p
  //     type="button"
  //     onClick={getLocation}
  //     title="Use My Current Location"
  //     className={`btn btn-light rounded-circle p-2 shadow-sm border ${
        
  //       active ? " text-white" : "text-primary"

  //     }`}
  //     style={{ fontSize: "35px" }}
  //   >

      <MdMyLocation style={{cursor:"pointer"}} onClick={getLocation} size={40} title="Use My Current Location"  className="rounded-circle shadow-sm cursor-pointer text-primary bg-light hover:bg-primary hover:text-white transition"/>
    // </p>
  );
}
export function LocationInput(props) {
  return <input {...props} />;
}

