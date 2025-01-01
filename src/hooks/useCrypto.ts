import { useContext } from 'react'
import CryptoContext from '../context/crypto-context'

export function useCrypto() {
  return useContext(CryptoContext)
}
