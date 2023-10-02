import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useQuery } from "react-query";
import { getAllUsers } from "../../api";
import UserView from "../modals/UserView";

function UserAccountTable() {
  const [userView, setUserView] = useState({
    visible: false,
    user: {},
  });

  const userTableRef = useRef(null);
  const userData = useQuery("users", getAllUsers);

  useEffect(() => {
    const id = userTableRef.current.id;

    $(`#${id}`).DataTable({
      scrollY: 400,
      scrollX: true,
      scrollCollapse: true,
      fixedHeader: true,
      bInfo: false,
      scrollResize: true,
      destroy: true,
      responsive: true,
      data: userData.data ? userData.data : [],
      columns: [
        {
          title: "#",
          data: "id",
          visible: false,
        },
        {
          title: "Avatar",
          data: "avatar",
          createdCell: (cell, cellData) => {
            const imgView = $(
              `
              <div style='width:60px;height:60px;'>
              <img src='http://localhost:8000/images/${cellData}' style='width:100%;height:100%;border-radius:50%; object-fit:cover;'/>
              </div>
              `
            );
            $(cell).html(imgView);
          },
        },
        {
          title: "Firstname",
          data: "firstname",
        },
        {
          title: "Lastname",
          data: "lastname",
        },
        {
          title: "Username",
          data: "username",
        },
        {
          title: "Email",
          data: "email",
        },
        {
          title: "Action",
          data: null,
          target: [-1],
          width: 150,
          createdCell: (cell, cellData, rowData, row, col) => {
            const viewBtn = $(
              `<button class='btn btn-sm btn-primary me-1'>View</button>`
            ).on("click", (e) => {
              setUserView({
                visible: true,
                user: rowData,
              });
            });
            const editBtn = $(
              `<button class='btn btn-sm btn-dark me-1'>Edit</button>`
            ).on("click", (e) => {});
            const deleteBtn = $(
              `<button class='btn btn-sm btn-light me-1'>Delete</button>`
            ).on("click", (e) => {});

            $(cell).html([viewBtn, editBtn, deleteBtn]);
          },
        },
      ],
    });
  }, [userData.data]);

  return (
    <>
      <table
        width={"100%"}
        id="user-table"
        className="table table-responsive table-hover table-striped"
        ref={userTableRef}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
            {/* <th>Telephone</th> */}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <UserView userView={userView} setUserView={setUserView} />
    </>
  );
}

export default UserAccountTable;
