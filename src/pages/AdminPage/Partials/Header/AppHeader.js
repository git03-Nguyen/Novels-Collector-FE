import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'

import AppBreadcrumb from '../BreadCrumb/AppBreadcrumb'
import AppHeaderDropdown from '../HeaderDropdown/AppHeaderDropdown'

const AppHeader = () => {

  return (
    <CHeader position="sticky" className="mb-4 p-0" >
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/admin/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavLink to="/admin/sourcemanagement" as={NavLink}>
            Quản lí nguồn
          </CNavLink>
          <CNavLink to="/admin/exportermanagement" as={NavLink}>
            Quản lý xuất bản
          </CNavLink>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
