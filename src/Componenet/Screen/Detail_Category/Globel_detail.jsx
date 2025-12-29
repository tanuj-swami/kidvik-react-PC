import React from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../Helper/Base_Url';
import { Loading } from '../../../Helper/Loader';

const fetchCategory = async ({ queryKey }) => {
    const [, slug, type] = queryKey;

    if (!slug) return null;

    const url =
        type === "sub_categorydetail"
            ? `${BASE_URL}/category_master/?sub_categorydetail_slug=${slug}`
            : `${BASE_URL}/category_master/?sub_category_slug=${slug}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data?.data?.length > 0) {
        return data.data[0]; // first record
    }

    return null;
};

function Globel_detail() {
    const { slug } = useParams();
    const location = useLocation();
    const type = location.state?.type || "sub_category";

    const {
        data: category,
        isLoading: loading,
    } = useQuery({
        queryKey: ["category-detail", slug, type],
        queryFn: fetchCategory,
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 min cache
        cacheTime: 1000 * 60 * 10,
    });

    return (
        <>
            <div className="hospital-page container py-2">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {/* Hero Section */}
                        <div className="hero-section position-relative text-center text-white mb-2">
                            <h1 className="display-5 fw-bold">{category?.heading}</h1>
                            <p className="lead text-success">{category?.sub_heading}</p>
                        </div>

                        {/* Content Section */}
                        <div className="container py-2 mb-5">
                            <div className="row align-items-center">
                                {/* Left Image */}
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img
                                        src={`${BASE_URL}${category?.img}`}
                                        alt="Child Healthcare"
                                        className="img-fluid rounded shadow"
                                        style={{ objectFit: "cover", maxHeight: "400px", width: "100%" }}
                                    />
                                </div>

                                {/* Right Content */}
                                <div className="col-lg-6">
                                    <h2
                                        className="text-primary mb-4"
                                        dangerouslySetInnerHTML={{
                                            __html: category?.description_line_1,
                                        }}
                                    />

                                    <div
                                        className="text-muted"
                                        style={{ lineHeight: "2" }}
                                        dangerouslySetInnerHTML={{
                                            __html: category?.description_line_2,
                                        }}
                                    />

                                    <NavLink
                                        to={`/explore`}
                                        state={{
                                            type: type,
                                            category_id:
                                                location.state?.category_id === 7
                                                    ? 3
                                                    : location.state?.category_id,
                                            sub_category_id:
                                                location.state?.sub_category_id === 9
                                                    ? "all"
                                                    : location.state?.sub_category_id,
                                            sub_category_Detail_id:
                                                location.state?.sub_category_detail_id,
                                        }}
                                        className="btn btn-primary mt-3"
                                    >
                                        Find {category?.name} Near You
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Feature Section */}
                {category && (
                    <div className="row text-center mb-5">
                        {[category.key_1, category.key_2, category.key_3, category.key_4].map(
                            (key, index) => (
                                <div className="col-md-3 mb-4" key={index}>
                                    <div className="feature-card p-4 bg-light rounded shadow h-100">
                                        <div dangerouslySetInnerHTML={{ __html: key }} />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Globel_detail;
