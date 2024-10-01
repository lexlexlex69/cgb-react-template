import React from 'react'
import {  Col, Label, Input, FormFeedback } from "reactstrap";

const BasicInputField = ({
  col,
  label,
  id,
  placeholder,
  validation,
  type,
  rows
}) => {
  return (
    <Col md={col}>
      <div className="mb-3">
        <Label className="form-label">{label}</Label>
        <Input
          rows={rows}
          id={id}
          name={id}
          className="form-control"
          placeholder={placeholder}
          type={type}
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values[id] || ""}
          invalid={
            validation.touched[id] && validation.errors[id] ? true : false
          }
        />
        {validation.touched[id] && validation.errors[id] ? (
          <FormFeedback type="invalid">{validation.errors[id]}</FormFeedback>
        ) : null}
      </div>
    </Col>
  )
}

export default BasicInputField