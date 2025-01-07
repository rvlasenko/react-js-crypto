import { useState } from 'react'
import * as S from './MainSider.styles'
import SiderMenu from '@/components/layouts/SiderMenu/SiderMenu'

export default function MainSider() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <S.Sider
      width={250}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <SiderMenu />
    </S.Sider>
  )
}
