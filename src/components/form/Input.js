import React from "react";

import { FormControl } from "react-bootstrap";

const Input = ({ meta: { touched, error }, input, placeholder }) => (
  <div>
    <FormControl {...input} type="text" placeholder={placeholder} />
    {touched && error ? <span className="error-text">{error}</span> : <div />}
  </div>
);

export default Input;
