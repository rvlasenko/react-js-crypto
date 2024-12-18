import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useCrypto } from '../../context/useCrypto'

interface DataType {
  key: React.Key
  name: string
  price: number
  amount: number
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
]

export default function AssetsTable() {
  const { assets } = useCrypto()

  const data: DataType[] = assets.map((asset) => ({
    key: asset.id,
    name: asset.name ? asset.name : asset.id,
    price: asset.price,
    amount: asset.amount,
  }))

  return (
    <div>
      <Table<DataType> pagination={false} columns={columns} dataSource={data} />
    </div>
  )
}
