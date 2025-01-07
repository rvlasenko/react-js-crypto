import React from 'react'

export interface ISidebarNavigationItem {
  title: string
  key: string
  url?: string
  children?: ISidebarNavigationItem[]
  icon?: React.ReactNode
}
