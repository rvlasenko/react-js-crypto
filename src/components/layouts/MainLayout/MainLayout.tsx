import { Spin } from 'antd'
import CryptoContext from '@/context/crypto-context'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import * as S from './MainLayout.styles'
import { BaseLayout } from '@/components/common/BaseLayout/BaseLayout'
import MainSider from '../MainSider/MainSider'
import MainHeader from '../MainHeader/MainHeader'
import MainContent from '../MainContent/MainContent'

export default function MainLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <S.LayoutMaster>
      <MainSider />
      <BaseLayout>
        <MainHeader>123</MainHeader>
        <MainContent id="main-content">
          <Outlet />
        </MainContent>
      </BaseLayout>
    </S.LayoutMaster>
  )
}
