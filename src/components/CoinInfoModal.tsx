import { Divider, Tag, Typography } from 'antd'
import { ICoinStatsResult } from '../interfaces/ICoinStats'
import CoinInfo from './CoinInfo'

export interface IOwnProps {
  coin: ICoinStatsResult
}

export type IProps = IOwnProps

export default function CoinInfoModal({ coin }: IProps) {
  return (
    <>
      <CoinInfo coin={coin} isShowSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>$
        {coin.price.toFixed(2)}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market capitalization: </Typography.Text>
        {coin.marketCap}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Contract address: </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>
    </>
  )
}
