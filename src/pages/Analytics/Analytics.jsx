import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ExAnalytics from "../../components/ExAnalytics/ExAnalytics";
const Analytics = () => {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Header
        collapsed={collapsed}
        func={handleCollapsedChange}
        head="Analytics"
      />
      <ExAnalytics id={id} collapsed={collapsed} func={handleCollapsedChange} />
    </>
  );
};

export default Analytics;
