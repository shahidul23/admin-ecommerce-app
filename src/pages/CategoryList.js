import React from 'react'
import { Table } from 'antd';

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
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const Tabledata = [];
  for (let i = 0; i < 46; i++) {
    Tabledata.push({
      key: i+1,
      name: `Edward King ${i+1}`,
      product: 32,
      status: `London, Park Lane no. ${i+1}`,
    });
  }  

const CategoryList = () => {
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