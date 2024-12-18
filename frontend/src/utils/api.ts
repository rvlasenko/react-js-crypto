import { cryptoAssets } from '../data'
import { ICoinStats } from '../types/ICoinStats'
import { ICryptoAsset } from '../types/ICryptoAsset'
import { fetchWrapper, IDataResponse } from './fetch'

export async function fetchCrypto(): Promise<IDataResponse<ICoinStats>> {
  const response = await fetchWrapper<ICoinStats>(
    'https://openapiv1.coinstats.app/coins',
    {
      method: 'GET',
      headers: {
        'x-api-key': import.meta.env.VITE_COINSTATS_API_KEY,
      },
    }
  )

  if (!response.ok) {
    return response
  }

  return {
    ...response,
    body: {
      ...response.body,
    },
  }
}

export function fetchAssets(): Promise<ICryptoAsset[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets as ICryptoAsset[]) // Ensure cryptoAssets matches ICryptoAsset[]
    }, 1000)
  })
}
