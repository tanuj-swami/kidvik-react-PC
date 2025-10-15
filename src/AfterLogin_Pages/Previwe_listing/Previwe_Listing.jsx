import React, { useEffect, useState } from "react";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import axios from "axios";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import { useParams } from "react-router-dom";

function Previwe_listing() {
  const { partner_id } = usePartnerLogin();
  
  const [data, setData] = useState([]);
  const { slug } = useParams();
   const [loading, setLoading] = useState(false); // ✅ loading state
   
  useEffect(() => {
    if (partner_id || slug ) {
      setLoading(true); 
      axios
        .get( slug ? `${BASE_URL}/partner_all/${slug}/` :  `${BASE_URL}/partner_all/${partner_id}/`)
        .then((res) => {
          setData(res.data);
        //   setError(null);
        })
        .catch((err) => {
          console.error(err);
        //   setError("Failed to fetch data");
        })
        .finally(() => {
          setLoading(false); // stop loading in all cases
        });
    }
  }, [partner_id , slug ]);
console.log("data",data)
//   if (!data) return (<Loading/>)

  return (
    <>
   
  {
    loading ?  <Loading/> : (<>
        
    <div className="container my-4">

  
      {/* Header */}
      <div className="card shadow-lg border-0 rounded-3 mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-md-3 text-center p-3">
            <img
              src={ data.logo ? `${BASE_URL}${data.logo}` : '/img/logo/Kidvik_Final_logo01.jpg.png'}
              alt={data.listing_name}
              className="img-fluid rounded-circle shadow-sm"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-9 p-3">
            <h3 className="fw-bold">{data.listing_name}</h3>
            <p className="text-muted mb-1">{data.Tag_Line}</p>
            <span className="badge bg-primary">{data.category?.name}</span>
          </div>
        </div>
      </div>

      {/* Banner */}
      {data.banner_img && (
        <div className="mb-4">
          <img
            src={`${BASE_URL}${data.banner_img}`}
            alt="Banner"
            className="img-fluid rounded-3 shadow-sm w-100"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="row g-4">
        {/* Contact Info */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5 className="fw-bold mb-3">📞 Contact Info</h5>
            <p><strong>Mobile:</strong> {data.list_mobno}</p>
            <p><strong>Email:</strong> {data.list_email}</p>
            <p><strong>WhatsApp:</strong> {data.whats_up}</p>
            <p><strong>Website:</strong> <a href={data.website} target="_blank" rel="noreferrer">{data.website}</a></p>
            <p><strong>Person:</strong> {data.person_name} ({data.person_designation?.position})</p>
          </div>
        </div>

        {/* Location Info */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5 className="fw-bold mb-3">📍 Location</h5>
            <p><strong>Address:</strong> {data.address_1}, {data.address_2}</p>
            <p><strong>Area:</strong> {data.area?.Location_name}</p>
            <p><strong>City:</strong> {data.city?.City_name}</p>
            <p><strong>State:</strong> {data.state?.State_name}</p>
            <p><strong>Pincode:</strong> {data.pincode}</p>
            <a
              href={data.geo_location}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary mt-2"
            >
              View on Map
            </a>
          </div>
        </div>

      </div>

      {/* Description */}
      <div className="card mt-4 p-3 shadow-sm">
        <h5 className="fw-bold mb-3">📝 Description</h5>
        <p>{data.description}</p>
      </div>

      {/* Category Specific Section */}
      {/* {data.category_id === 4 && (
        <div className="card mt-4 p-3 shadow-sm">
          <h5 className="fw-bold mb-3">🎓 Education Info</h5>
          <p>Board: {data.institute_board?.[0]?.Board_name || "-"}</p>
          <p>Admission Criteria: {data.institute_admission_criteria?.length ? "Available" : "Not Added"}</p>
          <p>Fees Structure: {data.school_fee_class?.length ? "Available" : "Not Added"}</p>
        </div>
      )} */}
    

    <div className="row g-4 mt-2">
        {/* Contact Info */}
    {data?.partner_staff_detail?.length > 0 && (
  <div className="col-md-6">
    <div className="card p-3 shadow-sm h-100">
      <h5 className="fw-bold mb-3">Partner Staff Detail</h5>

      {data.partner_staff_detail.map((staff) => (
        <div key={staff.id} className="mb-3 border-bottom pb-2">
          <h6 className="fw-bold text-primary">{staff.name}</h6>
          <p><strong>Designation:</strong> {staff.designation?.position || "-"}</p>
          <p><strong>Specialization:</strong> {staff.specialization?.Specialization_name || "-"}</p>
          <p><strong>Qualification:</strong> {staff.qualification || "-"}</p>
          <p><strong>Experience:</strong> {staff.experience_years} years</p>
          <p><strong>Phone:</strong> {staff.phone}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Available Days:</strong> {staff.available_days}</p>
          <p><strong>Available Time:</strong> {staff.available_time}</p>

          
        </div>
      ))}
    </div>
  </div>
)}



        {/* Location Info */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <h5 className="fw-bold mb-3">📍 Location</h5>
            <p><strong>Address:</strong> {data.address_1}, {data.address_2}</p>
            <p><strong>Area:</strong> {data.area?.Location_name}</p>
            <p><strong>City:</strong> {data.city?.City_name}</p>
            <p><strong>State:</strong> {data.state?.State_name}</p>
            <p><strong>Pincode:</strong> {data.pincode}</p>
            <a
              href={data.geo_location}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary mt-2"
            >
              View on Map
            </a>
          </div>
        </div>


      </div>
      </div>

     </>
        )
}
    
  </> );
}

export default Previwe_listing;
