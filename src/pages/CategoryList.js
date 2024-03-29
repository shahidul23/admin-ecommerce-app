import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/category/categorySlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const columns = [
  {
    title: '#',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getCategories())
  },[dispatch]);

  const categoryState = useSelector((state) => state.category.categories)
  const Tabledata = [];
  if (Array.isArray(categoryState)) {
    for (let i = 0; i < categoryState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: categoryState[i].title,
        action: (<>
        <Link to="/" className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <Link to="/" className='text-danger fs-3'>
          <MdDeleteForever />
        </Link>
        </>)
      });
    }
  }
  return (
    <div>
      <h3 className='mb-4 title'>Brand List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default CategoryList
