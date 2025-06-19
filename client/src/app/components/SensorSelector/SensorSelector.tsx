"use client";

import React, { useEffect, useState } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Box
} from "@mui/material";
import { getUser } from "@/helper/apiService";
import Dashboard from "@/app/dashboard/Dashboard";
import SensorDialogManager from "@/app/components/SensorDialogManager";

export default function SensorSelector({ session }: { session: any }) {
    const [sensors, setSensors] = useState<string[]>([]);
    const [selectedSensorId, setSelectedSensorId] = useState<string>("");

    useEffect(() => {
        const fetchSensors = async () => {
            const userData = await getUser(session?.user?.id, session?.accessToken);
            const loadedSensors = userData?.result?.sensors ?? [];
            setSensors(loadedSensors);
            setSelectedSensorId(loadedSensors[0] ?? "");
        };
        fetchSensors();
    }, [session]);

    const handleChange = (event: any) => {
        setSelectedSensorId(event.target.value);
    };

    const handleSensorsUpdate = (updatedSensors: string[]) => {
        setSensors(updatedSensors);
        if (!updatedSensors.includes(selectedSensorId)) {
            setSelectedSensorId(updatedSensors[0] ?? "");
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Battery Monitoring Dashboard
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 375 }}>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="sensor-select-label">Sensors</InputLabel>
                    <Select
                        labelId="sensor-select-label"
                        value={selectedSensorId}
                        label="Sensors"
                        onChange={handleChange}
                    >
                        {sensors.map((sensorId) => (
                            <MenuItem key={sensorId} value={sensorId}>
                                {sensorId}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <SensorDialogManager
                    session={session}
                    sensor_list={sensors}
                    onUpdate={handleSensorsUpdate}
                />
            </Box>

            {selectedSensorId && (
                <Dashboard session={session} sensorId={selectedSensorId} />
            )}
        </>
    );
}
