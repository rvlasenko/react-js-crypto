import { Link, useLocation } from 'react-router-dom'
import * as S from './SiderMenu.styles'
import { sidebarNavigation } from '@/constants/sidebarNavigation'
import { ISidebarNavigationItem } from '@/interfaces/ISidebarNavigationItem'

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: ISidebarNavigationItem[], current) =>
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
    <S.Menu
      mode="inline"
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
