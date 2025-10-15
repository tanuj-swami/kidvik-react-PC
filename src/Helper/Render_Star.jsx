import React from "react";
import { FaStar } from "react-icons/fa";

export default function renderStars(rating) {
  const stars = [];
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i <= roundedRating ? "star-filled" : "star-empty"}
      />
    );
  }
  return <>{stars}</>;
}
