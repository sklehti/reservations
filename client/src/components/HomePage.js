import React from "react";
import Image2 from "../images/home-page2.jpg";

import Image from "react-bootstrap/Image";

function HomePage() {
  return (
    <div>
      <h1 className="title-style2">Tervetuloa Turun Tennisklubin sivuille!</h1>
      <div>
        <p className="paragraph-style1">
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
        <p className="paragraph-style2">
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
        <Image
          alt="etusivun kuva"
          src={Image2}
          style={{ width: "100%" }}
          className=" img-fluid center"
        />
        <p className="paragraph-style2"></p>
      </div>
    </div>
  );
}

export default HomePage;
