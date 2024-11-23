// components/DCAResultsGraph.js

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
import {numberFormatter} from "../../Calculator/utils/calculations";

function DCAResultsGraph({ data }) {
    // จัดกลุ่มข้อมูลตามปีและหุ้น
    const chartData = [];
    if (data){
        data.forEach(item => {
            const existing = chartData.find(d => d.year === item.year);
            if (existing) {
                existing[item.stockName] = item.balance;
            } else {
                chartData.push({
                    year: item.year,
                    [item.stockName]: item.balance,
                });
            }
        });
    }


    return (
        <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <XAxis
                        dataKey="year"
                        label={{
                            value: 'ปีที่',
                            position: 'insideBottomRight',
                            offset: -5,
                        }}
                    />
                    <YAxis
                        tickFormatter={numberFormatter}
                    />
                    <Tooltip
                        formatter={(value) => numberFormatter(value)}
                        labelFormatter={(label) => `ปีที่ ${label}`}
                    />
                    <Legend />
                    {Object.keys(chartData[0])
                        .filter(key => key !== 'year')
                        .map((key, index) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                name={key}
                                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                dot={false}
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DCAResultsGraph;
