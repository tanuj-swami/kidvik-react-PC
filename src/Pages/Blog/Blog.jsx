import React, { useEffect, useState } from "react";
import { Loading } from "../../Helper/Loader";
import { BASE_URL, bgcolor } from "../../Helper/Base_Url";
import TopHeadingBar from "../../Helper/TopHeadingBar";
import "../Blog/Blog.css";
import { NavLink } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/BlogPost`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) setBlogs(data.data);
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (blogs.length === 0)
    return (
      <div className="text-center py-5">
        <h4>No blog posts found</h4>
      </div>
    );

  return (
    <div className="container-fluid py-5 " style={{ background:bgcolor }}>
      <div className="container">
        <TopHeadingBar
          icon={<FaCheckCircle />}
          Topheading="Latest News & Blog"
          firstHeading="Insights for"
          secondHeading="Smart Parenting"
          description="Stay updated with the latest trends and expert advice."
        />

        <GlobalSlider>
          {blogs.map((item) => (
            <div key={item.blog_id} className="p-2">
              <div className="card h-100 shadow-sm small-card">
                
                {/* Blog Image */}
                <img
                  src={`${BASE_URL}${item.image}`}
                  className="card-img-top rounded-top"
                  alt={item.title}
                  style={{
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column p-3">
                  {/* Title */}
                  <h6 className="card-title text-primary fw-bold mb-2" style={{ fontSize: "1rem" }}>
                    {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                  </h6>

                  {/* Content */}
                  <p className="card-text text-muted mb-2" style={{ fontSize: "0.8rem", flexGrow: 1 }}>
                    {item.content.length > 80 ? item.content.slice(0, 80) + "..." : item.content}
                  </p>

                  {/* Meta */}
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>
                      <i className="fas fa-calendar-alt me-1"></i>
                      {item.Date
                        ? new Date(item.Date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "No Date"}
                    </span>
                    <span>
                      <i className="fas fa-user me-1"></i>
                      {item.keywords || "Author"}
                    </span>
                  </div>

                  {/* View Button */}
                  <NavLink
                    // to={`/blog/${item.slug}`}
                    to="/"
                    className="btn btn-primary btn-sm mt-auto"
                  >
                    View
                  </NavLink>
                </div>
                
              </div>
            </div>
          ))}
        </GlobalSlider>
      </div>
    </div>
  );
}

export default Blog;
