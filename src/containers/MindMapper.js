import React from "react";

import Header from "../components/mindMapper/Header";
import Taskbar from "../components/mindMapper/Taskbar";
import WorkBar from "../components/mindMapper/WorkBar";
import Workspace from "../components/mindMapper/Workspace";

const MindMapper = () => (
  <div>
    <Header />
    <Taskbar />
    <WorkBar />
    <Workspace />
  </div>
);

export default MindMapper;
