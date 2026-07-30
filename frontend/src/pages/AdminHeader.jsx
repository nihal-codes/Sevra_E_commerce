const AdminHeader = () => {
  return (
    <>
      <div className="flex justify-between p-4">
        <img src="" alt="Website Logo" />
        <div className="flex gap-4">
          <button>Orders</button>
          <button>Users</button>
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader;