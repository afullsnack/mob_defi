import React from "react";
import "./../../App.less";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import { LABELS } from "../../constants";
import { AppBar } from "../AppBar";
import { SiderMenu } from "../SiderMenu";

const { Header, Content, Sider } = Layout;

export const AppLayout = React.memo((props: any) => {
  return (
    <div className="App wormhole-bg">
      <Layout title={LABELS.APP_TITLE}>
        <Header className="App-Bar">
          <Link to="/">
            <div className="app-title">
              <div className="app-logo"></div>
              <h2>MOB.Finance</h2>
            </div>
          </Link>
          <AppBar />
        </Header>
        <Layout>
          <Sider>
            <SiderMenu />
          </Sider>
          <Content style={{ padding: "50px 50px" }}>{props.children}</Content>
        </Layout>
      </Layout>
    </div>
  );
});
