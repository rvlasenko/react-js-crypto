import { HomeOutlined } from '@ant-design/icons'
import { ISidebarNavigationItem } from '@/interfaces/ISidebarNavigationItem'

export const sidebarNavigation: ISidebarNavigationItem[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: '/',
    icon: <HomeOutlined />,
  },
]
