import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button, Modal, Spinner, Col , Row } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BASE_URL } from "../../../../Helper/Base_Url";
import { showToast } from "../../../../Helper/toastService";
import fetchSelectOptions from "../../../Entry_screen_step/MasterTableData/Master_Institude_2nd_step";
import FilterableSelect from "../../../../Helper/FilterableSelect";
import { useQuery } from "@tanstack/react-query";


const FamilyMembersList = ({ userId, showFamilyModal, setShowFamilyModal }) => {
    // const [members, setMembers] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [editRowId, setEditRowId] = useState(null);
    const [editRowData, setEditRowData] = useState({ relation_id: "", name: "", age: "" });
    const [familyMembers, setFamilyMembers] = useState([]);
    const [newMember, setNewMember] = useState({ relation_id: "", name: "", age: "" });
    const [editIndex, setEditIndex] = useState(null);
    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [relationOptions, setRelationOptions] = useState([]);

    // Fetch relation master dropdown
    useEffect(() => {
        fetchSelectOptions(`${BASE_URL}/relation_master/`, "name")
            .then(setRelationOptions)
            .catch((err) => console.error("Failed to load relation options:", err));
    }, []);

    // Fetch existing family members
    // useEffect(() => {
    //     if (userId) fetchFamilyMembers();
    // }, [userId]);

    // const fetchFamilyMembers = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`${BASE_URL}/family_member/?user_id=${userId}`);
    //         const json = await response.json();
    //         setMembers(json.data || []);
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchFamilyMembers = async ({ queryKey }) => {
    const [, userId] = queryKey;
    const response = await fetch(`${BASE_URL}/family_member/?user_id=${userId}`);
    const json = await response.json();
    return json.data || [];
};

const {
    data: members = [],
    isLoading: loading,
    refetch: refetchFamilyMembers,
} = useQuery({
    queryKey: ["family-members", userId],
    queryFn: fetchFamilyMembers,
    enabled: !!userId,        // API calls only when userId exists
    staleTime: 1000 * 60 * 5, // 5 min cache (no re-call)
    cacheTime: 1000 * 60 * 10,
});

    // Save family member details
    const handleSaveFamilyData = async () => {
        setSaving(true);
        try {
            for (const member of familyMembers) {
                const response = await fetch(`${BASE_URL}/family_member/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                        relation_id: member.relation_id,
                        name: member.name,
                        age: member.age,
                    }),
                });

                if (!response.ok) throw new Error("Failed to save one or more members.");
            }

            showToast("Family details saved successfully", "success");
            setShowFamilyModal(false);
            setFamilyMembers([]);
            fetchFamilyMembers();
        } catch (error) {
            showToast("Error saving family data", "error");
        } finally {
            setSaving(false);
        }
    };
    console.log("members", members)
    return (
        <>
            {/* Family Members Card */}
            <Card className="shadow-sm border-0 mt-4">
                <Card.Header className="bg-danger text-white fw-bold py-3">
                    Family Members List
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <Table bordered hover className="mb-0 align-middle text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Relation</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border text-warning" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : members.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-muted text-center py-3">
                                            No family members found.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member, index) => (
                                        <tr key={member.id}>
                                            <td>{index + 1}</td>

                                            {/* Relation Column */}
                                            <td>
                                                {editRowId === member.id ? (
                                                    <FilterableSelect
                                                        // label="Relation"
                                                        name="relation_id"
                                                        value={editRowData.relation_id}
                                                        onChange={(e) =>
                                                            setEditRowData({
                                                                ...editRowData,
                                                                relation_id: e.target.value,
                                                            })
                                                        }
                                                        options={relationOptions}
                                                        placeholder="Select Relation"
                                                    />
                                                ) : (
                                                    member.relation?.name || "-"
                                                )}
                                            </td>


                                            {/* Name Column */}
                                            <td>
                                                {editRowId === member.id ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={editRowData.name}
                                                        onChange={(e) =>
                                                            setEditRowData({ ...editRowData, name: e.target.value })
                                                        }
                                                    />
                                                ) : (
                                                    member.name
                                                )}
                                            </td>

                                            {/* Age Column */}
                                            <td>
                                                {editRowId === member.id ? (
                                                    <Form.Control
                                                        type="number"
                                                        value={editRowData.age}
                                                        onChange={(e) =>
                                                            setEditRowData({ ...editRowData, age: e.target.value })
                                                        }
                                                    />
                                                ) : (
                                                    member.age
                                                )}
                                            </td>

                                            {/* Action Buttons */}
                                            <td>
                                                {editRowId === member.id ? (
                                                    <>
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={async () => {
                                                                try {
                                                                    const response = await fetch(
                                                                        `${BASE_URL}/family_member/${member.id}/`,
                                                                        {
                                                                            method: "PUT",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({
                                                                                user_id: userId,
                                                                                relation_id: editRowData.relation_id,
                                                                                name: editRowData.name,
                                                                                age: editRowData.age,
                                                                            }),
                                                                        }
                                                                    );

                                                                    const result = await response.json();
                                                                    if (response.ok) {
                                                                        showToast("Member updated successfully", "success");
                                                                        setEditRowId(null);
                                                                        setEditRowData({ relation_id: "", name: "", age: "" });
                                                                        fetchFamilyMembers();
                                                                    } else {
                                                                        showToast(result.message || "Failed to update", "error");
                                                                    }
                                                                } catch (err) {
                                                                    showToast("Error updating member", "error");
                                                                }
                                                            }}
                                                        >
                                                            Save
                                                        </Button>

                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => setEditRowId(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="btn btn-primary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => {
                                                                setEditRowId(member.id);
                                                                setEditRowData({
                                                                    relation_id: member.relation?.id || member.relation_id,
                                                                    name: member.name,
                                                                    age: member.age,
                                                                });
                                                            }}
                                                        >
                                                            <FaEdit />
                                                        </Button>

                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => {
                                                                setMemberToDelete(member);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            <FaTrash />
                                                        </Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>

            </Card>


            {/* Delete Modal */}



            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="fs-1 text-danger mb-3">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <h5>Are you sure you want to delete?</h5>
                    <p>
                        <strong>{memberToDelete?.name}</strong> will be permanently removed.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            if (memberToDelete?.id) {
                                const response = await fetch(`${BASE_URL}/family_member/${memberToDelete.id}/`, {
                                    method: "DELETE",
                                });
                                if (response.ok) {
                                    fetchFamilyMembers();
                                    showToast("Member deleted successfully", "success");
                                } else {
                                    showToast("Failed to delete member", "error");
                                }
                            }
                            setShowDeleteModal(false);
                            setMemberToDelete(null);
                        }}
                    >
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Family Modal */}
            <Modal show={showFamilyModal} onHide={() => setShowFamilyModal(false)} size="lg" centered>
                <Modal.Header closeButton style={{ background: "#AE3546" }}>
                    <Modal.Title className="text-white">Add Family Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                       <Row className="g-3 align-items-end">
  <Col md={4}>
    <FilterableSelect
      label="Relation"
      name="relation_id"
      value={newMember.relation_id}
      onChange={(e) =>
        setNewMember({ ...newMember, relation_id: e.target.value })
      }
      options={relationOptions}
      placeholder="Select Relation"
      required
    />
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="form-label">Full Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter name"
        value={newMember.name}
        onChange={(e) =>
          setNewMember({ ...newMember, name: e.target.value })
        }
      />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="form-label">Age</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter age"
        value={newMember.age}
        onChange={(e) =>
          setNewMember({ ...newMember, age: e.target.value })
        }
      />
    </Form.Group>
  </Col>
</Row>


                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                variant={editIndex !== null ? "warning" : "success"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (newMember.relation_id && newMember.name && newMember.age) {
                                        if (editIndex !== null) {
                                            const updated = [...familyMembers];
                                            updated[editIndex] = { ...newMember, user_id: userId };
                                            setFamilyMembers(updated);
                                            setEditIndex(null);
                                        } else {
                                            setFamilyMembers([...familyMembers, { ...newMember, user_id: userId }]);
                                        }
                                        setNewMember({ relation_id: "", name: "", age: "" });
                                    } else {
                                        showToast("Please fill all fields", "warning");
                                    }
                                }}
                            >
                                {editIndex !== null ? "✏️ Update Entry" : "➕ Add Entry"}
                            </Button>
                        </div>
                    </Form>

                    <hr className="my-4" />
                    <h5 className="fw-bold mb-3">Family Members (Unsaved)</h5>

                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead style={{ background: "#AE3546", color: "#fff" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Relation</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {familyMembers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No family members added yet.
                                        </td>
                                    </tr>
                                ) : (
                                    familyMembers.map((member, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {
                                                    relationOptions.find((r) => r.value === member.relation_id)
                                                        ?.label || "—"
                                                }
                                            </td>
                                            <td>{member.name}</td>
                                            <td>{member.age}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    title="Edit"
                                                    onClick={() => {
                                                        setNewMember({
                                                            relation_id: member.relation_id,
                                                            name: member.name,
                                                            age: member.age,
                                                        });
                                                        setEditIndex(index);
                                                    }}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => {
                                                        const updated = [...familyMembers];
                                                        updated.splice(index, 1);
                                                        setFamilyMembers(updated);
                                                    }}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>

                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={() => setShowFamilyModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveFamilyData} disabled={saving}>
                        {saving ? (
                            <>
                                <Spinner size="sm" className="me-2" /> Saving...
                            </>
                        ) : (
                            "Save Family Details"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FamilyMembersList;
