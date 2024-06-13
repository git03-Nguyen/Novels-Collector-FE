import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify';
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))


const AdminApp = () => {

  return (
    <>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <DefaultLayout />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </>
  )
}

export default AdminApp
