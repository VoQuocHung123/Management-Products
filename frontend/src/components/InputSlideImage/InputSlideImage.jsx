/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-tag-spacing */
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../Button/Button';

export default function InputSlideImage({
  item,
  index,
  handleSlideImage,
  handleDeleteImageSlide,
}) {
  return (
    <div className="group-content-image" key={index}>
      <label style={{ display: 'block' }}> Ảnh {index + 1}</label>
      <input
        type="file"
        id={`img-slide-${index}`}
        className="slide-image-item"
        onChange={(event) => handleSlideImage(event, index)}
      />
      {item && (
        <>
          <div className="image-item-container">
            <img src={item} alt="" className="img-slide-select" />
            <div className="action-slide-image">
              <Button
                className="btn-update-slideimg"
                title="Cập Nhật"
                onClick={() =>
                  document.querySelector(`#img-slide-${index}`).click()}
              />
              <Button
                className="btn-delete-slideimg"
                title="Xoá"
                onClick={() => handleDeleteImageSlide(index)}
              />
            </div>
          </div>
        </>
      )}
      {item === '' && (
        <label htmlFor={`img-slide-${index}`}>
          <div className="img-slide-select">
            <FaPlus />
          </div>
        </label>
      )}
    </div>
  );
}
