import React from 'react';


export const USER_DETAIL = "user_id";
export const USER_ID = "user_id";
export const USER_WS_ID = "user_workSection_id";
export const USER_WP_ID = "user_workPeriod_id";
export const Colors = {
    background: '#0000',
    icons: '#8C0303',
};
export const shift_type = {
    0: 'off',
    1: "صبح",
    2: "عصر",
    3: "شب",
    13: "شب تا صیح",
    23: "عصر تا شب",
}
export const shift_title = {
    'off': 'off',
    'M': "صبح",
    'A': "عصر",
    'N': "شب",
    'NM': "شب تا صیح",
    'MN': "صیح تا شب",
    'AN': "عصر تا شب",
    'MA': "صبح تا عصر",
}
export const shift_value = {
    '1': "می خواهد ",
    '-1': "نمی خواهد",
    '0': "بدون رای"
}

export const shift_colors = {
    '0': '#e4f4f1',
    '-1': '#00CD00',
    '1': '#FF0000',
}