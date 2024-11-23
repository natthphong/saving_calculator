// components/PortfolioOverview.js

import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function PortfolioOverview({ portfolio }) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

    return (
        <div className="my-4">
            <h3>ภาพรวมพอร์ตการลงทุน</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={portfolio}
                        dataKey="balance"
                        nameKey="stockName"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
                    >
                        {portfolio.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            value.toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                        }
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PortfolioOverview;
