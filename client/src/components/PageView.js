import React from "react";
import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import arrowIcon from "../images/arrow-north.png";
import Topical from "./Topical";
import Appointment from "./Appointment";
import GameBuddy from "./GameBuddy";
import HallSeriesStaff from "./HallSeriesStaff";
import HallSeriesPlayers from "./HallSeriesPlayers";
import Contacts from "./Contacts";
import HomePage from "./HomePage";
import BookerInfo from "./BookerInfo";
import Icon from "../HomeButton";

function PageView() {
  return (
    <div>
      <div id="start">
        <br />
        ""
        <Navbar
          className="navbar-style rainbow-color"
          variant="dark"
          expand="lg"
        >
          <Container fluid>
            <Navbar.Brand className="title-style" href="/">
              <Icon />
              <h1 style={{ marginRight: "38px" }} className="navbar-link-title">
                Turun tennisklubi
              </h1>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="nav-button-style navbar-text"
            >
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "230px", paddingLeft: "2%" }}
                navbarScroll
              >
                <Nav.Link href="/topical" style={{ color: "white" }}>
                  <div className="navbar-link-color">Ajankohtaista</div>
                </Nav.Link>

                <NavDropdown title="Ajanvaraukset" id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    href="/appointment"
                    style={{ color: "black" }}
                  >
                    Ajanvaraus
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/bookerinfo"
                    style={{ color: "black" }}
                  >
                    Varaustiedot
                  </NavDropdown.Item>
                </NavDropdown>

                {/* TODO: to do this part in version 2.0 */}
                <Nav.Link href="/gameBuddy" style={{ color: "white" }}>
                  <div className="navbar-link-color">Pelikaveri</div>
                </Nav.Link>
                <NavDropdown title="Hallisarja" id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    href="/hallSeriesPlayers"
                    style={{ color: "black" }}
                  >
                    Pelaajat
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/hallSeriesStaff"
                    style={{ color: "black" }}
                  >
                    Henkilökunta
                  </NavDropdown.Item>
                </NavDropdown>
                {/* ------------------- */}

                <Nav.Link
                  href="/contacts"
                  style={{ color: "white" }}
                  className="navbar-hover"
                >
                  <div className="navbar-link-color">Yhteystiedot</div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="container">
        <div
          className="row"
          style={{
            marginTop: "200px",
          }}
        >
          <div>
            <Col
              style={{
                position: "static",
                alignItems: "center",
              }}
            >
              <Routes>
                <Route path="/topical" element={<Topical />} />
                <Route path="/bookerinfo" element={<BookerInfo />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/gameBuddy" element={<GameBuddy />} />
                <Route path="/hallSeriesStaff" element={<HallSeriesStaff />} />
                <Route
                  path="/hallSeriesPlayers"
                  element={<HallSeriesPlayers />}
                />
                <Route path="/contacts" element={<Contacts />} />
                <Route exact path="/" element={<HomePage />} />
              </Routes>
            </Col>
          </div>
        </div>
      </div>

      <a href="#start" style={{ marginLeft: "50%" }}>
        <img src={arrowIcon} alt="arrow-north" />
      </a>
      <br />
      <br />

      <div className="row botton-style rainbow-color">
        <div className="col">
          <div className="row some-margin address-margin">
            <a
              style={{ textDecoration: "none" }}
              href="https://www.facebook.com/"
            >
              <h1 className="some1-style">f</h1>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.instagram.com/"
            >
              <h1 className="some2-style">in</h1>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="row some-margin">
            <h3 style={{ color: "white", fontSize: "20px" }}>Osoite:</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageView;
