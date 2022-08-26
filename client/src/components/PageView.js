import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import Topical from "./Topical";
import Appointment from "./appoinments/Appointment";
import GameBuddy from "./GameBuddy";
import Contacts from "./Contacts";
import HomePage from "./HomePage";
import BookerInfo from "./bookerInfo/BookerInfo";
import HomeIcon from "./HomeButton";
import AdminLogging from "./admin/AdminLogging";
import Arrow from "./Arrow";

function PageView() {
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-400px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <div id="start">
      <Navbar
        id="navbar"
        className="rainbow-color"
        fixed="top"
        variant="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <HomeIcon />
            <h1 className="navbar-titles">Turun tennisklubi</h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navbar-text">
            <Nav className="ml-auto">
              <Nav.Link href="/topical" style={{ color: "white" }}>
                <div>Ajankohtaista</div>
              </Nav.Link>

              <NavDropdown title="Ajanvaraukset" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  href="/appointment"
                  style={{ color: "black" }}
                >
                  Ajanvaraus
                </NavDropdown.Item>
                <NavDropdown.Item href="/bookerinfo" style={{ color: "black" }}>
                  Varaustiedot
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/gameBuddy" style={{ color: "white" }}>
                <div>Pelikaveri</div>
              </Nav.Link>

              <Nav.Link
                href="/contacts"
                style={{ color: "white" }}
                className="navbar-hover"
              >
                <div>Yhteystiedot</div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

      <div
        style={{
          marginTop: "100px",
        }}
      >
        <Routes>
          <Route path="/admin" element={<AdminLogging />} />
          <Route path="/topical" element={<Topical />} />
          <Route path="/bookerinfo" element={<BookerInfo />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/gameBuddy" element={<GameBuddy />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>

      <Arrow />

      <div className="row bottom-style rainbow-color">
        <div className="col">
          <div className="row some-margin address-margin">
            <a
              style={{ textDecoration: "none" }}
              href="https://www.facebook.com/"
            >
              <h1 className="some-style" style={{ paddingRight: "30px" }}>
                f
              </h1>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.instagram.com/"
            >
              <h1 className="some-style">in</h1>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row some-margin">
            <h3 className="address-style">Osoite:</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageView;
