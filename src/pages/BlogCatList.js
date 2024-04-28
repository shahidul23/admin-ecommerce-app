import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogCat, getBlogCats, resetState } from '../features/blogCat/blogCatSlice';
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
    title: 'Action',
    dataIndex: 'action',
  },
];
const BlogCatList = () => {
  const dispatch = useDispatch();
  const newBlogCat = useSelector((state) =>{
    return state.blogCat;
  });
  const { isError, isLoading, isSuccess,  deleteBlogCats} = newBlogCat;
  const [open, setOpen] = useState(false);
  const [blogCatId, setGBlogCat] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setGBlogCat(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
          <Link to={`/admin/blog-category/${blogCatState[i]._id}`} className='text-warning fs-3'>
            <BiEdit />
          </Link>
          <button 
          onClick={() => showModal(blogCatState[i]._id)} 
          className='text-danger fs-3 bg-transparent border-0' >
          <MdDeleteForever />
        </button>
          </>)
      });
    }
  } else {
    console.error("CustomerState is not an array or is undefined.");
  }
  const handleDelete = (id) =>{
    dispatch(deleteBlogCat(id))
    setOpen(false)
    setTimeout(() =>{
      dispatch(resetState())
      dispatch(getBlogCats())
    },100)
  }
  useEffect(() => {
    if (isSuccess && deleteBlogCats) {
      toast.success("blog Category Name has been Deleted successfully.", {
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
  }, [isError, isSuccess, isLoading, deleteBlogCats]);
  return (
    <div>
      <h3 className='mb-4 title'>Blog Category List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() => handleDelete(blogCatId)}
        title="Are you sure you want to delete this blog Category?"/>
    </div>
  )
}

export default BlogCatList
