import React from "react";
import styled from "styled-components";
import { MapPin, Search, Heart } from "lucide-react";

// Styled components for custom spacing or relative positioning
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconLeft = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6c757d; /* Bootstrap muted text */
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  background-color: #fff;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ShortlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Input = styled.input`
  width: 100%;
  padding-left: 2.5rem; /* space for icon */
  padding-right: 0.75rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
`;

const SearchBar = () => {
  return (
    <SearchWrapper>
      <div className="d-flex gap-2">
        {/* Location Dropdown */}
        <LocationButton>
          <MapPin size={16} color="#0d6efd" />
          <span style={{ fontWeight: 500 }}>Gurugram</span>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ marginLeft: "auto" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </LocationButton>

        {/* Search Input */}
        <InputWrapper className="flex-grow-1">
          <IconLeft>
            <Search size={16} />
          </IconLeft>
          <Input type="text" placeholder="Search Schools..." />
        </InputWrapper>
      </div>

      {/* OR Text */}
      <div className="text-center text-muted small">OR</div>

      {/* Shortlisted Schools Button */}
      <ShortlistButton>
        <Heart size={16} />
        <span style={{ fontWeight: 500 }}>Choose from Shortlisted Schools</span>
      </ShortlistButton>
    </SearchWrapper>
  );
};

export default SearchBar;
