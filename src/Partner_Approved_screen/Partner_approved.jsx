import React, { useEffect, useState } from "react";
import {
  Spinner,
  Container,
  Form,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BASE_URL } from "../Helper/Base_Url";
import { showToast } from "../Helper/toastService";
import Top_Heading from "../Helper/Top_Heading";
import {
  FaEdit,
  FaEye,
  FaSearch,
  FaSyncAlt
} from "react-icons/fa";
import { MdCreditScore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function Partner_approved() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statuses, setStatuses] = useState([]); // ✅ All park statuses
  const [selectedStatus, setSelectedStatus] = useState(""); // ✅ Selected dropdown value
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch partners
  const fetchPartners = () => {
    setLoading(true);
    fetch(`${BASE_URL}/partner_master/?order_by=-PartnerMaster_id`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPartners(data);
        } else if (Array.isArray(data?.data)) {
          setPartners(data.data);
        }
      })
      .catch((err) => console.error("Error fetching partner:", err))
      .finally(() => setLoading(false));
  };

  // ✅ Fetch statuses
  const fetchStatuses = () => {
    fetch(`${BASE_URL}/park_status/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setStatuses(data.data);
        }
      })
      .catch((err) => console.error("Error fetching statuses:", err));
  };

  useEffect(() => {
    fetchPartners();
    fetchStatuses();
  }, []);

  // ✅ Search filter
  const filteredPartners = partners.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Bulk Update
  const handleUpdateClick = () => {
    if (selectedRows.length === 0) {
      showToast( "Please select at least one listing.", "error");
      return;
    }
    setShowModal(true);
  };

  const confirmUpdateStatus = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`${BASE_URL}/partners_bulk/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partner_ids: selectedRows.map((r) => r.PartnerMaster_id),
          park_status_id: selectedStatus,
          remark: remarks,
        }),
      });

      const result = await res.json();
      console.log("Update Response:", result);

      if (res.ok) {
        showToast("Park Status updated successfully ");
        fetchPartners(); // refresh table
        setRemarks("");
        setSelectedStatus("");
        setSelectedRows([]);
      } else {
        alert("Failed to update status ❌");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong ❌");
    } finally {
      setUpdating(false);
      setShowModal(false);
    }
  };

  // ✅ Navigation handlers
  const handleEdit = (id) => {
    navigate(`/park_listing/${id}`);
  };

  const handleviwe = (id) => {
    navigate(`/partner/${id}`);
  };

  // ✅ Row color styling
  const conditionalRowStyles = [
    {
      when: (row) => row?.park_status?.ParkStatus_name === "Block",
      style: { backgroundColor: "#f8d7da" },
    },
    {
      when: (row) => row?.park_status?.ParkStatus_name === "Live",
      style: { backgroundColor: "#d1e7dd" },
    },
    {
      when: (row) => row?.park_status?.ParkStatus_name === "Temporarily",
      style: { backgroundColor: "#fff3cd" },
    },
    {
      when: (row) => row?.park_status?.ParkStatus_name === "Parked",
      style: { backgroundColor: "#cff4fc" },
    },
  ];

  // ✅ Define columns for DataTable
const columns = [

    {
    name: "Action",
    cell: (row) => (
      <div className="d-flex gap-2">
        <button
          className=" btn-sm  d-flex align-items-center"
          title="Edit"
          onClick={() => handleEdit(row.PartnerMaster_id)}
        >
          <FaEdit />
        </button>

        <button
          className="btn-sm  d-flex align-items-center"
          title="View"
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
    name: "Park Status",
    cell: (row) => (
      <span
        className={`badge px-3 py-2 fs-6 ${
          row?.park_status?.ParkStatus_name === "Live"
            ? "bg-success"
            : row?.park_status?.ParkStatus_name === "Block"
            ? "bg-danger"
            : row?.park_status?.ParkStatus_name === "Temporarily"
            ? "bg-warning text-dark"
            : row?.park_status?.ParkStatus_name === "Parked"
            ? "bg-info text-dark"
            : "bg-secondary"
        }`}
      >
        {row?.park_status?.ParkStatus_name || "Pending"}
      </span>
    ),
    sortable: true,
    center: true,
  },


  {
    name: "Partner ID",
    selector: (row) => row.PartnerMaster_id,
    sortable: true,
    width: "120px",
    center: true,
      cell: (row) => (
    <span
      style={{ cursor: "pointer", color: "#0d6efd" }}
      onClick={() => handleviwe(row?.slug ? row.slug : row.PartnerMaster_id)}
    >
      {row?.PartnerMaster_id || "-"}
    </span>
  ),
  },


  {
    name: "Listing Name",
    selector: (row) => row.listing_name || "-",
    sortable: true,
    wrap: true, // auto-wrap long names
     width: "120px",
  },
  {
    name: "Category",
    selector: (row) => row?.category?.name || "-",
    center: true,
  },
  {
    name: "City",
    selector: (row) => row?.city?.City_name || "-",
    center: true,
  },
  {
    name: "Contact",
    selector: (row) => row?.person_mobile_number || row?.list_mobno || "-",
    center: true,
  },
  {
    name: "Email",
    selector: (row) => row?.person_email || row?.list_email || "-",
    wrap: true,
  },
  {
    name: "Admin Remark",
    selector: (row) => row?.remark || "-",
    wrap: true,
     width: "120px",
  },
  {
    name: "Log",
    cell: (row) => (
      <div style={{ padding: "6px 8px", lineHeight: "1.5" }}>
        <div>
          <strong>📅 Created On:</strong>{" "}
          {new Date(row?.create_date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div>
          <strong>👤 By:</strong> {row?.created_user_name}
        </div>
      </div>
    ),
    grow: 2, // wider column
  },

];

  return (
    <Container className="mt-4">
      <Top_Heading titile="Approved Partner Listings" subtitile="Approved" />

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Loading data...</p>
        </div>
      ) : (
        <>
          {/* ✅ Header Section */}
          <div className="d-flex align-items-center mb-3 gap-3">
           <button
  className="btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded shadow-sm"
  onClick={handleUpdateClick}
>
  <MdCreditScore className="fs-5" />
  <span>Update Status</span>
</button>

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
              Total Listings: {filteredPartners.length} / {partners.length}
            </span>
          </div>

          {/* ✅ DataTable */}
     <div style={{
  width: "100%",
  overflowX: "auto",
  overflowY: "visible",
  paddingBottom: "10px" 
}}>
  <DataTable
    columns={columns}
    data={filteredPartners}
    pagination
    highlightOnHover
    striped
    responsive
    defaultSortFieldId={1}
    subHeader
    customStyles={{
      tableWrapper: {
        style: {
          display: "block",
          overflowX: "auto",
          overflowY: "visible",
        },
      },
      headCells: {
        style: {
          backgroundColor: "#68c597ff",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
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
  />
</div>


        </>
      )}

      {/* ✅ Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Park Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Status</Form.Label>
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">-- Select Status --</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.ParkStatus_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks (optional)"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={confirmUpdateStatus}
            disabled={updating}
          >
            {updating ? "Updating..." : "Confirm Status"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Partner_approved;
