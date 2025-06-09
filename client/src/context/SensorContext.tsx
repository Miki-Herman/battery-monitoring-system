"use client";

import React, { createContext, useContext, useState } from "react";

type SensorContextType = {
  selectedSensor: string | null;
  setSelectedSensor: (id: string | null) => void;
};

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  return (
    <SensorContext.Provider value={{ selectedSensor, setSelectedSensor }}>
      {children}
    </SensorContext.Provider>
  );
};

export const UseSensor = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error("useSensor must be used within a SensorProvider");
  }
  return context;
};
