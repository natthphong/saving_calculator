// ResultsGraph.js

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

function ResultsGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="period" label={{ value: 'งวด', position: 'insideBottomRight', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="balance" name="มูลค่าสุทธิ" stroke="#8884d8" />
                <Line type="monotone" dataKey="interest" name="ดอกเบี้ย" stroke="#82ca9d" />
                <Line type="monotone" dataKey="dividend" name="เงินปันผล" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ResultsGraph;
