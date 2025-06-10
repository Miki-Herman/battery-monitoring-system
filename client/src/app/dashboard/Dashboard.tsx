"use client";

import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import scss from "./Dashboard.module.scss";
import DataGraph from "@/app/components/DataGraph";
import { fetchBatteryData } from "@/helper/apiService";
import { useTheme } from "@mui/material/styles";



const Dashboard = ({
   session,
   sensorId,
 }: {
  session: any;
  sensorId: string | null;
}) => {
  const chartLabels = ["Voltage", "Temperature", "Current"];

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchBatteryData(
            sensorId as string,
            session.accessToken
        );
        setData(result);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (sensorId && session?.accessToken) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [sensorId, session?.accessToken]);

  const processedData = (() => {
    if (
        !data ||
        !data.result ||
        !Array.isArray(data.result) ||
        data.result.length === 0
    ) {
      return [];
    }

    const sortedData = [...data.result].sort(
        (a, b) => a.timestamp - b.timestamp
    );

    const timestamps = sortedData.map((item) => {
      const date = new Date(item.timestamp * 1000);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    const voltageData = {
      labels: timestamps,
      datasets: [
        {
          label: "Voltage (V)",
          data: sortedData.map((item) => item.voltage),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };

    const temperatureData = {
      labels: timestamps,
      datasets: [
        {
          label: "Temperature (°C)",
          data: sortedData.map((item) => item.temperature),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    };

    const currentData = {
      labels: timestamps,
      datasets: [
        {
          label: "Current (A)",
          data: sortedData.map((item) => item.current),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
        },
      ],
    };

    return [voltageData, temperatureData, currentData];
  })();

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    aspectRatio: 7,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { size: 7 },
          color: isDark ? "#fff" : "#000",
        },
      },
      tooltip: {
        titleFont: { size: 6 },
        bodyFont: { size: 7 },
        backgroundColor: isDark ? "#222" : "#fff",
        titleColor: isDark ? "#fff" : "#000",
        bodyColor: isDark ? "#fff" : "#000",
      },
    },
    scales: {
      y: {
        ticks: {
          font: { size: 5 },
          color: isDark ? "#fff" : "#000",
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      x: {
        ticks: {
          font: { size: 5 },
          color: isDark ? "#fff" : "#000",
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return (
      <Box className={scss.dashboard}>
        {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Loading data...
              </Typography>
            </Box>
        ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <Typography variant="body1" color="error">
                Error: {error}
              </Typography>
            </Box>
        ) : processedData.length > 0 ? (
            <>
              <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
                <Box className={scss.chartContainer}>
                  <Typography variant="h6">{chartLabels[0]}</Typography>
                  <DataGraph type="line" data={processedData[0]} options={chartOptions} />
                </Box>
              </Grid>
              <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
                <Box className={scss.chartContainer}>
                  <Typography variant="h6">{chartLabels[1]}</Typography>
                  <DataGraph type="line" data={processedData[1]} options={chartOptions} />
                </Box>
              </Grid>
              <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
                <Box className={scss.chartContainer}>
                  <Typography variant="h6">{chartLabels[2]}</Typography>
                  <DataGraph type="line" data={processedData[2]} options={chartOptions} />
                </Box>
              </Grid>
            </>
        ) : (
            <Grid item xs={12}>
              <Typography variant="body1">No data available</Typography>
            </Grid>
        )}
      </Box>
  );
};

export default Dashboard;
