import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHubspot } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Footer } from "antd/es/layout/layout";
import { ModuleViewPage } from "../screens/ModuleBuilder";
import ManageUser from "../screens/MangeUser";
import { MdDynamicForm, MdVerifiedUser } from "react-icons/md";
import Dashboard from "../screens/Dasboard";
import { useAuth } from "../auth/AuthContext";
import { UserForm } from "../screens/UserForm";

const { Header, Content, Sider } = Layout;

const adminItem = [
  {
    id: 1,
    key: "Dashboard",
    path: "/admin/dashboard",
    icon: <BiSolidDashboard size={18} className="me-2" />,
  },
  {
    id: 2,
    key: "Module Builder",
    path: "/admin/builder",
    icon: <FaHubspot size={18} className="me-2" />,
  },
  {
    id: 3,
    key: "Manage User",
    path: "/admin/manage",
    icon: <MdVerifiedUser className="me-2"
      size={18} />,
  },
];

const userItem = [
  {
    id: 1,
    key: "Merchant Form",
    path: "/user/form",
    icon: <MdDynamicForm size={18} className="me-2" />,
  },


];
const MasterLayout = () => {
  const { logout, role } = useAuth();

  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = () => {
    logout()
  };
  return (
    <Layout>
      <Sider
        className="pt-1 px-1"
        style={{ minHeight: "100dvh" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Avatar
          className="ms-5 my-3"
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<AntDesignOutlined />}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
        >
          {role == "ADMIN" ? adminItem.map((item) => (
            <Menu.Item key={item.path} icon={item.icon} className="mb-2">
              <NavLink className="text-decoration-none " to={item.path}>
                {item.key}
              </NavLink>
            </Menu.Item>
          ))
            :
            userItem.map((item) => (
              <Menu.Item key={item.path} icon={item.icon} className="mb-2">
                <NavLink className="text-decoration-none " to={item.path}>
                  {item.key}
                </NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="d-flex justify-content-between ">
            <div>
              <span className="ms-4 h5 fw-bolder ">Merchant </span>
            </div>
            <Button
              type="text"
              icon={<IoLogOut />}
              className="mt-3 me-1"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>

              <Route path="/builder" element={<ModuleViewPage />} />
              <Route path="/manage" element={<ManageUser />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/form" element={<UserForm />} />
            </Routes>
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Merchant ©{new Date().getFullYear()} Created By mark
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
