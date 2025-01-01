import { BaseLayout } from '@/components/common/BaseLayout/BaseLayout'
import { useState } from 'react'
import SiderMenu from '@/components/layouts/SiderMenu/SiderMenu'

export default function MainSider() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BaseLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <SiderMenu />
    </BaseLayout.Sider>
  )
}
