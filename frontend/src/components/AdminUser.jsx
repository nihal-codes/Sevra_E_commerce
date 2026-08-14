import api from "../api/api";
import { useState, useEffect } from "react";
import useUserCatalog from "../hooks/useUserCatalog";


const AdminUser = () => {
  const { orders, users } = useUserCatalog();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-(--ablue)">Users</h1>
            <h4 className="text-xs font-light ">Manage all users from your store</h4>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[1fr_2fr_2fr_3fr_1fr] gap-2 px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue) ">
            <div>#</div>
            <div>User's Name</div>
            <div>Email</div>
            <div>Location</div>
            <div>Total Orders</div>
          </div>

          <div className="">
            {users.map((user) => {
              const order = orders.filter((order) => user._id === order.userId)
              return (
                <div key={user._id} className="grid grid-cols-[1fr_2fr_2fr_3fr_1fr] gap-2 items-center px-3 py-2 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out h-14">
                  
                  <div><h1 className="text-sm">1</h1></div>

                  <div><h1 className="text-sm font-semibold">{user.fullName}</h1></div>
                  
                  <div><h2 className="text-sm ">{user.email}</h2></div>
                  
                  <div><h2 className="text-sm ">{user.location}</h2></div>
                  
                  <div><h2 className="text-sm ">{order?.length}</h2></div>

                </div>
              )
            })}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AdminUser;