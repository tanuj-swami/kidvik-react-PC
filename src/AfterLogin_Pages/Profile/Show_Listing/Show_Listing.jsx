import React, { useEffect, useState } from "react";
import { Spinner, Alert, Container, InputGroup, FormControl, Modal, Button } from "react-bootstrap";
import { BASE_URL } from "../../../Helper/Base_Url";
import { usePartnerLogin } from "../../../Contaxt/PartnarLogin_context";
import { FaEdit, FaEye, FaSearch, FaKey, FaUserSlash } from "react-icons/fa";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import FilterableSelect from "../../../Helper/FilterableSelect";
import { BiPlus, BiPencil } from "react-icons/bi"; // BiPlus = Bootstrap plus icon
import ButtonLoading from "../../../Helper/ButtonLoading";
import { showToast } from "../../../Helper/toastService";


function Show_Listing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState("");
  const { partnerAuth } = usePartnerLogin();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [logData, setLogData] = useState([]);
  const [loadingLog, setLoadingLog] = useState(false);
  const [userloading, setuserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showresetModal, setresetShowModal] = useState(false);
  const [created_user, setcreated_user] = useState(null);
  const [partnerid, setpartnerid] = useState(null)
  const [newuserlaoding, setnewuserlaoding] = useState(false);
  const [createerror, setcreateerror] = useState("");
  const [resetLoadingId, setResetLoadingId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#partner-listings") {
      const element = document.getElementById("partner-listings");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // console.log("filteredListings",filteredListings)
  useEffect(() => {
    if (!searchTerm) {
      setFilteredListings(listings);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = listings.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(lowerSearch)
        )
      );
      setFilteredListings(filtered);
    }
  }, [searchTerm, listings]);


  const fetchData = async () => {
    let url = "";

    if (partnerAuth?.userType === "IH" && partnerAuth?.code === "AD") {
      url = `${BASE_URL}/partner_master/`;
    } else if (partnerAuth?.userType === "IH" && partnerAuth?.code === "SE") {
      url = `${BASE_URL}/partner_master/?sales_user=${partnerAuth.user_id}`;
    } else if (partnerAuth?.userType === "PR") {
      url = `${BASE_URL}/partner_master/?partner_user=${partnerAuth.user_id}`;
    } else {
      url = `${BASE_URL}/partner_master/?created_user_id=${partnerAuth.user_id}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.data) {
        setListings(data.data);
        setFilteredListings(data.data);
      } else {
        setError("No listings available");
      }
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/park_listing/${id}`);
  };

  const handleviwe = (slug) => {
    navigate(`/partner/${slug}`);
  };


  const handleviweLog = async (partner_id) => {
    setLoadingLog(true);
    setShowModal(true);

    try {
      const response = await fetch(`${BASE_URL}/partner-log/?partner_id=${partner_id}`);
      const data = await response.json();
      setLogData(data.data || []);
    } catch (error) {
      console.error("Error fetching log:", error);
      setLogData([]);
    } finally {
      setLoadingLog(false);
    }
  };

  const handleResetUser = (id) => {
    setpartnerid(id);
    setresetShowModal(true);
  };


  const createnewuser = async () => {
    if (!partnerid) {
      alert("Partner ID is missing!");
      return;
    }

    setnewuserlaoding(true);

    try {
      const response = await fetch(`${BASE_URL}/partner_user_create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${partnerAuth?.partnerAccess}`, // 🔑 your token
        },
        body: JSON.stringify({
          partner_id: partnerid, // ✅ send partner_id in body
        }),
      });

      const data = await response.json();
      setcreateerror("")
      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
      }
      showToast(`${data?.message} (${data?.created_user})`, "info");
      setcreateerror(`${data?.message} (${data?.created_user})`);

      await fetchData();

    } catch (error) {
      console.error("❌ Error creating user:", error);
      alert(`❌ Failed to create user: ${error.message}`);
    } finally {
      setnewuserlaoding(false);
    }
  };



  const handleResetPassword = async (partnerid) => {
  if (!partnerid) {
    showToast("Partner ID is missing!", "error");
    return;
  }
setResetLoadingId(partnerid);
  try {
    const response = await fetch(`${BASE_URL}/partner_user_reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${partnerAuth?.partnerAccess}`, // 🔑 your token
      },
      body: JSON.stringify({
        partner_id: partnerid, 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
    }

    // ✅ Success — show the message
    showToast(
      data?.created_user
        ? `${data?.message} (${data?.created_user})`
        : data?.message,
      "success"
    );

  } catch (error) {
    console.error("❌ Error resetting password:", error);
    showToast(`Failed to reset password: ${error.message}`, "error");
  }
  finally {
    // stop loader
    setResetLoadingId(null);
  }
};


  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn-sm"
            onClick={() => handleEdit(row.PartnerMaster_id)}
          >
            <FaEdit />
          </button>
          <button
            className=" btn-sm"
            onClick={() => handleviwe(row?.slug == "" || null ? row.PartnerMaster_id : row.slug)}
          >
            <FaEye />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Reset",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {partnerAuth?.userType === "IH" &&
            (partnerAuth?.code === "AD" || partnerAuth?.code === "SE") && (
              <>
                <button
  className="btn btn-sm btn-warning d-flex align-items-center gap-1"
  title="Reset Password"
  onClick={() => handleResetPassword(row.PartnerMaster_id)}
  disabled={resetLoadingId === row.PartnerMaster_id}
  style={{
    fontSize: "13px",
    padding: "4px 8px",
    whiteSpace: "nowrap",
    opacity: resetLoadingId === row.PartnerMaster_id ? 0.7 : 1,
    cursor: resetLoadingId === row.PartnerMaster_id ? "not-allowed" : "pointer",
  }}
>
  {resetLoadingId === row.PartnerMaster_id ? (
    <>
      <div
        className="spinner-border spinner-border-sm text-dark"
        role="status"
        style={{ width: "14px", height: "14px" }}
      ></div>
      <span>Resetting...</span>
    </>
  ) : (
    <>
      <FaKey size={12} /> Reset Password
    </>
  )}
</button>



                <button
                  className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                  title="Reset User"
                  onClick={() => handleResetUser(row.PartnerMaster_id)}
                  style={{
                    fontSize: "13px",
                    padding: "4px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FaUserSlash size={12} /> Reset User
                </button>
              </>
            )}
        </div>
      ),
    },

    {
      name: "Status",
      cell: (row) => (
        <span
          style={{
            backgroundColor:
              row?.park_status?.ParkStatus_name === "Parked"
                ? "#d3bd9aff"
                : row?.park_status?.ParkStatus_name === "Temporarily"
                  ? "#b7d0e2ff"
                  : row?.park_status?.ParkStatus_name === "Live"
                    ? "#abe2b0ff"
                    : row?.park_status?.ParkStatus_name === "Block"
                      ? "#df909eff"
                      : "",
            color:
              row?.park_status?.ParkStatus_name === "Parked"
                ? "orange"
                : row?.park_status?.ParkStatus_name === "Temporarily"
                  ? "blue"
                  : row?.park_status?.ParkStatus_name === "Live"
                    ? "green"
                    : row?.park_status?.ParkStatus_name === "Block"
                      ? "red"
                      : "",
            fontWeight: "600",
            padding: "4px 10px",
            borderRadius: "6px",
          }}
        >
          {row?.park_status?.ParkStatus_name}
        </span>
      ),
      sortable: true,
      sortFunction: (a, b) => {
        const order = ["Live", "Temporarily", "Parked", "Block"]; // 👈 custom order you want
        const aIndex = order.indexOf(a?.park_status?.ParkStatus_name);
        const bIndex = order.indexOf(b?.park_status?.ParkStatus_name);

        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex; // ascending order
      },
    },


    {
      name: "Partner ID",
      selector: (row) => row?.PartnerMaster_id || "",
      sortable: true,
      cell: (row) => (
        <span
          style={{ cursor: "pointer", color: "#0d6efd" }}
          onClick={() => handleviwe(row?.slug ? row.slug : row.PartnerMaster_id)}
        >
          {row?.PartnerMaster_id || ""}
        </span>
      ),
    },

    {
      name: "View Log",
      cell: (row) => (
        <span
          style={{ cursor: "pointer", color: "#0d6efd" }}
          onClick={() => handleviweLog(row.PartnerMaster_id)}
        >
          View Log
        </span>
      ),
      sortable: false, // no need for sorting here

    },
    {
      name: "Created User Name", selector: (row) => row?.created_user_name || "", sortable: true, wrap: true,
    },
    {
      name: "Listing Name", selector: (row) => row?.listing_name || "", sortable: true, wrap: true,
    },
    { name: "Category", selector: (row) => row?.category?.name || "", sortable: true },
    // { name: "Sub Category", selector: (row) => row?.sub_category?.name  || "-", sortable: true },
    // { name: "Detail", selector: (row) => row?.sub_category_detail?.name || "-", sortable: true },
    {
      name: "Sub Category",
      selector: (row) => row?.sub_category?.name || "", // used for sorting
      sortable: true,
      cell: (row) => (
        <div style={{ lineHeight: "1.4" }}>
          <div>{row?.sub_category?.name || "-"}</div>
          {row?.sub_category_detail?.name && (
            <div style={{ fontSize: "13px", color: "#555" }}>
              {row.sub_category_detail.name}
            </div>
          )}
        </div>
      ),
      wrap: true, // allow wrapping for small screens
    },
    { name: "City", selector: (row) => row?.city?.City_name || "", sortable: true, wrap: true, },
    {
      name: "Address",
      selector: (row) => `${row?.address_1 || ""}, ${row?.address_2 || ""}, Pincode: ${row?.pincode || ""}`,
      wrap: true,
    },
    {
      name: "Contact",
      selector: (row) =>
        `${row?.list_mobno || row?.person_mobile_number || ""} | WhatsApp: ${row?.whats_up || ""}`,
      wrap: true,
    },
    { name: "Email", selector: (row) => row?.list_email || row?.person_email || "", sortable: true },
    {
      name: "Website",
      cell: (row) =>
        row?.website ? (
          <a href={row.website} target="_blank" rel="noreferrer" className="text-primary">
            Visit Site
          </a>
        ) : (
          "-"
        ),
    },

    { name: "Remark", selector: (row) => row?.remark || "", wrap: true },

  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setuserLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/user_master/?user_type_id=${1}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${partnerAuth?.partnerAccess}`, // 🔑 token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Keep only id and username
        // const options = data.data.map(item => ({
        //   value: item?.user?.id,
        //   label: item?.user?.username,
        // }));
        const options = data.data.map(item => {
          const firstName = item?.user?.first_name?.trim() || "";
          const lastName = item?.user?.last_name?.trim() || "";
          const fullName = `${firstName} ${lastName}`.trim();

          return {
            value: item?.user?.id,
            label: fullName
              ? `${item?.user?.username} (${fullName})`
              : item?.user?.username,
          };
        });
        setUsers(options);

        //  console.log("options",options)
        setUsers(options);

      } catch (error) {
        console.error("Error fetching user master:", error);
      } finally {
        setuserLoading(false);
      }
    };

    if (partnerAuth?.partnerAccess) {
      fetchUsers();
    }
  }, [partnerAuth?.partnerAccess]);

  const handleUpdateUser = async () => {
    if (!created_user || !partnerid) {
      showToast("Please select a user before updating.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/partner_master/${partnerid}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${partnerAuth?.partnerAccess}`,
        },
        body: JSON.stringify({
          created_user: created_user, // sending selected user ID
        }),
      });

      if (!response.ok) throw new Error(`Failed! Status: ${response.status}`);
      const result = await response.json();
      // console.log("✅ User updated successfully:", result);
      await fetchData();
      showToast(result.message);
      setresetShowModal(false)
    } catch (error) {
      console.error("Error updating user:", error);
      // alert("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container id="partner-listings" className="mt-4 bg-light py-2">
      {/* <h3 className="mb-4 text-primary d-flex align-items-center justify-content-between">
        Partner Listings
          <input
              type="text"
              placeholder="Search..."
              className="form-control w-25"
              onChange={(e) => {
                const searchText = e.target.value.toLowerCase();
                setListings((prev) =>
                  prev.filter((item) =>
                    item?.listing_name?.toLowerCase().includes(searchText)
                  )
                );
              }}
            />
        <NavLink to="/park_listing" className="btn btn-success">
          + Create Listing
        </NavLink>
     
      </h3>
      <hr></hr> */}
      <div className="d-flex align-items-center gap-3">
        <NavLink to="/park_listing" className="btn btn-success">
          + Create Listing
        </NavLink>

        <InputGroup style={{ maxWidth: "500px" }}>
          <InputGroup.Text>
            <FaSearch className="text-secondary" />
          </InputGroup.Text>

          <FormControl
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </InputGroup>

        <span className="ms-auto fw-bold text-primary">
          Total Listings: {filteredListings.length} / {listings.length}
        </span>
      </div>


      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Loading listings...</p>
        </div>
      ) : error ? (
        <Alert variant="warning" className="text-center">
          {error}
        </Alert>
      ) : listings.length === 0 ? (
        <Alert variant="info" className="text-center">
          No listings available
        </Alert>
      ) : (

        <div
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "visible",
            paddingBottom: "60px", // ensures pagination space on mobile
          }}
        >

          <DataTable
            columns={columns}
            data={filteredListings}
            pagination
            highlightOnHover
            striped
            responsive
            defaultSortFieldId={1}
            subHeader
            dense // ✅ more compact, professional look
            customStyles={{
              table: {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                },
              },
              tableWrapper: {
                style: {
                  overflowX: "auto", // ✅ enables scroll only when needed
                  overflowY: "visible",
                  width: "100%",
                },
              },
              headRow: {
                style: {
                  backgroundColor: "#68c597ff",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                },
              },
              headCells: {
                style: {
                  padding: "12px 16px",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  borderBottom: "1px solid #e2e2e2",
                },
              },
              cells: {
                style: {
                  padding: "10px 14px",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: "1.5",
                  verticalAlign: "middle",
                },
              },
              rows: {
                style: {
                  minHeight: "48px",
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&:hover": {
                    backgroundColor: "#f1fdf3", // soft green hover
                    cursor: "pointer",
                  },
                },
              },
              pagination: {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  padding: "10px 20px",
                  borderTop: "1px solid #ddd",
                  backgroundColor: "#fff",
                  borderRadius: "0 0 10px 10px",
                },
                pageButtonsStyle: {
                  borderRadius: "6px",
                  height: "36px",
                  width: "36px",
                  margin: "0 4px",
                  cursor: "pointer",
                  backgroundColor: "#f4f4f4",
                  color: "#000",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "#68c597ff",
                    color: "#fff",
                    borderColor: "#68c597ff",
                  },
                  "&:disabled": {
                    opacity: 0.5,
                  },
                },
              },
            }}
          />

          {/* <DataTable
    columns={columns}
    data={filteredListings}
    pagination    // 👈 re-enable pagination
    highlightOnHover
    striped
    responsive
    defaultSortFieldId={1}
    subHeader
    customStyles={{
      tableWrapper: {
        style: {
          // display: "block",
          overflowX: "visible",
          // overflowY: "visible",
          width: "100%",
          height:"100%",
        },
      },
      headCells: {
        style: {
        backgroundColor: "#68c597ff",  
                color: "white",
          fontWeight: "bold",
          fontSize: "14px",
            whiteSpace: "normal", 
        wordBreak: "break-word",
          
        },
      },

      pagination: {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          position: "relative",
          padding: "10px",
          border: "1px solid #b6b3b3ff",
          backgroundColor: "#ffffffff",
          zIndex: 5,
          borderRadius:"10px",
          marginTop:"10px"
         
        },
        pageButtonsStyle: {
          borderRadius: "50%",
          height: "36px",
          width: "36px",
          padding: "6px",
          margin: "0 4px",
          cursor: "pointer",
          backgroundColor: "#25252536",
          color: "black",
          "&:hover": {
            backgroundColor: "#68c597ff",
            color: "#141414ff",
          },
          "&:disabled": {
            opacity: 0.9,
          },
        },
      },
    }}
  /> */}
        </div>

      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Partner Log</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {loadingLog ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading logs...</p>
            </div>
          ) : logData.length === 0 ? (
            <p>No logs found for this partner.</p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Action On</th>
                  <th>Action Page</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>user Name</th>
                </tr>
              </thead>
              <tbody>
                {logData.map((log, idx) => (
                  <tr key={idx}>
                    <td>{log.action}</td>
                    <td>{log.action_on}</td>
                    <td>{log.action_page}</td>
                    <td>{log.user?.username || "-"}</td>
                    <td>{log.user?.email}</td>
                    <td> {log.user?.first_name ? log.user?.first_name : "-"} &nbsp; {log.user?.first_name ? log.user?.first_name : " - "}  </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showresetModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setresetShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* <label className="form-label">Select Role</label> */}
                <div className="container py-5">
                  <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
                    {/* Top: New User Button */}
                    <div className="d-flex justify-content-end mb-4">


                      <button className="btn btn-success d-flex align-items-center gap-2"
                        onClick={createnewuser}
                        disabled={newuserlaoding}
                      >
                        <BiPlus size={20} /> {/* React icon */}
                        {newuserlaoding ? (<> <ButtonLoading /> creating </>) : "New User"}
                      </button>
                    </div>
                    {createerror && (
                      <span className="text-danger fw-semibold">
                        {createerror}
                      </span>
                    )}

                    {/* Middle: User Select */}
                    <div className="mb-4">
                      <FilterableSelect
                        label="Select User"
                        name="created_user"
                        value={created_user}
                        options={users}
                        onChange={(e) => setcreated_user(e.target.value)}
                        required
                        isLoading={userloading}
                      />
                    </div>

                    {/* Bottom: Update User Button */}
                    <div className="d-grid">
                      <button className="btn btn-primary d-flex align-items-center gap-2"
                        onClick={handleUpdateUser}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <ButtonLoading />
                            Updating...
                          </>
                        ) : (
                          <>
                            <BiPencil size={20} />
                            Update User
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Show_Listing;
