// ResultsGraph.js

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { numberFormatter } from './utils/calculations';

function ResultsGraph({ data }) {

    const monthFormatter = (period) => {
        const year = Math.floor((period - 1) / 12) + 1;
        const month = ((period - 1) % 12) + 1;
        return `ปี ${year} เดือน ${month}`;
    };

    return (
        <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis
                        dataKey="period"
                        tickFormatter={monthFormatter}
                        interval="preserveStartEnd"
                        label={{
                            value: 'เดือนที่',
                            position: 'insideBottomRight',
                            offset: -5,
                        }}
                    />
                    <YAxis tickFormatter={numberFormatter} />
                    <Tooltip
                        formatter={(value) => numberFormatter(value)}
                        labelFormatter={(label) => `เดือนที่ ${label}`}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        name="ยอดเงิน"
                        stroke="#8884d8"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="totalContribution"
                        name="เงินออมสะสม"
                        stroke="#82ca9d"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="totalInterest"
                        name="ดอกเบี้ยสะสม"
                        stroke="#ffc658"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="totalDividend"
                        name="ปันผลสะสม"
                        stroke="#ffc658"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="dividend"
                        name="ปันผล ณ ปัจจุบัน"
                        stroke="#ffc658"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="currentDividendRate"
                        name="ปันผล ณ ปัจจุบัน (%)"
                        stroke="#ffc658"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ResultsGraph;
