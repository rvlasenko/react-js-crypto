import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils/capitalize'
import CryptoContext from '../../context/crypto-context'
import { useContext } from 'react'

export interface DataSource {
  title: string
  value: number
  prefix: string | null
  isPlain: boolean
  hasTag: boolean
}

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

export default function AppSider() {
  const { assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={
              [
                {
                  title: 'Total Profit',
                  value: asset.totalProfit,
                  prefix: '$',
                  isPlain: false,
                  hasTag: true,
                },
                {
                  title: 'Asset Amount',
                  value: asset.amount,
                  prefix: null,
                  isPlain: true,
                  hasTag: false,
                },
              ] as DataSource[]
            }
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>

                <span>
                  {item.hasTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.prefix} {item.value.toFixed(2)}
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
