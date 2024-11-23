import React from 'react'
import { Layout } from 'antd'

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100% - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

export default function App() {
  return (
    <Layout>
      <Layout.Header style={headerStyle}>Header</Layout.Header>
      <Layout>
        <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
        <Layout.Content style={contentStyle}>Content</Layout.Content>
      </Layout>
    </Layout>
  )
}
