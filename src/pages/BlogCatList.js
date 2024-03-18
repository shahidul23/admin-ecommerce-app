import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogCats } from '../features/blogCat/blogCatSlice';
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
const BlogCatList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBlogCats())
  },[dispatch]);
  const blogCatState = useSelector((state) => state.blogCat.blogsCat);
  const Tabledata = [];

  if (Array.isArray(blogCatState)) {
    for (let i = 0; i < blogCatState.length; i++) {
      Tabledata.push({
        key: i + 1,
        name: blogCatState[i].title,
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
  } else {
    console.error("CustomerState is not an array or is undefined.");
  }
  return (
    <div>
      <h3 className='mb-4 title'>Blog Category List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default BlogCatList
