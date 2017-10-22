import React from "react";
import {map} from "lodash";

import { FormControl, ControlLabel, FormGroup } from "react-bootstrap";

const Select = ({ meta: { touched, error }, input, label, options }) => (
  <div>
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" {...input}>
        {map(options, (o, i) => (
          <option key={i} value={o.value}>
            {o.label}
          </option>
        ))}
      </FormControl>
    </FormGroup>
    {touched && error ? <span className="error-text">{error}</span> : <div />}
  </div>
);

export default Select;
