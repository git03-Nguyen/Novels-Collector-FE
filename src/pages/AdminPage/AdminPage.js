import React from 'react';
import classNames from 'classnames';

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

        <div>
            <WidgetsDropdown className="mb-4" />
            <div className="card mb-4">
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
            </div>
            <WidgetsBrand className="mb-4" withCharts />
            <div className="row">
                <div className="col">
                    <table className="table table-hover table-responsive mb-0 border">
                        <thead className="text-nowrap bg-light">
                            <tr>
                                <th>User</th>
                                <th className="text-center">Country</th>
                                <th>Usage</th>
                                <th className="text-center">Payment Method</th>
                                <th>Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableExample.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div>{item.user.name}</div>
                                        <div className="small text-muted text-nowrap">
                                            <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <i className={item.country.flag} title={item.country.name}></i>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-between text-nowrap">
                                            <div className="fw-semibold">{item.usage.value}%</div>
                                            <div className="ms-3">
                                                <small className="text-muted">{item.usage.period}</small>
                                            </div>
                                        </div>
                                        <div className="progress" style={{ height: '4px' }}>
                                            <div
                                                className={`progress-bar bg-${item.usage.color}`}
                                                role="progressbar"
                                                style={{ width: `${item.usage.value}%` }}
                                                aria-valuenow={item.usage.value}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <i className={item.payment.icon}></i>
                                    </td>
                                    <td>
                                        <div className="small text-muted text-nowrap">Last login</div>
                                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default AdminPage;
