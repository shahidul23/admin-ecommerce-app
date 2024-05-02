import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/blogsSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
  const [open, setOpen] = useState(false);
  const [ blogId, setBlogId ] = useState("");
  const newBlog = useSelector(state => state.blog);
  const { isError, isLoading, isSuccess,  deleteBlogs} = newBlog;
  const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(()=>{
    dispatch(resetState())
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
        <Link to={`/admin/blog/${blogState[i]._id}`} className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <button 
          onClick={() => showModal(blogState[i]._id)} 
          className='text-danger fs-3 bg-transparent border-0' >
          <MdDeleteForever />
        </button>
        </>)
    });
  }
} else {
  console.error("CustomerState is not an array or is undefined.");
}
  const handleDelete = (id) => {
    dispatch(deleteBlog(blogId));
    setOpen(false);
    setTimeout(() =>{
      dispatch(resetState())
      dispatch(getBlogs());
    }, 100)
  }
  useEffect(() => {
    if (isSuccess && deleteBlogs) {
      toast.success("Blog has been Deleted successfully.", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isError) {
      toast.error('Something went wrong! Please try again later', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, isSuccess, isLoading, deleteBlogs]);
  return (
    <div>
      <h3 className='mb-4 title'>Blog List</h3>
      <Table columns={columns} dataSource={Tabledata} />
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() => handleDelete(blogId)}
        title="Are you sure you want to delete this Blog?"/>
    </div>
  )
}

export default BlogList
