export interface ICryptoAsset {
  id: string
  amount: number
  price: number
  date: Date
  totalAmount?: number
  totalProfit?: number
  name?: string
  grow?: boolean
  growPercent?: number
}
