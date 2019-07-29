import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'
import { Form } from 'antd'

import ProductDetailLayout from './components/Basic'

@withI18n()
@Form.create()
@connect(({ PostDetail }) => ({ PostDetail }))
class PostDetailView extends PureComponent {
  render() {
    const { PostDetail } = this.props
    console.log('application===', this.props)

    return (
      <Page inner>
        <div className={styles.content}>
          <ProductDetailLayout props={this.props} />
        </div>
      </Page>
    )
  }
}

PostDetailView.propTypes = {
  PostDetail: PropTypes.object,
}

//export default connect(({ adminviewCourse, loading }) => ({ adminviewCourse, loading }))(Form.create()(Genaral))
export default PostDetailView
