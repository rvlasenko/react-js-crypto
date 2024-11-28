import { Layout } from 'antd'
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'
import AppContent from './components/layout/AppContent'

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}
