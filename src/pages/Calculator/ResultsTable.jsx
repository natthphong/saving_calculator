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
import {numberFormatter} from "./utils/calculations";

function ResultsTable({ yearlyData }) {
    return (
        <TableContainer component={Paper} className="my-4">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ปีที่</TableCell>
                        <TableCell align="right">ยอดเงินปลายปี (บาท)</TableCell>
                        <TableCell align="right">เงินออมในปี (บาท)</TableCell>
                        <TableCell align="right">ดอกเบี้ยในปี (บาท)</TableCell>
                        <TableCell align="right">เงินออมสะสม (บาท)</TableCell>
                        <TableCell align="right">ดอกเบี้ยสะสม (บาท)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearlyData.map((row) => (
                        <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.balance.toFixed(2))}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyContribution.toFixed(2))}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.yearlyInterest.toFixed(2))}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.totalContribution.toFixed(2))}
                            </TableCell>
                            <TableCell align="right">
                                {numberFormatter(row.totalInterest.toFixed(2))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultsTable;
