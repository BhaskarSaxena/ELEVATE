import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const [currentUser, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4040/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
            setUser(res.user);
        });
    }
  }, []);

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">E.L.E.V.A.T.E</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>E.L.E.V.A.T.E Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          { currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src="./img/profilePicture.png" alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
              <span>Sign in</span>
                </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?cat=design">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
