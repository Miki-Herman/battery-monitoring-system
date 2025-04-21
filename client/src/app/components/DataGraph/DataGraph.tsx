import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { darkOptions } from "@/app/components/DataGraph/Themes";
import { months } from "@/helper/Util";
import { ChartConfiguration } from "chart.js";

const DataGraph = (props: ChartConfiguration) => {
    const { data, options } = props;
    const chartRef = useRef<HTMLCanvasElement>(null);

    const labels = months({ count: 7 });
    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                ...props,
                options: {
                    ...options,
                    ...darkOptions,
                },
            });
            return () => {
                chart.destroy();
            };
        }
    }, [data]);
    return <canvas ref={chartRef} />;
};
Chart.register(...registerables);

export default DataGraph;