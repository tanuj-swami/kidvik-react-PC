import React, { useState } from "react";
import styled from "styled-components";
import { ChevronUp } from "lucide-react";

// Styled components for card and table
const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
  border: 1px solid #dee2e6;
`;

const TableRowHeader = styled.div`
  background-color: #f1f3f5;
  font-weight: 500;
`;

const TableCell = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding: 1rem;
`;

const ComparisonTable = ({ school1, school2 }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card>
      {/* Header */}
      <button
        className="btn w-100 d-flex justify-content-between align-items-center p-3"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ textAlign: "left", backgroundColor: "transparent", border: "none" }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "2rem",
              height: "2rem",
              backgroundColor: "rgba(13,110,253,0.1)",
              borderRadius: "0.25rem",
            }}
          >
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h5 className="mb-0">School Type</h5>
        </div>
        <ChevronUp
          className={`transition-transform ${isExpanded ? "" : "rotate-180"}`}
        />
      </button>

      {/* Table Content */}
      {isExpanded && (
        <div className="border-top">
          <div className="d-flex">
            {/* Ownership */}
            <TableRowHeader className="flex-shrink-0" style={{ width: "200px" }}>
              Ownership
            </TableRowHeader>
            <TableCell className="flex-grow-1 border-end">{school1.ownership}</TableCell>
            <TableCell className="flex-grow-1">{school2.ownership}</TableCell>
          </div>

          <div className="d-flex">
            {/* School Format */}
            <TableRowHeader className="flex-shrink-0" style={{ width: "200px" }}>
              School Format
            </TableRowHeader>
            <TableCell className="flex-grow-1 border-end">{school1.format}</TableCell>
            <TableCell className="flex-grow-1">{school2.format}</TableCell>
          </div>

          <div className="d-flex">
            {/* Co-Ed Status */}
            <TableRowHeader className="flex-shrink-0" style={{ width: "200px" }}>
              Co-Ed Status
            </TableRowHeader>
            <TableCell className="flex-grow-1 border-end">{school1.coEd}</TableCell>
            <TableCell className="flex-grow-1">{school2.coEd}</TableCell>
          </div>

          <div className="d-flex">
            {/* Admission Partner */}
            <TableRowHeader className="flex-shrink-0" style={{ width: "200px" }}>
              Admission Partner
            </TableRowHeader>
            <TableCell className="flex-grow-1 border-end d-flex align-items-center">
              <img
                src="/placeholder.svg"
                alt="Admission Partner"
                className="rounded-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
            </TableCell>
            <TableCell className="flex-grow-1 d-flex align-items-center">
              <img
                src="/placeholder.svg"
                alt="Admission Partner"
                className="rounded-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
            </TableCell>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ComparisonTable;
