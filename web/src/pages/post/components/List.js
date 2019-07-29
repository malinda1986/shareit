import React, { PureComponent } from 'react'
import { Table } from 'antd'
import Link from 'umi/link'

import { withI18n } from '@lingui/react'
import { Ellipsis } from 'ant-design-pro'
import styles from './List.less'
import moment from 'moment'

@withI18n()
class List extends PureComponent {
  render() {
    const { i18n, ...tableProps } = this.props
    const columns = [
      {
        title: i18n.t`ID`,
        dataIndex: 'ProductId',
        render: (text, record) => {
          return <Link to={`post/${record.ProductId}`}>{text}</Link>
        },
      },
      {
        title: i18n.t`Name`,
        dataIndex: 'Name',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: i18n.t`Category`,
        dataIndex: 'Category',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },

      {
        title: i18n.t`Owner`,
        dataIndex: 'Owner',
      },
      {
        title: i18n.t`Type`,
        dataIndex: 'Type',
      },
      {
        title: i18n.t`Status`,
        dataIndex: 'Status',
      },
      {
        title: i18n.t`Available From`,
        dataIndex: 'AvailableFrom',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: i18n.t`Available To`,
        dataIndex: 'AvailableTo',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
