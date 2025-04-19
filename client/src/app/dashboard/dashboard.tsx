import React from 'react';
import { Box, Paper } from "@mui/material";
import scss from './dashboard.module.scss';

const Dashboard = () => {
    return (
        <Box>
            <div className={scss.topCardsContainer}>
                <Paper className={scss.dataCard}>Card 1</Paper>
                <Paper className={scss.dataCard}>Card 2</Paper>
                <Paper className={scss.dataCard}>Card 3</Paper>
            </div>
        </Box>
    );
}

export default Dashboard;
