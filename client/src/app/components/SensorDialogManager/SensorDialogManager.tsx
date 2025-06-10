"use client";

import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    IconButton,
    Typography,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUser } from "@/helper/apiService";

export default function SensorDialogManager({
                                                session,
                                                sensor_list,
                                                onUpdate,
                                            }: {
    session: any;
    sensor_list: string[];
    onUpdate: (updatedSensors: string[]) => void;
}) {
    const [open, setOpen] = useState(false);
    const [sensors, setSensors] = useState<string[]>(sensor_list);
    const [newSensor, setNewSensor] = useState("");

    const handleOpen = () => {
        setSensors(sensor_list); // Reset při otevření
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSensor = () => {
        if (newSensor.trim() && !sensors.includes(newSensor.trim())) {
            setSensors((prev) => [...prev, newSensor.trim()]);
            setNewSensor("");
        }
    };

    const handleDeleteSensor = (sensorId: string) => {
        setSensors((prev) => prev.filter((id) => id !== sensorId));
    };

    const handleSave = async () => {
        try {
            await updateUser(session?.user?.id, sensors, session?.accessToken);
            onUpdate(sensors); // 🔁 Propagace změny nahoru
            handleClose();
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    return (
        <>
            <Button variant="contained"  color="secondary" onClick={handleOpen}>
                <SettingsIcon/>
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Manage Sensors</DialogTitle>
                <DialogContent>
                    <List>
                        {sensors.map((sensorId) => (
                            <ListItem
                                key={sensorId}
                                secondaryAction={
                                    <IconButton onClick={() => handleDeleteSensor(sensorId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <Typography>{sensorId}</Typography>
                            </ListItem>
                        ))}
                    </List>

                    <TextField
                        fullWidth
                        label="New Sensor ID"
                        value={newSensor}
                        onChange={(e) => setNewSensor(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddSensor()}
                        sx={{ mt: 2 }}
                    />

                    <Button onClick={handleAddSensor} sx={{ mt: 1 }}>
                        Add Sensor
                    </Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
