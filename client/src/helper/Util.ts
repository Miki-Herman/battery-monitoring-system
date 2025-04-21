const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const months = (config: any) => {
    const cfg = config || {};
    const count = cfg.count || 12;
    const section = cfg.section;
    const values = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
    }

    return values;
};

export const days = (config: any) => {
    const cfg = config || {};
    const count = cfg.count || 7;
    const section = cfg.section;
    const values = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = DAYS[Math.ceil(i) % 7];
        values.push(value.substring(0, section));
    }

    return values;
};
