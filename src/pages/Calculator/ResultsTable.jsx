// ResultsTable.js

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

function ResultsTable({ yearlyData }) {
    // ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
    const numberFormatter = (value) =>
        value.toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <TableContainer component={Paper} className="my-4">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ปีที่</TableCell>
                        <TableCell align="right">ยอดเงินปลายปี (บาท)</TableCell>
                        <TableCell align="right">เงินออมในปี (บาท)</TableCell>
                        <TableCell align="right">เงินออมสะสม (บาท)</TableCell>
                        <TableCell align="right">ดอกเบี้ยในปี (บาท)</TableCell>
                        <TableCell align="right">ดอกเบี้ยสะสม (บาท)</TableCell>
                        <TableCell align="right">เงินปันผลในปี (บาท)</TableCell>
                        <TableCell align="right">เงินปันผลสะสม (บาท)</TableCell>
                        <TableCell align="right">ภาษีเงินปันผลในปี (บาท)</TableCell>
                        <TableCell align="right">เงินปันผล (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearlyData.map((row) => (
                        <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.balance)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyContribution)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.totalContribution)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyInterest)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.totalInterest)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyDividend)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.totalDividend)}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyDividendTax)}
                            </TableCell>
                            <TableCell align="right">
                                {`${row.currentDividendRate.toFixed(2)}%`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultsTable;
