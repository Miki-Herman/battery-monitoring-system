import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getUser } from "@/helper/apiService";
import { UseSensor } from "@/context/SensorContext";

export default function ComboBox({ session }: { session: any }) {
  const { setSelectedSensor } = UseSensor();
  const sensors_data =
    getUser(session?.user?.id, session?.accessToken)?.sensors ?? [];

  return (
    <Autocomplete
      disablePortal
      options={sensors_data}
      sx={{ width: 300 }}
      onChange={(event, value) => setSelectedSensor(value?.id ?? null)}
      renderInput={(params) => <TextField {...params} label="Sensors" />}
    />
  );
}
