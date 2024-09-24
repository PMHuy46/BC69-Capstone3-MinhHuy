import { Pagination } from "antd";
import React, { useState } from "react";
import { quanLyNguoiDungServices } from "../../services";
import { objectToQueryString } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useGetUserList } from "../../Hooks/api/useGetUserList";

export const AdminUserTemplate = () => {
  const [listuser, setlistuser] = useState();

  const {data}= useGetUserList('GP01')

  setlistuser(data)

  return (
    <div>
      <div>

      </div>


      <Pagination
        align="center"
        defaultCurrent={1}
        total={150}
        onChange={async (value) => {
          try {
            const data = await quanLyNguoiDungServices.getListUser(
              objectToQueryString({
                MaNhom: `GP${value < 10 ? `0${value}` : value}`,
              })
            );
          } catch (error) {}
        }}
      />
    </div>
  );
};
