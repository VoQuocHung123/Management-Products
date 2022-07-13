/* eslint-disable no-unused-vars */
/* eslint-disable comma-spacing */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import Dropdown from '../Dropdown/Dropdown';
import './style.css';

export default function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [activeBrand, setActiveBrand] = useState();
  const [brandsList, setbrandsList] = useState(['Tất Cả']);
  useEffect(() => {
    const getCategory = async () => {
      const response = await productApi.getCategory();
      response.data.unshift({
        name: 'Tất Cả',
        brands: [],
      });
      setCategoryList(response.data);
    };
    getCategory();
  }, []);
  const handleChangeCategory = (value) => {
    if (activeCategory !== value.value) {
      const params = Object.fromEntries(searchParams);
      delete params.brand;
      if (value.name === 'Tất Cả') {
        setSearchParams({});
      } else {
        setSearchParams({ ...params, cate: value.name, page: 1 });
      }
      // value.brands.unshift('Tất Cả');
      setbrandsList(['Tất Cả', ...value.brands]);
      setActiveCategory(value.name);
      setActiveBrand('Tất Cả');
    }
  };
  const handleChangeBrand = (value) => {
    const params = Object.fromEntries(searchParams);
    if (value === 'Tất Cả') {
      setSearchParams({ ...params, brand: '' });
    } else {
      setSearchParams({ ...params, brand: value, page: 1 });
    }
    setActiveBrand(value);
  };
  return (
    <div className="sidebar-container">
      <Dropdown
        headerTitle="Danh Mục"
        options={categoryList}
        handleChangeValue={handleChangeCategory}
        active={activeCategory}
      />
      <hr
        style={{
          marginTop: 20,
          height: 1,
          backgroundColor: '#d9d9d978',
          border: 'none',
        }}
      />
      <Dropdown
        headerTitle="Hãng Sản Xuất"
        options={brandsList}
        handleChangeValue={handleChangeBrand}
        active={activeBrand}
      />
    </div>
  );
}
