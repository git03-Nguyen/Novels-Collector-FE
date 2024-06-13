import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilLibrary,
  cilDataTransferDown
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tổng quan',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Quản lý nguồn truyện',
    to: '/admin/sourcemanagement',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý nguồn xuất bản',
    to: '/admin/exportermanagement',
    icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý tài khoản',
    to: '/admin/accountmanagement',
    icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
  },

]

export default _nav
