export interface ICoinStatsResult {
  id: string
  icon: string
  name: string
  symbol: string
  rank: number
  price: number
  priceBtc: number
  volume: number
  marketCap: number
  availableSupply: number
  totalSupply: number
  priceChange1h: number
  priceChange1d: number
  priceChange1w: number
  redditUrl: string
  websiteUrl: string
  twitterUrl: string
  contractAddress?: string
  decimals?: number
  explorers: string[]
}

export interface ICoinStatsMeta {
  page: number
  limit: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface ICoinStats {
  result: ICoinStatsResult[]
  meta: ICoinStatsMeta
}
