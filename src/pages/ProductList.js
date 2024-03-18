import React, { useEffect } from 'react'
import { Table } from 'antd';
import { getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const ProductList = () => {
 
  const  dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch]);

  const productState = useSelector((state) => state.product.products.Products);
  const Tabledata = [];
  if (Array.isArray(productState)) {
    for (let i = 0; i < productState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: productState[i].title,
        code: productState[i].code,
        price : productState[i].price,
        category: productState[i].category,
        brand:  productState[i].brand,
        quantity: productState[i].quantity,
        action: (<>
          <Link to="/" className='fs-3 text-danger'>
            <BiEdit />
          </Link>
          <Link to="/" className='fs-3 text-danger ms-2'> 
            <MdDeleteForever />
          </Link>
        </>
        )
      });
    }
  }
  
  return (
    <div>
      <h3 className='mb-4 title'>Product List</h3>
      <Table columns={columns} dataSource={Tabledata} />
    </div>
  )
}

export default ProductList
