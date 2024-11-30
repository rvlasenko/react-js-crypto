import { cryptoAssets, cryptoData } from '../data'
import { ICoinStats } from '../types/ICoinStats'
import { ICryptoAsset } from '../types/ICryptoAsset'

export function fetchCrypto(): Promise<ICoinStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData as ICoinStats) // Ensure cryptoData matches ICoinStats
    }, 100)
  })
}

export function fetchAssets(): Promise<ICryptoAsset[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets as ICryptoAsset[]) // Ensure cryptoAssets matches ICryptoAsset[]
    }, 100)
  })
}
