import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaUserShield, FaUser } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.patch(`/users/admin/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User is now an Admin!");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-black">Manage Users</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-700">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-gray-600">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className="btn btn-ghost text-red-600 flex items-center gap-2 hover:bg-red-50"
                    >
                      <FaUserShield /> Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
