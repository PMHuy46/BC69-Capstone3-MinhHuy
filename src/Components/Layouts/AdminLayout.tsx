import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar,  Button, Layout, Menu, Popover, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung";

const {  Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User", "/admin", <UserOutlined />),
  getItem("Films", "film", <FileOutlined />,[
    getItem('Film data','admin/film'),
    getItem('Add New','/admin/addFilm')
  ]),
  getItem("ShowTime", "/showtime", <DesktopOutlined />),
];

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const {user} = useQuanLyNguoiDungSelector()
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex justify-center items-center py-3">
          <img src="/images/lC22izJ.png" className="h-14" alt="" />
          <p className="text-white text-[16px] font-[700] px-1">Admin Page</p>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/admin"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>

      <Layout>
        <div className="flex items-center justify-between m-5">
          <p
            className="cursor-pointer font-[700] hover:text-red-600"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>HOME
          </p>
          {user ? (
            <div className="flex items-center gap-4">
              <Popover
                content={
                  <div className="flex flex-col p-[12px]">
                    <div>
                      <Button
                        className="w-full"
                        onClick={() => {
                        }}
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                }
              >
                <Avatar
                  size={"large"}
                  className="bg-[#87d068] text-center"
                  icon={<i className="fa-regular fa-user p-0"></i>}
                />
              </Popover>
            </div>
          ) : (
            <div>
              <Button
              type="primary"
                onClick={() => {
                  navigate(PATH.login)
                }}
              >
                Đăng Nhập
              </Button>
            </div>
          )}
        </div>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
