import React from 'react';
import '../SourceManagement/SourceManagementPage.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CRow,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import logo from '../../../assets/images/logo.png';
import WidgetsDropdown from '../widgets/WidgetsDropdown';

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader align="center"><strong>TRÌNH QUẢN LÝ TRUYỆN</strong></CCardHeader>
            <CCardBody>
              <CRow className="text-center">
                <CCol>
                  <CImage src={logo} fluid width={200} className="my-4" />
                </CCol>
              </CRow>
              <CRow className="text-center mb-4">
                <CCol>
                  <h5>Chào mừng đến với Trình Quản Lý Truyện!</h5>
                  <p>Hỗ trợ việc thu thập và quản lý nguồn truyện và nguồn xuất bản</p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <h6>Thành viên nhóm:</h6>
                  <CListGroup>
                    <CListGroupItem>Thành viên 1: Nguyễn Tuấn Đạt - Quản lý dự án</CListGroupItem>
                    <CListGroupItem>Thành viên 2: Nguyễn Đình Ánh - Lập trình Backend</CListGroupItem>
                    <CListGroupItem>Thành viên 3: Triệu Hoàng Thiên Ân - Thiết kế UI/UX</CListGroupItem>
                    <CListGroupItem>Thành viên 4: Lê Minh Huy - Thiết kế UI/UX</CListGroupItem>
                    <CListGroupItem>Thành viên 5: Trương Thành Nhân - Thiết kế UI/UX + Kiểm thử</CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;

