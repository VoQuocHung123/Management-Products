/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import TextArea from '../TextArea/TextArea';
import './style.css';

export default function Form({
  categoryList,
  handleDataForm,
  addNewProduct,
  isUpdate,
  dataUpdateProduct,
  updateProduct,
}) {
  // eslint-disable-next-line object-curly-newline
  const { name, category, brand, description, price } = dataUpdateProduct || {};
  const [brandsList, setBrandsList] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [dataEditProduct, setDataEditProduct] = useState({});
  useEffect(() => {
    setDataEditProduct(dataUpdateProduct);
  }, [dataUpdateProduct]);

  const handleChangeValue = (e) => {
    const { id, value } = e.target;
    setDataEditProduct({ ...dataEditProduct, [id]: value });
    handleDataForm({ ...dataEditProduct, [id]: value });
  };
  const handleChangeCategory = (e) => {
    const data = categoryList.find((cate) => cate.name === e.target.value);
    setBrandsList(data.brands);
    handleChangeValue(e);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setDataEditProduct({ ...dataEditProduct, image: file });
    handleDataForm({ ...dataEditProduct, image: file });
  };
  return (
    <div>
      <form>
        <div className="form-group" style={{ marginTop: 0 }}>
          <InputField
            title="Tên Sản Phẩm"
            id="name"
            value={dataEditProduct?.name}
            handleChangeValue={handleChangeValue}
          />
        </div>
        <div className="form-group">
          <SelectField
            title="Danh Mục Sản Phẩm"
            id="category"
            handleChange={handleChangeCategory}
            value={dataUpdateProduct ? category : ''}
            content={dataUpdateProduct ? category : 'Chọn danh mục sản phẩm'}
            optionCate={categoryList}
          />
        </div>
        <div className="form-group">
          <SelectField
            title="Hãng Sản Xuất"
            id="brand"
            handleChange={handleChangeValue}
            value={dataUpdateProduct ? brand : ''}
            content={dataUpdateProduct ? brand : 'Chọn hãng sản xuất '}
            optionBrand={brandsList}
          />
        </div>
        <div className="form-group">
          <InputField
            title="Giá"
            id="price"
            value={dataEditProduct?.price}
            handleChangeValue={handleChangeValue}
          />
        </div>
        <div className="form-group">
          <TextArea
            title="Mô Tả"
            id="description"
            value={dataEditProduct?.description}
            handleChangeValue={handleChangeValue}
          />
        </div>
        {isUpdate ? (
          ''
        ) : (
          <div className="form-group">
            <label
              htmlFor="img"
              style={{ color: '#6ECB63', cursor: 'pointer' }}
            >
              Thêm ảnh minh hoạ
            </label>
            <span style={{ color: 'red' }}> * </span>
            <input
              type="file"
              className="form-input"
              id="img"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
          </div>
        )}
        <div className="preview-image">
          <img
            src={previewImage}
            alt=""
            width={100}
            style={{ marginBottom: 30 }}
          />
        </div>
        <div className="action-form">
          <Button className="btn-cancel-form" title="Huỷ" />
          <Button
            className="btn-add-form"
            title="Thêm"
            onClick={
              isUpdate && dataEditProduct ? updateProduct : addNewProduct
            }
          />
        </div>
      </form>
    </div>
  );
}
