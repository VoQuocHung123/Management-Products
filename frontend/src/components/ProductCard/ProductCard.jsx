/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  handleShowDetail,
}) {
  return (
    <div className="card-container" onClick={() => handleShowDetail(product)}>
      <img
        className="image-card"
        src={`http://localhost:5000/${product.image}`}
        alt=""
      />
      <h4 className="title-card"> {product.name} </h4>
      {isProductManage ? (
        <div className="action-product">
          <Button
            className="action-update"
            title="Cập nhật"
            onClick={(e) => handleUpdate(product, e)}
          />
          <Button
            className="action-delete"
            title="Xoá"
            onClick={(e) => handleDelete(product, e)}
          />
        </div>
      ) : (
        <p className="price-card"> {`$ ${product.price}`} </p>
      )}
    </div>
  );
}
