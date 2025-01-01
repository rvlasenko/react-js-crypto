import { Layout, Typography } from 'antd'
import { useCrypto } from '@/hooks/useCrypto'
import PortfolioChart from '@/components/layout/PortfolioChart'
import AssetsTable from '@/components/layout/AssetsTable'

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

export default function DashboardPage() {
  const { assets, crypto } = useCrypto()

  type Accumulator = { [key: string]: number }

  const cryptoPriceMap = crypto.reduce((acc: Accumulator, coin) => {
    acc[coin.id] = coin.price
    return acc
  }, {})

  const total = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    .reduce((acc, cur) => acc + cur, 0)

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: '#fff', textAlign: 'left' }}>
        Current portfolio: ${total.toFixed(2)}
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}
