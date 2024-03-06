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
const Oder = () => {
  return (
    <div>
      <h3 className='mb-4'>Orders</h3>
      <Table columns={columns} dataSource={Tabledata} />
    </div>
  )
}

export default Oder
