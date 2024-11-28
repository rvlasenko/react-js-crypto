import { Layout } from 'antd'

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100% - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

export default function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>
}
