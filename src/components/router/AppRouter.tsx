import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import DashboardPage from '@/pages/DashboardPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
