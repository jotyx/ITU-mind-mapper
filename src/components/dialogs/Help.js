import React from "react";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import { Carousel } from "react-bootstrap";
import classNames from "classnames";

import DialogContainer from "./DialogContainer";

import help1 from "../../res/img/help1.png";
import help2 from "../../res/img/help2.png";
import help3 from "../../res/img/help3.png";
import help4 from "../../res/img/help4.png";
import help5 from "../../res/img/help5.png";

const helpData = [
  {
    title: "Otevřené mapy",
    text:
      "Mezi mapami lze libovolně přepínat a pracovat tedy na více mapách zároveň.",
    image: help1
  },
  { title: "Menu pro práci s právě upravovanou mapou", text: "", image: help2 },
  { title: "Menu pro práci s aktivním uzlem", text: "", image: help3 },
  { title: "Uzly aktivní mapy", text: "", image: help4 },
  { title: "PopUp s formulářem", text: "", image: help5 }
];

const Help = ({ handleSubmit, data, showLabel, setShowLabel }) => (
  <DialogContainer
    title="Nápověda"
    name="Help"
    handleSubmit={handleSubmit}
    submitLabel="OK"
  >
    <div
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <Carousel interval={null} indicators={false} controls={showLabel}>
        {map(helpData, (item, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              height="auto"
              alt=""
              src={item.image}
              className={classNames({ transparent: showLabel })}
            />
            {showLabel && (
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  </DialogContainer>
);

export default compose(
  withRouter,
  withState("showLabel", "setShowLabel", false),
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "helpDialogForm"
  })
)(Help);
