import { BaseLayout } from '@/components/common/BaseLayout/BaseLayout'
import styled from 'styled-components'

export const Header = styled(BaseLayout.Header)<{ $bgColor: string }>`
  padding: 0;
  background: ${(props) => props.$bgColor};
`
