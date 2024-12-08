import { createContext, useContext, useEffect, useState } from 'react'
import { ICoinStatsResult } from '../types/ICoinStats'
import { ICryptoAsset } from '../types/ICryptoAsset'
import { fetchAssets, fetchCrypto } from '../utils/api'
import { percentDifference } from '../utils/percentDifference'

export interface ICryptoContext {
  assets: ICryptoAsset[]
  crypto: ICoinStatsResult[]
  loading: boolean
  addAsset: (asset: ICryptoAsset) => void
}

export interface IOwnProps {
  children: React.ReactNode
}

export type IProps = IOwnProps

const CryptoContext = createContext<ICryptoContext>({
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
})

export function CryptoContextProvider({ children }: IOwnProps) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState<ICoinStatsResult[]>([])
  const [assets, setAssets] = useState<ICryptoAsset[]>([])

  const mapAssets = (assets: ICryptoAsset[], result: ICoinStatsResult[]) => {
    return assets.map((asset) => {
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
  }

  useEffect(() => {
    const preload = async () => {
      setLoading(true)
      const { result } = await fetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  const addAsset = (asset: ICryptoAsset) => {
    setAssets((prev) => mapAssets([...prev, asset], crypto))
  }

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
