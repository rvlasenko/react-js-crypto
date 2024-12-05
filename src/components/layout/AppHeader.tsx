import { Button, Layout, Select, Space, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useState, useEffect } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import { ICoinStatsResult } from '../../types/ICoinStats'
import AddAssetForm from '../AddAssetForm'

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
}

export default function AppHeader() {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
  const [coin, setCoin] = useState<ICoinStatsResult>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { crypto } = useCrypto()

  function handleSelect(value: string) {
    setIsModalOpen(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        setIsSelectOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 200 }}
        value="press / to open"
        open={isSelectOpen}
        onSelect={handleSelect}
        onClick={() => setIsSelectOpen((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Asset
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {coin && <CoinInfoModal coin={coin} />}
      </Modal>

      <Drawer
        title="Add Asset"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  )
}
