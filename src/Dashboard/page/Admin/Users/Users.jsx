import React, { useState } from "react";
import PageLocation from "../../../../component/PageLocation/PageLocation";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import Table from "../../../../component/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import UserCreateDrawer from "../../../../component/UserCreateDrawer/UserCreateDrawer";
import Drawer from "../../../../component/UserCreateDrawer/UserCreateDrawer";
import useGetSecureData from "@/hooks/useGetSecureData";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { userInitialValues } from "@/schema/user/userInitialValues";

const Users = () => {
  const columnHelper = createColumnHelper();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [initialSchema, setInitialSchema] = useState({});
  const { data: users, refetch: refetch_users } = useGetSecureData(
    "users",
    "/users"
  );
  // console.log(users);

  const { mutateAsync: user_delete } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-user/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch_users();
      toast.success("User deleted Successfully");
    },
    onError: () => {
      toast.error("Try again");
    },
  });

  // console.log(selectedUserInfo);

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div>
            <h4 className="text-[rgb(17,24,39)] font-medium text-sm">
              {row.name}
            </h4>
            <p className="text-sm">{row.email}</p>
          </div>
        );
      },
      header: "Name",
    }),

    columnHelper.accessor("role", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Role",
    }),

    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "phone",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-0.5">
            <h6>{row.city},</h6>
            <span>{row.province}</span>
          </div>
        );
      },
      header: "Location",
      id: "location",
    }),

    columnHelper.accessor("isActive", {
      cell: (info) =>
        info.getValue() && (
          <span className="border border-green-300 text-xs px-3 py-1.5 rounded-md bg-[#F6FFED] text-green-400">
            Active
          </span>
        ),
      header: "Status",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>{new Date(info.getValue()).toLocaleDateString()}</span>
      ),
      header: "Created",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const { _id, ...data } = info.row.original;

        return (
          <div className="space-x-2.5">
            <button
              onClick={() => {
                setOpen(true);
                setInitialSchema(data);
              }}
              className="text-green-500 hover:bg-green-100 rounded-md p-1"
            >
              <CiEdit />
            </button>
            <button
              onClick={() => user_delete(_id)}
              className="text-red-500 hover:bg-red-100 rounded-md p-1"
            >
              <AiOutlineDelete />
            </button>
          </div>
        );
      },
      header: "Actions",
      id: "action",
    }),
  ];

  return (
    <div className="">
      <PageLocation addresses={["Admin", "Users"]}></PageLocation>

      <div className="p-6 w-full bg-white rounded-md">
        <div className="flex items-center justify-between mb-5">
          <h1 className="title">users</h1>

          <div className="flex items-center gap-4">
            <form className="flex items-center ">
              <div className="relative w-[300px]">
                <input
                  type="search"
                  placeholder="Search clients..."
                  //   value={search}
                  //   onChange={(e) => setSearch(e.target.value)}
                  className="border border-r-0 py-2 pl-7"
                />
                <HiOutlineSearch
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="border w-8 h-8 flex items-center justify-center rounded-md rounded-l-none hover:border-[#1677FF] text-gray-600 submit-button"
              >
                <HiOutlineSearch />
              </button>
            </form>

            <button
              onClick={() => {
                setOpen(true);
                setInitialSchema(userInitialValues);
              }}
              className="flex items-center gap-1 border rounded-full px-4 py-1.5 text-sm bg-[#247CFF] text-white"
            >
              <GoPlus /> Add User
            </button>
          </div>
        </div>

        <Table key={"all-users"} columns={columns} data={users}></Table>

        <UserCreateDrawer
          open={open}
          onClose={() => setOpen(false)}
          refetch_users={refetch_users}
          initialValues={initialSchema}
        ></UserCreateDrawer>
      </div>
    </div>
  );
};

export default Users;
