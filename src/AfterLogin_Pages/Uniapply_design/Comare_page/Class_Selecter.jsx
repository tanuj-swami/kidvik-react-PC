import React from "react";
import styled from "styled-components";
import { GraduationCap } from "lucide-react";

// Styled component for card background & border
const Card = styled.div`
  background-color: #ffffff; /* Bootstrap card bg */
  border: 1px solid #dee2e6; /* Bootstrap border */
  border-radius: 0.5rem;
  padding: 1rem;
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0, 123, 255, 0.1); /* Bootstrap primary with opacity */
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ClassSelector = () => {
  return (
    <Card>
      <div className="d-flex align-items-start gap-3">
        {/* Icon */}
        <IconWrapper>
          <GraduationCap size={20} color="#0d6efd" />
        </IconWrapper>

        {/* Select */}
        <div className="flex-grow-1">
          <label className="form-label small mb-1">
            I am looking admission in class:
          </label>
          <div className="position-relative">
            <select className="form-select form-select-sm">
              <option>Nursery</option>
              <option>LKG</option>
              <option>UKG</option>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
            </select>

            {/* Custom dropdown arrow */}
            <svg
              className="position-absolute end-0 top-50 translate-middle-y me-2"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClassSelector;
