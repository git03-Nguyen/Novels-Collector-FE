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
import './Dashboard.css';
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
                  <CImage src={logo} fluid width={200} className="my-4" align="center" />
                </CCol>
              </CRow>
              <CRow className="text-center mb-4">
                <CCol>
                  <h5>Trình Quản Lý Truyện</h5>
                  <p>Hỗ trợ việc thu thập và quản lý nguồn truyện và nguồn xuất bản</p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <h5 className="text-center" >Thành viên nhóm</h5>
                  <CListGroup className="list-member w-50">
                    <CListGroupItem><strong>Nguyễn Tuấn Đạt</strong> - Lập trình Backend</CListGroupItem>
                    <CListGroupItem><strong>Nguyễn Đình Ánh</strong> - Lập trình Backend</CListGroupItem>
                    <CListGroupItem><strong>Triệu Hoàng Thiên Ân</strong> - Thiết kế UI/UX</CListGroupItem>
                    <CListGroupItem><strong>Lê Minh Huy</strong> - Thiết kế UI/UX</CListGroupItem>
                    <CListGroupItem><strong>Trương Thành Nhân</strong> - Thiết kế UI/UX + Kiểm thử</CListGroupItem>
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

