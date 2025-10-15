import React, { useState, useEffect , useRef} from "react";
import { Form, Row, Col , Modal} from "react-bootstrap";
import FilterableSelect from "../Helper/FilterableSelect";
import { CurrentLocation} from "../Helper/LocationInput";
import { BASE_URL } from "../Helper/Base_Url";
import FileUploadWithPreview from "../Helper/File_Uploade_previwe";
import { showToast } from "../Helper/toastService";
import { usePartnerLogin } from "../Contaxt/PartnarLogin_context";
import { useParams , useNavigate } from "react-router-dom";
import Form_input from "../Helper/Form_Input";
import Partner_with_us from "./Partner_with_us";
import ButtonLoading from "../Helper/ButtonLoading";

function Create_partner({ }) {
  const { setpartner_id, partnerAuth, setListingname } = usePartnerLogin();
  const formContainerRef = useRef(null);
  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(false);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [loadingcity, setLoadingcity] = useState(false);
  const [loadingstate, setLoadingstate] = useState(false);
  const [state, setstate] = useState([]);
  const [loadingArea, setLoadingArea] = useState(false);
  const [designation, setdesignation] = useState([]);
  const [Area, setArea] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [instituteTypes, setinstituteTypes] = useState([]);
  const [subcategory_detal, setsubcategory_detal] = useState([])
  const [loadingsubcategory_detal, setLoadingsubcategory_detal] = useState(false);
  const [loading , setloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
   const navigate=   useNavigate();

  const { slug } = useParams();
const scrollToForm = () => {
    formContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const dataset = {
    sub_category_detail_id: 1,
    sub_category_id: null,
    category_id: null,
    city_id: null,
    state_id: null,
    park_status_id: 1,
    subscription_type_id: 1,
    area_id: null,
    listing_name: "",
    logo: null,
    banner_img: null,
    Latitude: "",
    longitute: "",
    pincode: "",
    address_1: "",
    address_2: "",
    list_mobno: "",
    list_email: "",
    contact_number: "",
    email_address: "",
    website: "",
    person_name: "",
    person_designation_id: null,
    person_mobile_number: "",
    person_email: "",
    whats_up: "",
    notification_mobile_number: "",
    notification_email: "",
    Tag_Line: "",
    description: "",
    geo_location: null,
    created_user: partnerAuth.user_id ? partnerAuth.user_id : null,
  }

  const [formData, setFormData] = useState(dataset);

  useEffect(() => {
    if (!formData?.category_id) return; // safeguard
    setLoadingsubcategory_detal(true);
    fetch(`${BASE_URL}/sub_category/?category_id=${formData.category_id}`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setinstituteTypes(options);
      })

      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => {
        setLoadingsubcategory_detal(false);
      });

  }, [formData.category_id]);


  useEffect(() => {
    fetch(`${BASE_URL}/sub_category_detail/?sub_category_id=${formData.sub_category_id}`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setsubcategory_detal(options);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [formData.sub_category_id,]);


  useEffect(() => {
    fetch(`${BASE_URL}/category_master/`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setCategories(options);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);


  useEffect(() => {
    if (formData.city_id) {
      setLoadingArea(true); //
      fetch(`${BASE_URL}/location_mst/?city_id=${formData.city_id}`)
        .then((res) => res.json())
        .then((data) => {
          const options = data.data.map((item) => ({
            value: item.id,
            label: item.Location_name,
          }));
          setArea(options);
        })
        .catch((err) => console.error("Error fetching cities:", err))
        .finally(() => {
          setLoadingArea(false); // stop loading
        });
    } else {
      setCity([]);
      setFormData((prev) => ({ ...prev, city_id: "" }));
    }
  }, [formData.city_id]);


  useEffect(() => {
    if (formData.pincode) {
      fetch(`${BASE_URL}/location_mst/?pincode=${formData.pincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.length > 0) {
            const item = data.data[0];

            setFormData((prev) => ({
              ...prev,
              state_id: item?.city?.state?.id || "",
              city_id: item?.city?.id || "",
              area_id: item?.id || "",
            }));

           

          }
          else {
            setFormData((prev) => ({
              ...prev,
              state_id: "",
              city_id: "",
              area_id: "",
            }));

          }

        })
        .catch((err) => console.error("Error fetching cities:", err));
    } else {
      setCity([]);
      setFormData((prev) => ({ ...prev, city_id: "" }));
    }
  }, [formData.pincode]);


  useEffect(() => {
    if (formData.state_id) {
      setLoadingcity(true);
      fetch(`${BASE_URL}/city/?state_id=${formData.state_id}`)
        .then((res) => res.json())
        .then((data) => {
          const options = data.data.map((item) => ({
            value: item.id,
            label: item.City_name,
          }));
          setCity(options);
        })
        .catch((err) => console.error("Error fetching cities:", err))
        .finally(() => {
          setLoadingcity(false); // stop loading
        });
    } else {
      setCity([]); 
      setFormData((prev) => ({ ...prev, city_id: "" })); 
    }
  }, [formData.state_id]);

  useEffect(() => {
    setLoadingstate(true);
    fetch(`${BASE_URL}/state/`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.State_name,
        }));

        setstate(options);
      })
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => {
        setLoadingstate(false); // stop loading
      });
  }, []);


  useEffect(() => {
    fetch(`${BASE_URL}/designation_master/`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.position,
        }));

        setdesignation(options);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setSameAsWhatsapp(checked);

    if (checked) {
      setFormData({
        ...formData,
        whats_up: formData.person_mobile_number,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // alert(value)
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const Create_Listing = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!formData.sub_category_id) {
      showToast("Sub Category is required", "error");
      return;
    }
  
    setloading(true);
    
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        let value = formData[key];
        console.log("formDataToSend",formDataToSend)

        if (key === "sub_category_detail_id" && formData.category_id !== 6) {
             value = null;
           }

        if (value !== null && value !== undefined) {
          if (
            key === "banner_img" ||
            key === "logo"
          ) {
            if (value instanceof File) {
              formDataToSend.append(key, value);
            }
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      const response = await fetch(slug ? ` ${BASE_URL}/partner_master/${slug}/` : `${BASE_URL}/partner_master/`, {
        method: slug ? "PUT" : "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      setErrorMessage("");
      if (response.ok) {
        console.log("✅ Success:", data);
        showToast(data.message, "success");
        const slug = data.data.PartnerMaster_id;
        setModalMessage(data.message);
        setShowModal(true);
        setIsButtonDisabled(true);

      } else {
        showToast(data.message, "error");
        setErrorMessage(data.message || "Something went wrong.");

        if (data.errors) {
          Object.entries(data.errors).forEach(([field, message]) => {
            // message string ya array dono ho sakta hai, handle kar lete hain
            if (Array.isArray(message)) {
              message.forEach((msg) => showToast(`${field}: ${msg}`, "error"));
            } else {
              showToast(`${field}: ${message}`, "error");
            }
          });
        } setErrors(data.errors || {});
        console.log("data.errors ", data.errors)
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
    finally {
      setloading(false);
    }
  };

  return (
    <>
    <Partner_with_us scrollToForm={scrollToForm}/>

  <div className="container py-3" ref={formContainerRef}>
      <Form  onSubmit={Create_Listing}>
        <Row className="border border-2 border-primary rounded p-1 mb-4">
          <Col md={4}>
            <FilterableSelect
              label="Listing Category"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              options={categories}
              disabled={isReadOnly}
              error={errors.category_id}

            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Listing Sub Category"
              name="sub_category_id"
              value={formData.sub_category_id}
              required
              onChange={handleChange}
              options={instituteTypes}
              disabled={isReadOnly}
              error={errors.sub_category_id}
              isLoading={loadingsubcategory_detal}
            />
          </Col>

          {formData.category_id === 6 && (
            <Col md={4}>
              <FilterableSelect
                label="Sub Category Detail"
                name="sub_category_detail_id"
                value={formData.sub_category_detail_id}
                onChange={handleChange}
                options={subcategory_detal}
                required
                disabled={isReadOnly}
                error={errors.sub_category_detail_id}
              />
            </Col>
          )}


          <Col md={12}>
            <Form_input
              type="text"
              label="Listing Name"
              name="listing_name"
              value={formData.listing_name}
              onChange={handleChange}
              required
              maxLength={255}
              readOnly={isReadOnly}
              error={errors.listing_name}

            />
          </Col>

          <Col md={12}>
            <Form_input
              type="textarea"
              label="Tagline"
              name="Tag_Line"
              value={formData.Tag_Line}
              onChange={handleChange}
              maxLength={255}
              readOnly={isReadOnly}
              error={errors.Tag_Line}

            />
          </Col>
          <Col md={12}>
            <Form_input
              type="textarea"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={255}
              readOnly={isReadOnly}
              error={errors.description}

            />
          </Col>
        </Row>





        <Row className="border border-2 border-primary rounded p-3 mb-4 ">
          <h4 className="text-primary "> listing Contact Detail</h4>
          <hr className="m-0 p-0 mb-4 text-primary"></hr>

          <Col md={4}>
            <Form_input
              type="email"
              label=" Listing Email Address"
              name="list_email"
              value={formData.list_email}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              error={errors.list_email}

            />
          </Col>

          <Col md={4}>
            <Form_input
              type="tel"
              label=" Listing Mobile Number"
              name="list_mobno"
              value={formData.list_mobno}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              error={errors.list_mobno}
              maxLength={10}
            />
          </Col>


          <Col md={4}>
            <Form_input
              type="url"
              label="Website Url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors.website}

            />
          </Col>
        </Row>
        <Row className="border border-2 border-primary rounded p-3 mb-4 ">
          <h4 className="text-primary "> Person Contact Detail</h4>
          <hr className="m-0 p-0 mb-4 text-primary"></hr>

  
          <Col md={4}>
            <Form_input
              type="text"
              label="Person Name"
              name="person_name"
              value={formData.person_name}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              error={errors.person_name}

            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Person Designation"
              name="person_designation_id"
              value={formData.person_designation_id}
              onChange={handleChange}
              required
              options={designation}
              disabled={isReadOnly}
              error={errors.person_designation_id}

            />

          </Col>
          <Col md={4}>
          <div className="d-flex gap-1 ">
          <Form_input
              type="tel"
              label="Person Mobile"
              name="person_mobile_number"
              value={formData.person_mobile_number}
              onChange={handleChange}
              minLength={10}
              maxLength={10}
              required
              readOnly={isReadOnly}
              error={errors.person_mobile_number}

            />
          
            
            </div>
          </Col>

          <Col md={4}>
            <Form_input
              type="email"
              label="Person Email"
              name="person_email"
              value={formData.person_email}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors?.person_email}

            />
          </Col>



       <Col md={4}>
  <div className="d-flex align-items-center justify-content-between">
    {/* Label + Input */}
    <div className="flex-grow-1 me-3">
      <Form.Label className="text-black fw-bold fs-5 d-flex align-items-center">
        WhatsApp &nbsp;
        <Form.Check
          inline
          label="Same as Mobile Number"
          type="checkbox"
          checked={sameAsWhatsapp}
          onChange={handleCheckbox}
          readOnly={isReadOnly}
          className="custom-checkbox"
        />
      </Form.Label>

      <Form_input
        type="tel"
        name="whats_up"
        value={formData.whats_up}
        onChange={handleChange}
        readOnly={isReadOnly}
        error={errors.whats_up}
        placeholder="Enter Whatsapp Number"

      />
    </div>
  </div>
</Col>


        </Row>

        <Row className="border border-2 border-primary rounded p-3 mb-4 ">
          <h4 className="text-primary ">Address Detail</h4>
          <hr className="m-0 p-0 mb-4 text-primary"></hr>

          <Col md={4}>
            <Form_input
              type="text"
              label="Address line 1"
              name="address_1"
              value={formData.address_1}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors.address_1}
              required

            />
          </Col>

          <Col md={4}>
            <Form_input
              label="Address Line 2"
              name="address_2"
              value={formData.address_2}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors.address_21}

            />
          </Col>

          <Col md={4}>
            <Form_input
              type="text"
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              minLength={6}
              pattern="\d{6}"
              readOnly={isReadOnly}
              error={errors.pincode}
              required

            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="State"
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              required
              options={state}
              disabled={isReadOnly}
              error={errors.state_id}
              isLoading={loadingstate}
            />
          </Col>


          <Col md={4}>
            <FilterableSelect
              label="City"
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              required
              options={city}
              disabled={isReadOnly}
              isLoading={loadingcity}
              error={errors.city_id}

            />

          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Area"
              name="area_id"
              value={formData.area_id}
              onChange={handleChange}
              options={Area}
              required
              disabled={isReadOnly}
              error={errors.area_id}
              isLoading={loadingArea}


            />

          </Col>
        <Col md={3}>
            <Form_input
              label="Google Maps URL"
              name="geo_location"
              type="url"
              value={formData.geo_location}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              readOnly={isReadOnly}
              error={errors.geo_location}

            />
          </Col>
          <Col md={1} className="text-center mt-4">
            <CurrentLocation setFormData={setFormData} />
          </Col>

        

          <Col md={4}>
            <Form_input
              label="Latitude"
              name="Latitude"
              value={formData.Latitude}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors.Latitude}

            />
          </Col>

          <Col md={4}>
            <Form_input
              label="Longitude"
              name="longitute"
              value={formData.longitute}
              onChange={handleChange}
              readOnly={isReadOnly}
              error={errors.longitute}

            />
          </Col>
        </Row>

        <Row className="border border-2 border-primary rounded p-3 mb-4">
          <Col md={6}>
            <FileUploadWithPreview
              label="Logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              disabled={isReadOnly}
              baseUrl={BASE_URL}
              error={errors.logo}
            />
          </Col>

          <Col md={6}>
            <FileUploadWithPreview
              label="Banner Image"
              name="banner_img"
              value={formData.banner_img}
              onChange={handleChange}
              disabled={isReadOnly}
              baseUrl={BASE_URL}
              error={errors.banner_img}
            />
          </Col>
        </Row>
 <div className="mb-2 text-center">
  <button type="submit" className="btn btn-primary" disabled={loading || isButtonDisabled} >
    {loading ? (<>  Submit The Form..  <ButtonLoading/> </>) : "Submit The Form"} 
  </button>
</div>
        {
           errorMessage && (
             <div
              dangerouslySetInnerHTML={{ __html: errorMessage }}
              className="fs-5 text-danger"
            />
           )
        }

      </Form>

       <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            dangerouslySetInnerHTML={{ __html: modalMessage }}
            className="fs-5 text-success"
          />
        </Modal.Body>
      </Modal>
  </div>

    </>
  );
}

export default Create_partner;
