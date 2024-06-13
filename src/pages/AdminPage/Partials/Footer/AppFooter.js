import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">Quản trị &copy;  <strong>Novel Collector</strong> </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Phát triển bởi &copy;</span>
        <strong>Nhóm 12</strong>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
