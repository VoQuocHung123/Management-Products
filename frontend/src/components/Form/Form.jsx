/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  const [previewImage, setPreviewImage] = useState();
  const [dataEditProduct, setDataEditProduct] = useState({});
  const [imageTitle, setImageTitle] = useState('');
  const [error, setError] = useState('');
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ];
  const FILE_SIZE = 160 * 1024;
  const formik = useFormik({
    initialValues: {
      name: (name && name) || '',
      category: (category && category) || '',
      brand: (brand && brand) || '',
      price: (price && price) || '',
      description: (description && description) || '',
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nhập tên sản phẩm'),
      category: Yup.string().required('Chọn danh mục sản phẩm'),
      brand: Yup.string().required('Chọn hãng sản xuất'),
      price: Yup.number()
        .typeError('Giá phải là số')
        .positive('phải là số dương')
        .required('Nhập giá sản phẩm')
        .max(1000000000, 'Nhập giá dưới 1000000000$')
        .min(10000, 'Nhập giá trên 10000'),
      description: Yup.string().max(500, 'Nhập mô tả dưới 500 kí tự'),
      image: Yup.mixed()
        .required('Nhập vào hình ảnh')
        .test(
          'fileSize',
          'file quá lớn',
          (value) => value && value.size <= FILE_SIZE,
        )
        .test(
          'fileformat',
          'file không được hỗ trợ',
          (value) => value && SUPPORTED_FORMATS.includes(value.type),
        ),
    }),
    onSubmit: (values) => {
      if (isUpdate && dataEditProduct) {
        updateProduct(values);
      } else {
        // addNewProduct({ ...values, image: imageTitle });
        addNewProduct({ ...values });
      }
    },
  });
  useEffect(() => {
    setDataEditProduct(dataUpdateProduct);
  }, [dataUpdateProduct]);
  console.log(formik.errors.image);
  // const handleChangeValue = (e) => {
  //   const { id, value } = e.target;
  //   setDataEditProduct({ ...dataEditProduct, [id]: value });
  //   handleDataForm({ ...dataEditProduct, [id]: value });
  // };
  const handleChangeCategory = (e) => {
    const data = categoryList.find((cate) => cate.name === e.target.value);
    setBrandsList(data?.brands);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg')
    ) {
      setPreviewImage(URL.createObjectURL(file));
      setDataEditProduct({ ...dataEditProduct, image: file });
      handleDataForm({ ...dataEditProduct, image: file });
      setImageTitle(file);
      setError('');
    } else {
      setError('Vui lòng chọn ảnh');
      setPreviewImage('');
    }
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group" style={{ marginTop: 0 }}>
          <InputField
            title="Tên Sản Phẩm"
            id="name"
            name="name"
            value={formik.values.name}
            handleChangeValue={formik.handleChange}
            setErrors={
              formik.errors.name && formik.touched.name && formik.errors.name
            }
          />
        </div>
        <div className="form-group">
          <SelectField
            title="Danh Mục Sản Phẩm"
            id="category"
            name="category"
            handleChangeValue={formik.handleChange}
            handleChangeCategory={handleChangeCategory}
            value={formik.values.category}
            content={dataUpdateProduct ? category : 'Chọn danh mục sản phẩm'}
            optionCate={categoryList}
            setErrors={
              formik.errors.category &&
              formik.touched.category &&
              formik.errors.category
            }
          />
        </div>
        <div className="form-group">
          <SelectField
            title="Hãng Sản Xuất"
            id="brand"
            name="brand"
            handleChangeValue={formik.handleChange}
            value={formik.values.brand}
            content={dataUpdateProduct ? brand : 'Chọn hãng sản xuất '}
            optionBrand={brandsList}
            setErrors={
              formik.errors.brand && formik.touched.brand && formik.errors.brand
            }
          />
        </div>
        <div className="form-group">
          <InputField
            title="Giá"
            id="price"
            name="price"
            value={formik.values.price}
            handleChangeValue={formik.handleChange}
            setErrors={
              formik.errors.price && formik.touched.price && formik.errors.price
            }
          />
        </div>
        <div className="form-group">
          <TextArea
            title="Mô Tả"
            id="description"
            name="description"
            value={formik.values.description}
            handleChangeValue={formik.handleChange}
            setErrors={
              formik.errors.description &&
              formik.touched.description &&
              formik.errors.description
            }
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
              name="img"
              style={{ display: 'none' }}
              accept="image/*"
              // onChange={handleImage}
              onChange={(e) => {
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                formik.setFieldValue('image', e.target.files[0]);
              }}
            />
            {/* <p className="msg-err">{error}</p> */}
            <p className="msg-err">
              {formik.errors.image &&
                formik.touched.image &&
                formik.errors.image}
            </p>
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
            type="submit"
            // onClick={
            //   isUpdate && dataEditProduct ? updateProduct : addNewProduct
            // }
          />
        </div>
      </form>
    </div>
  );
}
