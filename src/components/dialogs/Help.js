import React from "react";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import { Carousel } from "react-bootstrap";

import DialogContainer from "./DialogContainer";

import image from "../../res/img/image.png";

const helpData = [
  { title: "Nadpis nápovědy", text: "Text nápovědy.", image },
  { title: "Nadpis další nápovědy", text: "Text další nápovědy.", image }
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
            <img width="100%" height="auto" src={item.image} />
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
