import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fetchAssets, fetchCrypto } from '../../utils/api'
import { ICryptoAsset } from '../../types/ICryptoAsset'
import { ICoinStatsResult } from '../../types/ICoinStats'
import { percentDifference } from '../../utils/percentDifference'
import { capitalize } from '../../utils/capitalize'

const siderStyle: React.CSSProperties = {
  padding: '1rem',
}

export default function AppSider() {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState<ICoinStatsResult[]>([])
  const [assets, setAssets] = useState<ICryptoAsset[]>([])

  type DataSource = {
    title: string
    value: number
    prefix: string | null
    isPlain: boolean
    hasTag: boolean
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fetchCrypto()
      const assets = await fetchAssets()

      setAssets(
        assets.map((asset) => {
          const coin = result.find((coin) => coin.id === asset.id)

          if (!coin) {
            return asset
          }

          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * (coin.price - asset.price),
            ...asset,
          }
        })
      )
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

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
