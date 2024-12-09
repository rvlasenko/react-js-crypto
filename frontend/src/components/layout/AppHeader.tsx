import { Button, Layout, Select, Space, Modal, Drawer } from 'antd'
import { useHotkeys } from 'react-hotkeys-hook'
import { useCrypto } from '../../context/crypto-context'
import { useRef, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import { ICoinStatsResult } from '../../types/ICoinStats'
import AddAssetForm from '../AddAssetForm'
import type { RefSelectProps } from 'antd'

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
  const [coin, setCoin] = useState<ICoinStatsResult>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { crypto } = useCrypto()
  const selectRef = useRef<RefSelectProps>(null)

  const handleSelect = (value: string) => {
    setIsModalOpen(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  useHotkeys('/', () => {
    selectRef.current?.focus()
  })

  return (
    <Layout.Header style={headerStyle}>
      <Select
        showSearch
        style={{ width: 200 }}
        value="Press / to search"
        ref={selectRef}
        onSelect={handleSelect}
        showAction={['focus']}
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
        destroyOnClose
        width={600}
      >
        <AddAssetForm onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </Layout.Header>
  )
}
