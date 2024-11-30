export interface ICryptoAsset {
  id: string
  amount: number
  price: number
  date: Date
  totalAmount?: number
  totalProfit?: number
  grow?: boolean
  growPercent?: number
}
