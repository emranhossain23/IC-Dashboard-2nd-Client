import React, { useState } from "react";
import PageLocation from "../../../../component/PageLocation/PageLocation";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import Table from "../../../../component/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import UserCreateDrawer from "../../../../component/UserCreateDrawer/UserCreateDrawer";
import Drawer from "../../../../component/UserCreateDrawer/UserCreateDrawer";

const Users = () => {
  const columnHelper = createColumnHelper();
  const [open, setOpen] = useState(false);

  const data = [];

  for (let x = 0; x < 20; x++) {
    data.push({
      name: `rafi ${x}`,
      email: `khan.Mohammad@Rafi.com`,
      age: 20 + x,
      location: `${x + x} vcs`,
      role: "admin",
      phone: `0178888888${x}`,
      status: "Active",
      created: "10/03/2025",
    });
  }

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div>
            <h4 className="text-[rgb(17,24,39)] font-medium text-sm">
              {row.name}
            </h4>
            <p>{row.email}</p>
          </div>
        );
      },
      header: "Name",
    }),
    columnHelper.accessor("age", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Age",
    }),
    columnHelper.accessor("location", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "location",
    }),
    columnHelper.accessor("role", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "role",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "phone",
    }),
    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),
    columnHelper.accessor("created", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Created",
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
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 border rounded-full px-4 py-1.5 text-sm bg-[#247CFF] text-white"
            >
              <GoPlus /> Add User
            </button>
          </div>
        </div>

        <Table columns={columns} data={data}></Table>

        <UserCreateDrawer
          open={open}
          onClose={() => setOpen(false)}
        ></UserCreateDrawer>
      </div>
    </div>
  );
};

export default Users;
