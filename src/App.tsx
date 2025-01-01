import { ConfigProvider } from 'antd'
import { CryptoContextProvider } from './context/crypto-context'
import { AppRouter } from './components/router/AppRouter'

export default function App() {
  return (
    <CryptoContextProvider>
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider>
    </CryptoContextProvider>
  )
}
