import React, { useState } from "react";
import '../FormCheckout/FormCheckout.css'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Swal from "sweetalert2";

function FormCheckout({ information }) {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!name || !phone || !email) {
      Swal.fire({
        icon: "error",
        title: "Completa tus datos",
        text: "Te falto algun dato por completar",
      });
    }else {
        information(
            name,
            phone,
            email
        )

        
    }
    setValidated(true);
  };

  return (
    <Form className="formm" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} md="8" controlId="validationCustom01">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="8" controlId="validationCustom02">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Teléfono"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="8" controlId="validationCustomUsername">
        <Form.Label>Email</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor introduzca su email
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button type="submit">Confirmar datos</Button>
    </Form>
  );
}

export default FormCheckout;
