/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../Button/Button';
import './style.css';

export default function ProductCard({
  product,
  isProductManage,
  handleDelete,
  handleUpdate,
}) {
  return (
    <div className="card-container">
      <img
        className="image-card"
        src={`http://localhost:5000/${product.image}`}
        alt=""
      />
      <h5 className="title-card"> {product.name} </h5>
      {isProductManage ? (
        <div className="action-product">
          <Button
            className="action-update"
            title="Cập nhật"
            onClick={() => handleUpdate(product)}
          />
          <Button
            className="action-delete"
            title="Xoá"
            onClick={() => handleDelete(product)}
          />
        </div>
      ) : (
        <p className="price-card"> {`$ ${product.price}`} </p>
      )}
    </div>
  );
}
