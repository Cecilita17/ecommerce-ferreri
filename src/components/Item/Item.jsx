import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Item.css"

const Item = ({ title, description, price, url, id }) => {
  return (
    <Card className="itemStyles" >
      <Card.Img variant="top" src={url} />
      <Card.Body >
        <Card.Title className="card">{title}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Link to={`/item/${id}`}><Button variant="primary">Ver detalle</Button></Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
