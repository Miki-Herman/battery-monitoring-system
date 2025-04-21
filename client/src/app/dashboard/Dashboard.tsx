import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import scss from "./Dashboard.module.scss";
import DataGraph from "@/app/components/DataGraph";
import { data as mockData } from "@/app/components/mockData";

const Dashboard = () => {
  // Labels for each chart type

  //const [data, setData] = useState([]);

  // useEffect(() => {
  //  fetch(process.env.API_URL + "/data?systemId=" + process.env.SYSTEM_ID)
  //      .then(res => res.json())
  //      .then(res => setData(res.result))
  // }, []);

  const chartLabels = ["Voltage", "Temperature", "Current"];

  // Process mockData to create Chart.js compatible datasets
  const processedData = (() => {
    if (
      !mockData ||
      !mockData.result ||
      !Array.isArray(mockData.result) ||
      mockData.result.length === 0
    ) {
      return [];
    }

    // Sort data by timestamp
    const sortedData = [...mockData.result].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    // Extract timestamps for labels (convert to readable format)
    const timestamps = sortedData.map((item) => {
      const date = new Date(item.timestamp * 1000);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    // Create datasets for each metric
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

  // Chart options to ensure proper rendering in larger container
  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    aspectRatio: 7,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 7,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 6,
        },
        bodyFont: {
          size: 7,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 5,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 5,
          },
        },
      },
    },
  };

  return (
    <Box className={scss.dashboard}>
      <Typography variant="h4" component="h1" gutterBottom>
        Battery Monitoring Dashboard
      </Typography>
      {processedData.length > 0 ? (
        <>
          <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
            <Box className={scss.chartContainer}>
              <Typography variant="h6">{chartLabels[0]}</Typography>
              <DataGraph
                type="line"
                data={processedData[0]}
                options={chartOptions}
              />
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
            <Box className={scss.chartContainer}>
              <Typography variant="h6">{chartLabels[1]}</Typography>
              <DataGraph
                type="line"
                data={processedData[1]}
                options={chartOptions}
              />
            </Box>
          </Grid>
          <Grid item xs={10} sm={6} md={4} lg={3} sx={{ marginTop: "10px" }}>
            <Box className={scss.chartContainer}>
              <Typography variant="h6">{chartLabels[2]}</Typography>
              <DataGraph
                type="line"
                data={processedData[2]}
                options={chartOptions}
              />
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
