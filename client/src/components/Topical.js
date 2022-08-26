import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import Image2 from "../images/topical-page_2.jpg";
import arrowDown from "../images/arrow-down.png";
import tennisappDatabase from "../services/tennisappDatabase";
import { useSelector, useDispatch } from "react-redux";

const CollapceContents = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.topical);

  useEffect(() => {
    tennisappDatabase.getTopicalIssues().then((initialIssues) => {
      initialIssues.forEach((issue) => {
        dispatch({
          type: "topical/allTopicals",
          payload: issue,
        });
      });
    });
  }, [dispatch]);

  return (
    <div className="container paragraph-style1">
      <div id="accordion">
        {issues.map((i, index) => (
          <div key={index}>
            <h5>
              {i.title}
              <button
                type="button"
                className="btn"
                data-toggle="collapse"
                data-target={`#collapse-${index}`}
                aria-expanded="false"
              >
                <img name={index} src={arrowDown} alt="nuoli alaspäin" />
              </button>
            </h5>

            <div
              id={`collapse-${index}`}
              className="collapse"
              data-parent="#accordion"
            >
              {i.message}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

function Topical() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="title-style">Ajankohtaista asiaa:</h1>
      <CollapceContents />
      <Image
        alt="etusivun kuva"
        src={Image2}
        style={{ width: "100%" }}
        className="img-fluid image-style2"
      />
    </div>
  );
}

export default Topical;
