import { useContext } from 'react'
import CryptoContext from './crypto-context'

export function useCrypto() {
  return useContext(CryptoContext)
}
