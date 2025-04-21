import React from "react";
import { Box } from "@mui/material";
import scss from "./Dashboard.module.scss";
import DataGraph from "@/app/components/DataGraph";
import {lineChartData} from "@/app/components/mockData";


const Dashboard = () => {
  return (
    <Box>
        <DataGraph type={"line"} data={lineChartData}/>
    </Box>
  );
};

export default Dashboard;
