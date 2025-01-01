import { BaseMenu } from '@/components/common/BaseMenu/BaseMenu'
import { Link, useLocation } from 'react-router-dom'
import { sidebarNavigation, SidebarNavigationItem } from './sidebarNavigation'

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(
      current.children && current.children.length > 0
        ? current.children
        : current
    ),
  []
)

export default function SiderMenu() {
  const location = useLocation()

  const currentMenuItem = sidebarNavFlat.find(
    ({ url }) => url === location.pathname
  )
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : []

  return (
    <BaseMenu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={defaultSelectedKeys}
      items={sidebarNavigation.map((nav) => {
        const isSubMenu = nav.children?.length

        return {
          key: nav.key,
          title: nav.title,
          label: isSubMenu ? (
            nav.title
          ) : (
            <Link to={nav.url || ''}>{nav.title}</Link>
          ),
          icon: nav.icon,
          children:
            isSubMenu &&
            nav.children &&
            nav.children.map((childNav) => ({
              key: childNav.key,
              label: <Link to={childNav.url || ''}>{childNav.title}</Link>,
              title: childNav.title,
            })),
        }
      })}
    />
  )
}
