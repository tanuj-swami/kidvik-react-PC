import React from "react";

function Pre_School() {
  return (
    <>


    <div className="hero-section position-relative text-center text-white mb-5">
  <img
    src="/img/kidvik_school_img/education_school.webp" 
    alt="Preschool Child Learning"
    style={{ height: "100px", width: "100px", objectFit: 'cover',  }}
  />
  <div className="hero-overlay">
    <h1 className="display-5 fw-bold">Nurturing Your Child's Early Learning</h1>
    <p className="lead text-success">
      Discover top preschools, daycare centers, and early learning programs near you
    </p>
  </div>
    </div>


    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Side - Image */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src="/img/kidvik_school_img/education_pre_school.jpg" 
            alt="Pre School"
            className="img-fluid rounded shadow"
            style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
          />
        </div>

        {/* Right Side - Content */}
        <div className="col-lg-6">
          <h2 className="text-primary mb-4">Pre School & Early Education</h2>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            From the first steps at daycare to the milestones of school,{" "}
            <strong>Kidvik</strong> keeps parents connected with every stage of
            their child’s education. Kidvik is designed to simplify the process
            of finding the best schools, preschools, and daycare centers in your
            neighborhood.
          </p>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            With comprehensive listings, verified details, and easy-to-use
            filters, parents can quickly compare options based on location,
            facilities, teaching methods, and reviews. From admission guidelines
            to fee structures and contact information, everything you need is
            available in one place.
          </p>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            By providing clear, reliable, and accessible information, our
            platform helps parents make informed decisions with confidence and
            convenience.
          </p>

          {/* Call to Action */}
          <a
            href="/schools"
            className="btn btn-primary px-4 py-2 mt-3 rounded-pill"
          >
            Explore Schools Near You
          </a>
        </div>
      </div>
    </div>

<div className="container py-5">
  <div className="row text-center mb-5">
    <div className="col-md-3 mb-4">
      <div className="feature-card p-4 bg-light rounded shadow h-100">
        <i className="fas fa-school fa-2x text-primary mb-3"></i>
        <h5>Verified Schools</h5>
        <p>Find trusted schools and preschools with verified details and reviews.</p>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="feature-card p-4 bg-light rounded shadow h-100">
        <i className="fas fa-chalkboard-teacher fa-2x text-primary mb-3"></i>
        <h5>Qualified Teachers</h5>
        <p>Connect with certified teachers and educators for quality learning.</p>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="feature-card p-4 bg-light rounded shadow h-100">
        <i className="fas fa-book-reader fa-2x text-primary mb-3"></i>
        <h5>Child-Centric Programs</h5>
        <p>Access programs and curricula tailored to children's developmental needs.</p>
      </div>
    </div>
    <div className="col-md-3 mb-4">
      <div className="feature-card p-4 bg-light rounded shadow h-100">
        <i className="fas fa-users fa-2x text-primary mb-3"></i>
        <h5>Parent Reviews</h5>
        <p>Read honest reviews from other parents to make confident educational choices.</p>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Pre_School;
