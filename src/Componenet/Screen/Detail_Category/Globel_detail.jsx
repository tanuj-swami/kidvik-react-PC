import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../Helper/Base_Url';
import { Loading } from '../../../Helper/Loader';

function Globel_detail() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const type = location.state?.type || "sub_category";
    //   console.log("location.state?.category_id",location.state?.category_id)
    //    console.log("location ",location )
    // console.log("id",ids)

    useEffect(() => {
        if (!slug) return;

        const fetchCategory = async () => {
            let url;
            if (type === "sub_categorydetail") {
                url = `${BASE_URL}/category_master/?sub_categorydetail_slug=${slug}`;
            } else {
                url = `${BASE_URL}/category_master/?sub_category_slug=${slug}`;
            }
            try {
                setLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    setCategory(data.data[0]); // first (or only) record
                } else {
                    setCategory(null);
                }
            } catch (err) {
                console.error(err);
                setCategory(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug, type]);
    console.log("category", category)

    return (
        <>

            <div className="hospital-page container py-2">
                {/* Hero Section */}
                {
                    loading ? (<><Loading /></>) : (
                        <>


                            <div className="hero-section position-relative text-center text-white mb-2 ">
                                {/* <div className="hero-overlay"> */}
                                {/* <img
             src={`${BASE_URL}${category?.icon_img}`}
             alt="Child with Doctor"
           //   className="img-fluid w-100 hero-img"
           style={{height:"100px",width:"100px",objectFit:'cover'}}
           /> */}
                                <h1 className="display-5 fw-bold">{category?.heading}</h1>
                                <p className="lead text-success">{category?.sub_heading}</p>
                            </div>
                            {/* </div> */}


                            {/* Content Section */}
                            <div className="container py-2 mb-5">
                                <div className="row align-items-center">
                                    {/* Left Side - Image */}
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                        <img
                                            src={`${BASE_URL}${category?.img}`}
                                            alt="Child Healthcare"
                                            className="img-fluid rounded shadow"
                                            style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
                                        />
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="col-lg-6">
                                        {/* <h2 className="text-primary mb-4">Every Parent Wants the Best Care</h2> */}
                                        <h2 className='text-primary mb-4' dangerouslySetInnerHTML={{ __html: category?.description_line_1 }} />

                                        {/* <p className="text-muted" style={{ lineHeight: "1.8" }}>
           Every parent wants the best care for their child — but finding the right medical support can sometimes feel overwhelming. That’s where <strong>Kidvik</strong> comes in. We bring together trusted hospitals, pediatric specialists, and child-focused therapies — all in one easy-to-use app.
         </p>

         <p className="text-muted" style={{ lineHeight: "1.8" }}>
           From routine check-ups to urgent care and specialized treatments, Kidvik gives you verified details like addresses, contact numbers, facilities, and reviews from other parents. With reliable information at your fingertips, you can make confident choices and feel reassured that your child is in safe hands.
         </p>

         <p className="text-muted" style={{ lineHeight: "1.8" }}>
           At Kidvik, we’re here to make the journey of caring for your child easier, calmer, and more informed.
         </p>
          */}
                                        <div className='text-muted' style={{ lineHeight: "2" }} dangerouslySetInnerHTML={{ __html: category?.description_line_2 }} />

                                        <NavLink
                                            to={`/explore`}
                                            state={{
                                                type: type,
                                                category_id: location.state?.category_id === 7 ? 3 : location.state?.category_id ,
                                                sub_category_id: location.state?.sub_category_id === 9 ? "all" : location.state?.sub_category_id ,
                                                sub_category_Detail_id: location.state?.sub_category_detail_id

                                            }}
                                            className="btn btn-primary mt-3 "
                                        >
                                            Find {category?.name} Near You
                                        </NavLink>
                                      

                                    </div>
                                </div>
                            </div>

                        </>
                    )
                }

                {/* Right Side - Content */}




                {
                    category && (
                        <div className="row text-center mb-5">
                            <div className="col-md-3 mb-4">
                                <div className="feature-card p-4 bg-light rounded shadow h-100">
                                    <div dangerouslySetInnerHTML={{ __html: category?.key_1 }} />

                                </div>
                            </div>

                            <div className="col-md-3 mb-4">
                                <div className="feature-card p-4 bg-light rounded shadow h-100">

                                    <div dangerouslySetInnerHTML={{ __html: category?.key_2 }} />
                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="feature-card p-4 bg-light rounded shadow h-100">

                                    <div dangerouslySetInnerHTML={{ __html: category?.key_3 }} />

                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="feature-card p-4 bg-light rounded shadow h-100">
                                    <div dangerouslySetInnerHTML={{ __html: category?.key_4 }} />

                                </div>
                            </div>
                        </div>
                    )
                }


            </div>

        </>
    )
}

export default Globel_detail