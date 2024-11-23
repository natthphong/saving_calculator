// components/DCAResultsTable.js

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

function DCAResultsTable({ yearlyData }) {
    // ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
    const numberFormatter = (value) =>
        value.toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    // ฟังก์ชันสำหรับจัดรูปแบบเปอร์เซ็นต์
    const percentFormatter = (value) =>
        `${value.toFixed(2)}%`;

    return (
        <TableContainer component={Paper} className="my-4">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ปีที่</TableCell>
                        <TableCell align="right">มูลค่าพอร์ต (บาท)</TableCell>
                        <TableCell align="right">เงินออมสะสม (บาท)</TableCell>
                        <TableCell align="right">ผลตอบแทนสะสม (บาท)</TableCell>
                        <TableCell align="right">ปันต่อปี (บาท)</TableCell>
                        <TableCell align="right">ภาษีเงินปันผล (บาท)</TableCell>
                        <TableCell align="right">ปันผล % ต่อปี</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearlyData.map((row) => {
                        const investmentValue = row.totalBalance - row.totalContribution;
                        const investmentValue2 = row.totalBalance - row.totalDividend;
                        const dividendYieldPercentage =
                            investmentValue2 > 0
                                ? ((row.totalDividend + row.totalDividendTax) / (investmentValue2)) * 100
                                : 0;

                        return (
                            <TableRow key={row.year}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell align="right">
                                    {numberFormatter(row.totalBalance)}
                                </TableCell>
                                <TableCell align="right">
                                    {numberFormatter(row.totalContribution)}
                                </TableCell>
                                <TableCell align="right">
                                    {numberFormatter(investmentValue)}
                                </TableCell>
                                <TableCell align="right">
                                    {numberFormatter(row.totalDividend)}
                                </TableCell>
                                <TableCell align="right">
                                    {numberFormatter(row.totalDividendTax)}
                                </TableCell>
                                <TableCell align="right">
                                    {percentFormatter(dividendYieldPercentage)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DCAResultsTable;
