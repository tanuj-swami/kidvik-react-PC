import React from 'react';
import { BASE_URL } from '../Helper/Base_Url';
import '../Cards/ProgramCard.css';

function ProgramCard({ item }) {
  return (
    <div className="p-2 h-100">
      <div className="program-item rounded h-100">
        <div className="program-img position-relative">
          <div className="overflow-hidden img-border-radius">
            <img
              src={`${BASE_URL}${item.Activity_img}`}
              className="img-fluid w-100"
              alt={item.Heading}
            />
          </div>
        </div>

        <div className="program-text bg-white program-card__content">
          <a href="#" className="h4 program-card__title">
            {item.Heading}
          </a>
<p
  className="program-card__desc"
  dangerouslySetInnerHTML={{
    __html: item.Description.slice(0, 100) + (item.Description.length > 120 ? "..." : "")
  }}
></p>

        </div>

        <div className="program-teacher d-flex align-items-center border-top border-primary bg-white px-4 py-3">
          <img
            src={item.Author_img ? `${BASE_URL}${item.Author_img}` : '/img/kidvik_school_img/user_image.jpg'}
            className="img-fluid rounded-circle p-2 border border-primary bg-white"
            alt={item.Author}
            style={{ width: 70, height: 70 }}
          />
          <div className="ms-3">
            <h6 className="mb-0 text-primary">{item.Author}</h6>
            <small>{item.Author_Designation}</small>
          </div>
          

        </div>

       <div className="program-footer d-flex">
  <div className="footer-col">
    {item.key1 && (
      <small className="text-white text-center">
        <i className="fas fa-calendar-alt me-1"></i> {item.key1}
      </small>
    )}
  </div>
  <div className="footer-col">
    {item.key2 && (
      <small className="text-white text-center">
        <i className="fas fa-star me-1"></i> {item.key2}
      </small>
    )}
  </div>
  <div className="footer-col">
    {item.key3 && (
      <small className="text-white text-center">
        <i className="fas fa-ticket-alt me-1"></i> {item.key3}
      </small>
    )}
  </div>
</div>

      </div>
    </div>
  );
}

export default ProgramCard;
