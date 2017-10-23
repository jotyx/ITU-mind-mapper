import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
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

const Help = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Nápověda"
    name="Help"
    handleSubmit={handleSubmit}
    submitLabel="OK"
  >
    <Carousel interval={null}>
      {map(helpData, (item, i) => (
        <Carousel.Item key={i}>
          <img width="100%" height="auto" src={item.image} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  </DialogContainer>
);

export default compose(
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "helpDialogForm"
  })
)(Help);
