import React, { useState  , useEffect} from 'react'
import {Link} from 'react-router-dom'
import { CONTACT_INFO } from '../../Helper/Mobile_Number'
import { BASE_URL } from '../../Helper/Base_Url';
import { Loading } from '../../Helper/Loader';
import Our_Gellery from './Our_Gellery';
function Footer() {
  const [footer, setFooter] = useState([]);
  const [loading , setloading] = useState(true);
 useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(`${BASE_URL}/footer`);
        const result = await res.json();
        if (res.ok) {
          setFooter(result.data); // take first record
        }
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
      finally{
        setloading(false);
      }
    };

    fetchFooter();
  }, []);
  console.log("footer",footer)
  return (
   <>
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.1s">
  <div className="container py-5">
    <div className="row g-5">
   
   {
    loading ? <Loading/> : (
<>
  {
    footer.map((footerdata)=>(
<>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="footer-item">
          {/* <h2 className="fw-bold mb-3"><span className="text-primary mb-0">Kid</span><span className="text-secondary">vik</span></h2> */}
           <Link to="htpps://kidvik.com" className>
                  <img src={`${BASE_URL}${footerdata.logo}`} className="a-img" />
                </Link>
<p
  className="mb-4"
  dangerouslySetInnerHTML={{ __html: footerdata.description }}
></p>

          {/* <div className="border border-primary p-3 rounded bg-light">
            <h5 className="mb-3">Join Our Newsletter</h5>
            <div className="position-relative mx-auto border border-primary rounded" style={{maxWidth: 400}}>
              <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
              <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2 text-white">SignUp</button>
            </div>
          </div> */}

        </div>
      </div>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="footer-item">
          <div className="d-flex flex-column p-4 ps-5 text-dark border border-primary" style={{borderRadius: '50% 20% / 10% 40%'}}>
            {/* <p>Monday: 8am to 5pm</p>
            <p>Tuesday: 8am to 5pm</p>
            <p>Wednes: 8am to 5pm</p>
            <p>Thursday: 8am to 5pm</p>
            <p>Friday: 8am to 5pm</p>
            <p>Saturday: 8am to 5pm</p>
            <p className="mb-0">Sunday: Closed</p> */}
            {/* {footerdata.BusinessHours} */}
            <p
  className="mb-4"
  dangerouslySetInnerHTML={{ __html: footerdata.BusinessHours }}
></p>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="footer-item">
          <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
            LOCATION</h4>
          <div className="d-flex flex-column align-items-start">
            <a href className="text-body mb-4"><i className="fa fa-map-marker-alt text-primary me-2" />
              {footerdata.address}</a>
            <a href={`tel:${footerdata.phone_no}`} className="text-start rounded-0 text-body mb-4"><i className="fa fa-phone-alt text-primary me-2" />{footerdata.phone_no}</a>
            <a href="mailto:connect@kidvik.com" className="text-start rounded-0 text-body mb-4"><i className="fas fa-envelope text-primary me-2" /> {footerdata.email}</a>

            <a href className="text-start rounded-0 text-body mb-4"><i className="fa fa-clock text-primary me-2" /> {footerdata.hour}</a>
            <div className="footer-icon d-flex">
           {
            footerdata.facebook_url && (
              <Link className="btn btn-primary btn-sm-square me-3 rounded-circle text-white" to={footerdata.facebook_url} ><i className="fab fa-facebook-f" /></Link>

            )
           }

             {footerdata.twitter_url && (
    <a
      className="btn btn-primary btn-sm-square me-3 rounded-circle text-white"
      href={footerdata.twitter_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-twitter" />
    </a>
  )}

  {footerdata.instagram_url && (
    <a
      className="btn btn-primary btn-sm-square me-3 rounded-circle text-white"
      href={footerdata.instagram_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-instagram" />
    </a>
  )}

  {footerdata.linkdin_url && (
    <a
      className="btn btn-primary btn-sm-square rounded-circle text-white"
      href={footerdata.linkdin_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-linkedin-in" />
    </a>
  )}
            </div>
          </div>
        </div>
      </div>



<Our_Gellery/>


</>
      ))
  }

</>
  )
   }
    </div>
  </div>
</div>

   
   </>
  )
}

export default Footer