import React, { useState, useRef, useEffect } from "react";
import "./AdminPanel.css";
import { Link } from "react-router-dom";
import EditProducts from "./EditProducts";
import Orders from "./Orders";
import Users from "./Users";
import profile from "./../../assets/profile.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faUser,
  faCartShopping,
  faTable,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
  const mainContentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEditProducts, setShowEditProducts] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showEditUsers, setShowEditUsers] = useState(false);
  const [showEditOrders, setShowEditOrders] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (sidebarOpen) {
      mainContent.style.marginLeft = "0px";
    } else {
      mainContent.style.marginLeft = "-150px";
    }
  }, [sidebarOpen]);

  function handleEditProductsClick() {
    setShowEditProducts(true);
    setShowDashboard(false);
    setShowEditUsers(false);
    setShowEditOrders(false);
  }

  function handleDashboardClick() {
    setShowDashboard(true);
    setShowEditProducts(false);
    setShowEditUsers(false);
    setShowEditOrders(false);
  }

  function handleShowEditUsers() {
    setShowEditUsers(true);
    setShowDashboard(false);
    setShowEditProducts(false);
    setShowEditOrders(false);
  }

  function handleShowEditOrders() {
    setShowEditOrders(true);
    setShowDashboard(false);
    setShowEditProducts(false);
    setShowEditUsers(false);
  }

  return (
    <div className={`admin-container`} style={{ height: "100vh", fontFamily: "monserrat" }}>
      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
        style={{display:"flex", justifyContent: "start", alignItems: !sidebarOpen ? "end" : "center", width: !sidebarOpen ? "auto" : "auto"}}
      >
        <img
          style={{ width: !sidebarOpen ? "60px" : "120px", marginBottom: !sidebarOpen && "40px" , marginRight: !sidebarOpen && "15px", borderRadius: "50%", textAlign: "center" }}
          src={profile}
          alt="Profile image"
          
        />
        <p
          className={`menu-item-text ${sidebarOpen ? "" : "hidden"}`}
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            margin: "10px",
            marginBottom: "50px",
            fontWeight: "600",
            width: !sidebarOpen ? "0px" : "200px"
          }}
        >
          Hello Admin{" "}
        </p>
        <div
          className="dashboard-items sidebar-icons
              {sidebarOpen ? '' : 'hidden sidebar-icons'}"
          style={{alignItems: !sidebarOpen ? "end" : "start", width: !sidebarOpen ? "100px" : "250px"}}
        >
          <p
            className={showDashboard ? "highlight-option" : ""}
            onClick={handleDashboardClick}
            style={{width: !sidebarOpen ? "90px" : "200px" , display:"flex", justifyContent: !sidebarOpen ? "center" : "start", paddingBlock: !sidebarOpen && "15px"}}
          >
            <FontAwesomeIcon style={{alignSelf:"center", paddingRight: !sidebarOpen ? "opx" : "15px"}} icon={faHouse} />{" "}
            <span className={`menu-item-text ${sidebarOpen ? "" : "hidden"}`}>
              Dashboard
            </span>
          </p>
          <p
            className={showEditProducts ? "highlight-option" : ""}
            onClick={handleEditProductsClick}
            style={{width: !sidebarOpen ? "90px" : "200px", display:"flex", justifyContent: !sidebarOpen ? "center" : "start", paddingBlock: !sidebarOpen && "15px"}}
          >
            <FontAwesomeIcon style={{alignSelf:"center", paddingRight: !sidebarOpen ? "opx" : "15px"}} icon={faCartShopping} />{" "}
            <span className={`menu-item-text ${sidebarOpen ? "" : "hidden"}`}>
              Products
            </span>
          </p>
          <p
            className={showEditOrders ? "highlight-option" : ""}
            onClick={handleShowEditOrders}
            style={{width: !sidebarOpen ? "90px" : "200px", display:"flex", justifyContent: !sidebarOpen ? "center" : "start", paddingBlock: !sidebarOpen && "15px"}}
          >
            <FontAwesomeIcon style={{alignSelf:"center", paddingRight: !sidebarOpen ? "opx" : "15px"}} icon={faTable} />{" "}
            <span className={`menu-item-text ${sidebarOpen ? "" : "hidden"}`}>
              Orders
            </span>
          </p>
          <p
            className={showEditUsers ? "highlight-option" : ""}
            onClick={handleShowEditUsers}
            style={{width: !sidebarOpen ? "90px" : "200px", display:"flex", justifyContent: !sidebarOpen ? "center" : "start", paddingBlock: !sidebarOpen && "15px"}}
          >
            <FontAwesomeIcon style={{alignSelf:"center", paddingRight: !sidebarOpen ? "opx" : "15px"}} icon={faUser} />{" "}
            <span className={`menu-item-text ${sidebarOpen ? "" : "hidden"}`}>
              Users
            </span>
          </p>
        </div>
      </div>

      <div>
        {sidebarOpen ? (
          <button
            style={{ left: "250px",  }}
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              style={{ fontSize: "20px", color: "grey" }}
              icon={faChevronLeft}
            />
          </button>
        ) : (
          <button
            style={{ left: "15px", bottom:"240px", }}
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              style={{ fontSize: "20px", color: "grey",  }}
              icon={faChevronRight}
            />
          </button>
        )}
        
      </div>

      <div ref={mainContentRef} className="main-content">
        {showDashboard && (
          <div>
            <span
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                padding: "30px",
                fontWeight: "700",
              }}
            >
              Admin dashboard:
            </span>

            <p style={{ margin: "100px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              illum facilis cum at ullam eum facere quis tempore, dolorem sit
              incidunt culpa et enim asperiores provident rem accusamus!
              Adipisci, quos.
            </p>
          </div>
        )}
        {showEditProducts && <EditProducts />}
        {showEditOrders && <Orders />}
        {showEditUsers && <Users />}
      </div>
    </div>
  );
};

export default AdminPanel;
