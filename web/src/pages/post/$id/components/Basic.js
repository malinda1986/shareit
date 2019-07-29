import React from 'react'
import { Row, Col, Input, Select, Form, Tabs } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

const Basic = ({ props }) => {
  console.log('props====', props)
  const { form } = props

  const { getFieldDecorator } = form

  return (
    <Row gutter={12}>
      <Col md={24} lg={24}>
        <Row>
          <Col md={24} lg={24}>
            <p>School name</p>
          </Col>
          <Col md={24} lg={24}>
            <FormItem>
              {getFieldDecorator('    ', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Please enter the school name!',
                  },
                ],
              })(<Input size="large" placeholder="School Name" />)}
            </FormItem>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
export default Basic
