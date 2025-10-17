import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../../Helper/Base_Url";

function Navbar_Menu({closeNavbarCollapse}) {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // track open menu
  const [openSubDropdown, setOpenSubDropdown] = useState(null); // track sub menu

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/sub_category/`).then((res) => res.json()),
      fetch(`${BASE_URL}/sub_category_detail/`).then((res) => res.json()),
    ])
      .then(([subCats, subCatDetails]) => {
        const subCatDetailsMap = subCatDetails.data.reduce((acc, item) => {
          const subId = item.sub_category.id;
          if (!acc[subId]) acc[subId] = [];
          acc[subId].push(item);
          return acc;
        }, {});

        const grouped = subCats.data.reduce((acc, sub) => {
          const catId = sub.category.id;
          if (!acc[catId]) {
            acc[catId] = { ...sub.category, subcategories: [] };
          }

          const subWithDetails = {
            ...sub,
            subcategories: subCatDetailsMap[sub.id] || [],
          };

          acc[catId].subcategories.push(subWithDetails);
          return acc;
        }, {});

        setCategories(Object.values(grouped));
      })
      .catch((err) => console.error(err));
  }, []);






  const handleDropdownToggle = (catId) => {
    setOpenDropdown(openDropdown === catId ? null : catId);
    setOpenSubDropdown(null);
  };

  const handleSubDropdownToggle = (subId) => {
    setOpenSubDropdown(openSubDropdown === subId ? null : subId);
  };

  const closeAllMenus = () => {
    closeNavbarCollapse();
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const renderSubcategories = (subs, isDetail = false) => {
    return subs.map((sub) => {
      const hasDetails = sub.subcategories && sub.subcategories.length > 0;
            

      return (
        <div key={sub.id} className="position-relative">
          {hasDetails ? (
            <>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center justify-content-between w-100"
                onClick={() => handleSubDropdownToggle(sub.id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={`${BASE_URL}${sub.icon_img}`}
                    alt={sub.name}
                    style={{ height: "30px", width: "30px", objectFit: "contain" }}
                  />
                  <span>{sub.name}</span>
                </div>
                <span className="ms-auto">{openSubDropdown === sub.id ? "▲" : "▶"}</span>
              </button>

              {openSubDropdown === sub.id && (
                <div className="dropdown-menu show position-static ms-3 bg-white shadow-sm mt-1">
                  {renderSubcategories(sub.subcategories, true)}
                </div>
                
              )}
            </>
            
          ) : (
            
            <NavLink
              to={`subcategory/${sub.slug}`}    
              onClick={()=>closeAllMenus()}   
              state={{
                type: isDetail ? "sub_categorydetail" : "sub_category",
                category_id: isDetail
                  ? sub?.sub_category?.category?.id
                  : sub.category?.id,
                 sub_category_id: isDetail ? sub.sub_category?.id : sub.id,
                 sub_category_detail_id: isDetail ? sub.id : "all",
              }}
              className="dropdown-item d-flex align-items-center gap-2"
            >
              <img
                src={`${BASE_URL}${sub.icon_img}`}
                alt={sub.name}
                style={{ height: "30px", width: "30px", objectFit: "contain" }}
              />
              <span>{sub.name}</span>
              
            </NavLink>
          )}
        </div>
      );
    });
  };

  return (
    <div className="navbar-nav mx-auto">
      <NavLink to="/" className="nav-item nav-link" onClick={closeAllMenus}>
        Home
      </NavLink>

      {categories.map((cat) => (
        <div key={cat.id} className="nav-item dropdown position-relative">
          <button
            type="button"
            className="nav-link dropdown-toggle bg-transparent border-0"
            onClick={() => handleDropdownToggle(cat.id)}
          >
            {cat.name}
          </button>

          {openDropdown === cat.id && (
            <div
              className="dropdown-menu show position-absolute bg-white border shadow-sm mt-2"
              style={{ minWidth: "250px", zIndex: 9999 }}
            >
              {renderSubcategories(cat.subcategories)}
            </div>
          )}
        </div>
      ))}

      <NavLink to="/contact-us" className="nav-item nav-link" onClick={closeAllMenus}>
           Contact
      </NavLink>
    </div>
  );
}

export default Navbar_Menu;
