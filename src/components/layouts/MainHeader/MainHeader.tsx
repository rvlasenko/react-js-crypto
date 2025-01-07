import { WithChildrenProps } from '@/types/WithChildrenProps'
import * as S from './MainHeader.styles'

export default function MainHeader({ children }: WithChildrenProps) {
  return <S.Header>{children}</S.Header>
}
