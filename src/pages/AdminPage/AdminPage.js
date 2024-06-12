import React from 'react';
import classNames from 'classnames';
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'
import WidgetsBrand from './widgets/WidgetsBrand';
import WidgetsDropdown from './widgets/WidgetsDropdown';
import { AppSidebar, AppFooter, AppHeader } from './partial';
const AdminPage = () => {
    const progressExample = [
        { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
        { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
        { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
        { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
        { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ];

    const tableExample = [
        {
            user: {
                name: 'Yiorgos Avraamu',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'USA', flag: 'bi bi-flag-fill' },
            usage: {
                value: 50,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            payment: { name: 'Mastercard', icon: 'bi bi-credit-card' },
            activity: '10 sec ago',
        },
        {
            user: {
                name: 'Avram Tarasios',
                new: false,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Brazil', flag: 'bi bi-flag-fill' },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'info',
            },
            payment: { name: 'Visa', icon: 'bi bi-credit-card' },
            activity: '5 minutes ago',
        },
        {
            user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
            country: { name: 'India', flag: 'bi bi-flag-fill' },
            usage: {
                value: 74,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'warning',
            },
            payment: { name: 'Stripe', icon: 'bi bi-credit-card' },
            activity: '1 hour ago',
        },
        {
            user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
            country: { name: 'France', flag: 'bi bi-flag-fill' },
            usage: {
                value: 98,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'danger',
            },
            payment: { name: 'PayPal', icon: 'bi bi-credit-card' },
            activity: 'Last month',
        },
        {
            user: {
                name: 'Agapetus Tadeáš',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Spain', flag: 'bi bi-flag-fill' },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'primary',
            },
            payment: { name: 'Google Wallet', icon: 'bi bi-credit-card' },
            activity: 'Last week',
        },
        {
            user: {
                name: 'Friderik Dávid',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Poland', flag: 'bi bi-flag-fill' },
            usage: {
                value: 43,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            payment: { name: 'Amex', icon: 'bi bi-credit-card' },
            activity: 'Last week',
        },
    ];

    return (

        <>
            <WidgetsDropdown className="mb-4" />
            {/* <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-5">
                            <h4 id="traffic" className="card-title mb-0">Traffic</h4>
                            <div className="small text-muted">January - July 2023</div>
                        </div>
                        <div className="col-sm-7 d-none d-md-block">
                            <button className="btn btn-primary float-end">
                                <i className="bi bi-cloud-download"></i>
                            </button>
                            <div className="btn-group float-end me-3">
                                {['Day', 'Month', 'Year'].map((value) => (
                                    <button
                                        type="button"
                                        className={`btn btn-outline-secondary${value === 'Month' ? ' active' : ''}`}
                                        key={value}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 mb-2 text-center">
                        {progressExample.map((item, index, items) => (
                            <div
                                className={classNames('col', {
                                    'd-none d-xl-block': index + 1 === items.length,
                                })}
                                key={index}
                            >
                                <div className="text-muted">{item.title}</div>
                                <div className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                </div>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                    <div
                                        className={`progress-bar bg-${item.color}`}
                                        role="progressbar"
                                        style={{ width: `${item.percent}%` }}
                                        aria-valuenow={item.percent}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* <WidgetsBrand className="mb-4" withCharts /> */}
            {/* <div className="row">
                <div className="col">
                    <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead className="text-nowrap">
                            <CTableRow>
                                <CTableHeaderCell className="bg-body-tertiary text-center">
                                    <CIcon icon={cilPeople} />
                                </CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary text-center">Country</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary text-center">Payment Method</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {tableExample.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>
                                        <div>{item.user.name}</div>
                                        <div className="small text-body-secondary text-nowrap">
                                            <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="d-flex justify-content-between text-nowrap">
                                            <div className="fw-semibold">{item.usage.value}%</div>
                                            <div className="ms-3">
                                                <small className="text-body-secondary">{item.usage.period}</small>
                                            </div>
                                        </div>
                                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <CIcon size="xl" icon={item.payment.icon} />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div className="small text-body-secondary text-nowrap">Last login</div>
                                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
            </div> */}
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                        <CCardBody>
                            {/* <CRow>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-info py-1 px-3">
                                                <div className="text-body-secondary text-truncate small">New Clients</div>
                                                <div className="fs-5 fw-semibold">9,123</div>
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">
                                                    Recurring Clients
                                                </div>
                                                <div className="fs-5 fw-semibold">22,643</div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <hr className="mt-0" />
                                    {progressGroupExample1.map((item, index) => (
                                        <div className="progress-group mb-4" key={index}>
                                            <div className="progress-group-prepend">
                                                <span className="text-body-secondary small">{item.title}</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="info" value={item.value1} />
                                                <CProgress thin color="danger" value={item.value2} />
                                            </div>
                                        </div>
                                    ))}
                                </CCol>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Pageviews</div>
                                                <div className="fs-5 fw-semibold">78,623</div>
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Organic</div>
                                                <div className="fs-5 fw-semibold">49,123</div>
                                            </div>
                                        </CCol>
                                    </CRow>

                                    <hr className="mt-0" />

                                    {progressGroupExample2.map((item, index) => (
                                        <div className="progress-group mb-4" key={index}>
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                                <span>{item.title}</span>
                                                <span className="ms-auto fw-semibold">{item.value}%</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="warning" value={item.value} />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mb-5"></div>

                                    {progressGroupExample3.map((item, index) => (
                                        <div className="progress-group" key={index}>
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                                <span>{item.title}</span>
                                                <span className="ms-auto fw-semibold">
                                                    {item.value}{' '}
                                                    <span className="text-body-secondary small">({item.percent}%)</span>
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="success" value={item.percent} />
                                            </div>
                                        </div>
                                    ))}
                                </CCol>
                            </CRow> */}

                            <br />

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Country</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Payment Method</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-body-secondary text-nowrap">
                                                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex justify-content-between text-nowrap">
                                                    <div className="fw-semibold">{item.usage.value}%</div>
                                                    <div className="ms-3">
                                                        <small className="text-body-secondary">{item.usage.period}</small>
                                                    </div>
                                                </div>
                                                <CProgress thin color={item.usage.color} value={item.usage.value} />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.payment.icon} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="small text-body-secondary text-nowrap">Last login</div>
                                                <div className="fw-semibold text-nowrap">{item.activity}</div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>

    );
};

export default AdminPage;
