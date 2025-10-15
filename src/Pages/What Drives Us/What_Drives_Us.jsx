import React from "react";
import styled from "styled-components";
import { Heart, Shield, Users, Target, Award, Clock } from "lucide-react";
import TopHeadingBar from "../../Helper/TopHeadingBar";
import { FaCogs } from "react-icons/fa"
import { bgcolor } from "../../Helper/Base_Url";
import { Link } from "react-router-dom";
// Values and Stats data
const values = [
  {
    icon: Heart,
    title: "child Oriented",
    description:
      "Every decision we make puts parents and children at the center. We understand the challenges of parenting and build solutions that truly help.",
    color: "#ef4444", // red
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "All our partners are verified and reviewed. We maintain the highest standards to ensure your family's safety and peace of mind.",
    color: "#2563eb", // blue
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Real reviews from real parents. Our community shares honest experiences to help other families make informed decisions.",
    color: "#16a34a", // green
  },
  {
    icon: Target,
    title: "Local Focus",
    description:
      "We believe in supporting local businesses and communities. Find services in your neighborhood and build lasting local connections.",
    color: "#8b5cf6", // purple
  },
];

const stats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Happy Families",
    description: "Parents trust Kidvik for their family needs",
    color: "#0d6efd",
  },
  {
    icon: Shield,
    number: "5,000+",
    label: "Verified Services",
    description: "Thoroughly vetted and reviewed providers",
    color: "#0d6efd",
  },
  {
    icon: Award,
    number: "50+",
    label: "Cities",
    description: "Growing presence across the country",
    color: "#0d6efd",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Support",
    description: "Always here when you need us",
    color: "#0d6efd",
  },
];

// Styled component for hover effect
const Card = styled.div`
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: ${(props) => props.bg || "#fff"};
  padding: 1.5rem;
    text-align: center;
    border-radius: 1rem;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => props.bg || "#f3f4f6"};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  transition: transform 0.3s;
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const What_Drives_Us = ({ showCards = true }) => {
  return (
    <section className="py-5" style={{ background: bgcolor }}>
      {/* Values Section */}
      <div className="container mb-5">
        {/* <h3 className="text-center mb-5 fw-bold">What Drives Us</h3> */}
        <TopHeadingBar icon={<FaCogs />} Topheading="What Drives Us" firstHeading="Guided by Purpose" secondHeading=", Inspired by Families" description="At the heart of everything we do lies a deep commitment to parents, safety, and community.
       We believe every decision should make life simpler, safer, and more connected for families.." />
       <Link to="about">
        <div className="text-center">
          <button className="btn btn-primary">Read More</button>
        </div>
       </Link>
        {
          showCards && (
            <>

              <div className="row g-4">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <div key={idx} className="col-12 col-md-6 col-lg-3 text-center">
                      <Card>
                        <IconWrapper bg="#e3e8f1ff">
                          <Icon size={24} color={value.color} />
                        </IconWrapper>
                        <h5 className="fw-semibold mb-2">{value.title}</h5>
                        <p className="text-muted">{value.description}</p>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </>
          )
        }
      </div>

      {/* Stats Section */}
      {/* <div className="container">
        <div className="row g-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-3 text-center">
                <Card >
                  <IconWrapper bg="#e7f1ff">
                    <Icon size={24} color={stat.color} />
                  </IconWrapper>
                  <h3 className="fw-bold mb-1">{stat.number}</h3>
                  <h5 className="fw-semibold mb-2">{stat.label}</h5>
                  <p className="text-muted small">{stat.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div> */}
    </section>
  );
};

export default What_Drives_Us;
