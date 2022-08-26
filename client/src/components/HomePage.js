import React from "react";
import Image1 from "../images/home-page2.jpg";
import Image from "react-bootstrap/Image";

function HomePage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="title-style">Tervetuloa Turun tennisklubin sivuille!</h1>
      <div className="paragraph-style1">
        <p>
          Sed nibh nunc, commodo eget laoreet ut, fermentum at sem. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Sed ac ex sit amet erat interdum molestie. Proin
          vehicula eleifend dolor, elementum gravida tortor maximus a.
          Suspendisse fringilla tincidunt odio ac volutpat. Aliquam iaculis nibh
          id mauris ornare sodales. Donec ut arcu at elit consequat sodales id
          quis metus. Morbi dapibus egestas lorem, sit amet tempus lacus dictum
          sed. Pellentesque maximus, arcu eget aliquet euismod, erat nisl tempor
          diam, euismod lacinia velit orci eu enim. Vestibulum vulputate congue
          aliquam.
        </p>
        <p>
          Sed nibh nunc, commodo eget laoreet ut, fermentum at sem. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Sed ac ex sit amet erat interdum molestie. Proin
          vehicula eleifend dolor, elementum gravida tortor maximus a.
          Suspendisse fringilla tincidunt odio ac volutpat. Aliquam iaculis nibh
          id mauris ornare sodales. Donec ut arcu at elit consequat sodales id
          quis metus. Morbi dapibus egestas lorem, sit amet tempus lacus dictum
          sed. Pellentesque maximus, arcu eget aliquet euismod, erat nisl tempor
          diam, euismod lacinia velit orci eu enim. Vestibulum vulputate congue
          aliquam.
        </p>
      </div>
      <Image
        alt="etusivun kuva"
        src={Image1}
        className="img-fluid image-style2"
      />
    </div>
  );
}

export default HomePage;
