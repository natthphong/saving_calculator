// components/DCACalculatorForm.js

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DCACalculatorForm({ id, stockData, onUpdate, onRemove }) {
    const [formData, setFormData] = useState(
        stockData || {
            stockName: '',
            currentStockPrice: '',
            initialPrincipal: '', // เพิ่มฟิลด์เงินต้น
            stockReturnRate: '',
            dividendYield: '',
            dividendGrowthRate: '',
            contribution: '',
            investmentYears: '',
            dividendReinvestmentRate: '100',
            dividendTaxRate: '0', // เพิ่มฟิลด์ภาษีปันผล (ถ้ายังไม่ได้เพิ่ม)
        }
    );

    useEffect(() => {
        onUpdate(id, formData);
    }, [formData, id, onUpdate]);

    const handleChange = (field, value) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
    };

    return (
        <Card className="my-4">
            <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">หุ้น #{id}</Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => onRemove(id)}
                        startIcon={<DeleteIcon />}
                    >
                        ลบ
                    </Button>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ชื่อหุ้น"
                            value={formData.stockName}
                            onChange={(e) => handleChange('stockName', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="ราคาหุ้นปัจจุบัน"
                            type="number"
                            value={formData.currentStockPrice}
                            onChange={(e) => handleChange('currentStockPrice', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="เงินต้น"
                            type="number"
                            value={formData.initialPrincipal}
                            onChange={(e) => handleChange('initialPrincipal', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="อัตราผลตอบแทน (%)"
                            type="number"
                            value={formData.stockReturnRate}
                            onChange={(e) => handleChange('stockReturnRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="เงินออมต่อเดือน"
                            type="number"
                            value={formData.contribution}
                            onChange={(e) => handleChange('contribution', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ปันผล (%)"
                            type="number"
                            value={formData.dividendYield}
                            onChange={(e) => handleChange('dividendYield', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="การเติบโตของปันผล (%)"
                            type="number"
                            value={formData.dividendGrowthRate}
                            onChange={(e) => handleChange('dividendGrowthRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="อัตราภาษีปันผล (%)"
                            type="number"
                            value={formData.dividendTaxRate}
                            onChange={(e) => handleChange('dividendTaxRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="ลงทุนปันผลซ้ำ (%)"
                            type="number"
                            value={formData.dividendReinvestmentRate}
                            onChange={(e) => handleChange('dividendReinvestmentRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="จำนวนปีลงทุน"
                            type="number"
                            value={formData.investmentYears}
                            onChange={(e) => handleChange('investmentYears', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default DCACalculatorForm;
