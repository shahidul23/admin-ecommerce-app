import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogsSlice';
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBlogs())
  },[dispatch]);
  const blogState = useSelector((state)=> state.blog.blogs);
  const Tabledata = [];

if (Array.isArray(blogState)) {
  for (let i = 0; i < blogState.length; i++) {
    Tabledata.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
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
      <h3 className='mb-4 title'>Blog List</h3>
      <Table columns={columns} dataSource={Tabledata} />
    </div>
  )
}

export default BlogList
