import React from "react";
import { Image } from "react-bootstrap";
import Image2 from "../images/topical-page_2.jpg";

import arrowDown from "../images/arrow-down.png";

const CollapceContents = () => {
  return (
    <div className="row">
      <div className="container paragraph-style2" id="accordionExample">
        <h5>
          Aikuisten tenniksen alkeiskurssit 2022
          <button
            type="button"
            className="btn"
            data-toggle="collapse"
            data-target="#collapse-1"
            aria-expanded="true"
          >
            <img src={arrowDown} alt="arrow-down" />
          </button>
        </h5>

        <div
          id="collapse-1"
          className="collapse show"
          data-parent="#accordionExample"
        >
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
          skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
          single-origin coffee nulla assumenda shoreditch et. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
          occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
          you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
        <hr />

        <h5>
          Kevään 2022 hallisarja käynnistyy taas!
          <button
            type="button"
            className="btn"
            data-toggle="collapse"
            data-target="#collapse-2"
            aria-expanded="false"
          >
            <img src={arrowDown} alt="arrow-down" />
          </button>
        </h5>
        <div
          id="collapse-2"
          className="collapse"
          data-parent="#accordionExample"
        >
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
          skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
          single-origin coffee nulla assumenda shoreditch et. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
          occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
          you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
        <hr />

        <h5>
          Tule talkoisiin 24.1.2022
          <button
            type="button"
            className="btn"
            data-toggle="collapse"
            data-target="#collapse-3"
            aria-expanded="false"
          >
            <img src={arrowDown} alt="arrow-down" />
          </button>
        </h5>
        <div
          id="collapse-3"
          className="collapse"
          data-parent="#accordionExample"
        >
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
          skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
          single-origin coffee nulla assumenda shoreditch et. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
          occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
          you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
        <hr />

        <h5>
          Joulukoon kinkunsulatusta kisaille!
          <button
            type="button"
            className="btn"
            data-toggle="collapse"
            data-target="#collapse-4"
            aria-expanded="false"
          >
            <img src={arrowDown} alt="arrow-down" />
          </button>
        </h5>
        <div
          id="collapse-4"
          className="collapse"
          data-parent="#accordionExample"
        >
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
          skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
          single-origin coffee nulla assumenda shoreditch et. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
          sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
          occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
          you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
        <hr />
      </div>
    </div>
  );
};

function Topical() {
  return (
    <div>
      <h1 className="title-style2">Ajankohtaista asiaa:</h1>
      <p className="paragraph-style1"></p>

      <CollapceContents />
      <Image
        alt="etusivun kuva"
        src={Image2}
        style={{ width: "100%" }}
        className=" img-fluid center"
      />
      <p className="paragraph-style2"></p>
    </div>
  );
}

export default Topical;
