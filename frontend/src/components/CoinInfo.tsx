import { Flex, Typography } from 'antd'
import { ICoinStatsResult } from '../types/ICoinStats'

export interface IOwnProps {
  coin: ICoinStatsResult
  isShowSymbol?: boolean
}

export type IProps = IOwnProps

export default function CoinInfo({ coin, isShowSymbol }: IProps) {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 40, marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {isShowSymbol && <>({coin.symbol})</>} {coin.name}
      </Typography.Title>
    </Flex>
  )
}
