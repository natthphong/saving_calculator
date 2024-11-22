// ResultsTable.js

import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';

function ResultsTable({ data }) {
    return (
        <TableContainer component={Paper} className="my-4">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>งวด</TableCell>
                        <TableCell align="right">ยอดเงิน (บาท)</TableCell>
                        <TableCell align="right">ดอกเบี้ย (บาท)</TableCell>
                        <TableCell align="right">เงินปันผล (บาท)</TableCell>
                        <TableCell align="right">เงินปันผลที่นำไปลงทุนต่อ (บาท)</TableCell>
                        <TableCell align="right">เงินออม (บาท)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.period}>
                            <TableCell>{row.period}</TableCell>
                            <TableCell align="right">{row.balance.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.interest.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.dividend.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.reinvestedDividend.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.contribution.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultsTable;
