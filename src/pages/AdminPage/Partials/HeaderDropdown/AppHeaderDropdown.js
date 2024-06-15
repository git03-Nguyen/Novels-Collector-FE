import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,

} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from '../../../../assets/images/avatars/admin_avatar.jpg'

import { UserContext } from '../../../../context/UserContext'

const AppHeaderDropdown = () => {

  const { logoutContext } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext();
    navigate('/');

  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Tài khoản</CDropdownHeader>
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
