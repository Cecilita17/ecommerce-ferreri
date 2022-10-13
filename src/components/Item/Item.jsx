import React from "react";
import "../Item/Item.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Item = ({ title, description, price, url, id }) => {
  return (
    <Card style={{ width: "19rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Link to={`/item/${id}`}><Button variant="primary">Ver detalle</Button></Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
