import { ICryptoAsset } from './interfaces/ICryptoAsset'

export const cryptoAssets: ICryptoAsset[] = [
  {
    id: 'bitcoin',
    amount: 0.01,
    price: 26244,
    date: new Date('2021-01-01'),
  },
  {
    id: 'ethereum',
    amount: 1,
    price: 2400,
    date: new Date('2021-01-01'),
  },
]
