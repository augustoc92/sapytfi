import React from 'react'
import { Form } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
}

const makeField = (Component) => {
  const EnhancedComponent = ({
    input, meta, ...rest
  }) => {
    const hasError = meta.touched && meta.invalid
    return (
      <FormItem
        {...formItemLayout}
        validateStatus={hasError ? 'error' : 'success'}
        help={hasError && meta.error}
      >
        <Component
          {...input}
          {...rest}
        />
      </FormItem>
    )
  }

  EnhancedComponent.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  }

  return EnhancedComponent
}

makeField.propTypes = {
  Component: PropTypes.object,
}

export { FormItem, makeField, tailFormItemLayout }