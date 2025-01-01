import { WithChildrenProps } from '@/types/WithChildrenProps'
import * as S from './MainHeader.styles'
import { theme } from 'antd'

export default function MainHeader({ children }: WithChildrenProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return <S.Header $bgColor={colorBgContainer}>{children}</S.Header>
}
