import { Layout, Card, Statistic, List, Typography } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { fetchAssets, fetchCrypto } from '../../utils/api'

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

export default function AppSider() {
  useEffect(() => {
    async function preload() {
      const { result } = await fetchCrypto()
      const assets = await fetchAssets()
    }
  }, [])

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  )
}
