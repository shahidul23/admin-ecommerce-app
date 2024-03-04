import React, { useState } from 'react';
import { AiTwotoneDashboard } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegListAlt, FaBloggerB  } from "react-icons/fa";
import { MdOutlineBrandingWatermark, MdOutlineCategory, MdOutlineFeedback  } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { TbCategory } from "react-icons/tb";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Dashboard from '../pages/Dashboard';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0 gp-10'>
            <span className='sm-logo'>DC</span>
            <span className='lg-logo'>Dev Corner</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({key}) =>{
            if (key === "logout") {
              
            }else{
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiTwotoneDashboard  className='fs-4'/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FaRegUser  className='fs-5'/>,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <IoCartOutline  className='fs-5'/>,
              label: 'Catalogs',
              children:[
                {
                  key:'product',
                  icon:<IoCartOutline className='fs-5'/>,
                  label:"Add Product"
                },
                {
                  key:'product-list',
                  icon:<CiCircleList  className='fs-5'/>,
                  label:"Products List"
                },
                {
                  key:'brand',
                  icon:<MdOutlineBrandingWatermark className='fs-5'/>,
                  label:"Brands"
                },
                {
                  key:'brand-list',
                  icon:<CiCircleList className='fs-5'/>,
                  label:"Brands List"
                },
                {
                  key:'category',
                  icon:<TbCategory className='fs-5'/>,
                  label:"Category"
                },
                {
                  key:'category-list',
                  icon:<CiCircleList className='fs-5'/>,
                  label:"Category List"
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaRegListAlt  className='fs-6'/>,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBloggerB  className='fs-5'/>,
              label: 'Blogs',
              children:[
                {
                  key:'blog',
                  icon: <FaBloggerB  className='fs-5'/>,
                  label:'Add Blogs'
                },
                {
                  key:'blog-list',
                  icon: <CiCircleList  className='fs-5'/>,
                  label:'Blogs List'
                },
                {
                  key:'blog-category',
                  icon: <MdOutlineCategory  className='fs-5'/>,
                  label:'Add Blog Category'
                },
                {
                  key:'blog-category-list',
                  icon: <CiCircleList  className='fs-5'/>,
                  label:'Blogs Category  List'
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <MdOutlineFeedback  className='fs-5'/>,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
