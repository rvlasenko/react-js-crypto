import {
  Divider,
  Select,
  Space,
  Form,
  FormProps,
  InputNumber,
  Button,
  DatePicker,
  Result,
  DatePickerProps,
} from 'antd'
import { useRef, useState } from 'react'
import { useCrypto } from '../context/useCrypto'
import { ICoinStatsResult } from '../types/ICoinStats'
import CoinInfo from './CoinInfo'

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

export interface IOwnProps {
  onClose: () => void
}

export type IProps = IOwnProps

export default function AddAssetForm({ onClose }: IProps) {
  const [form] = Form.useForm()
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState<ICoinStatsResult>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const assetRef = useRef<Asset>()

  type FieldType = {
    amount: number
    price: number
    date: DatePickerProps['value']
    total: number
  }

  type Asset = {
    id: string
    amount: number
    price: number
    date: Date
  }

  if (isSubmitted) {
    return (
      <Result
        status="success"
        title="New asset has been added!"
        subTitle={`You have successfully added ${assetRef.current?.amount} of ${coin?.name} by price of $${assetRef.current?.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Select coin"
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    )
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const newAsset: Asset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.toDate() || new Date(),
    }

    console.log('Success:', values)
    console.log('newAsset:', newAsset)
    assetRef.current = newAsset
    setIsSubmitted(true)
    addAsset(newAsset)
  }

  const handleAmountChange = (value: number | null) => {
    if (!value) {
      return
    }

    const price = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  const handlePriceChange = (value: number | null) => {
    if (!value) {
      return
    }

    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      validateMessages={validateMessages}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amout"
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}
