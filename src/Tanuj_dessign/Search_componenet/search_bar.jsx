import React, { useState , useEffect } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useFilter } from "../../Contaxt/Filter_contaxt";

function SearchBar() {
  // const [search , setSearch] = useState("");
   const {filters , updateFilter}  = useFilter();
  const [location, setLocation] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Search School",
    "Search Recreational",
    "Search Hospitals",
    "Search Event",
    "Search Kids Essential",
  ];

   useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    // <Form onSubmit={handleSearch}>
      <Row className="align-items-center">
        {/* Search Input - 6 columns */}
        <Col md={6} className="mb-2">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch className="text-primary" />
            </InputGroup.Text>
            <Form.Control
              placeholder={placeholders[placeholderIndex]}        
                value={filters.search}
               onChange={(e) => updateFilter("search", e.target.value)} 
             />
          </InputGroup>
        </Col>

        {/* Location Input - 6 columns */}
        <Col md={6} className="mb-2">
          <InputGroup>
            <InputGroup.Text>
              <FaMapMarkerAlt className="text-primary" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button type="submit" variant="warning">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    // </Form>
  );
}

export default SearchBar;
