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

function ResultsGraph({ data }) {
    // ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
    const numberFormatter = (value) => value.toLocaleString();

    return (
        <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis
                        dataKey="year"
                        label={{
                            value: 'ปีที่',
                            position: 'insideBottomRight',
                            offset: -5,
                        }}
                    />
                    <YAxis tickFormatter={numberFormatter} />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        name="ยอดเงินปลายปี"
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
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ResultsGraph;
