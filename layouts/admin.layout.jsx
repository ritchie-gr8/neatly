import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <>
      <header>admin nav</header>
      <div>{children}</div>
    </>
  )
}

export default AdminLayout
