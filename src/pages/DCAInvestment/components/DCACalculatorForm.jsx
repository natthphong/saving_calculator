// components/DCACalculatorForm.js

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Typography,
    Grid,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

function DCACalculatorForm({ id, stockData, onUpdate, onRemove }) {
    const [formData, setFormData] = useState(
        stockData || {
            stockName: '',
            currentStockPrice: '',
            initialPrincipal: '',
            stockReturnRate: '',
            dividendYield: '',
            dividendGrowthRate: '',
            contribution: '',
            investmentYears: '',
            dividendReinvestmentRate: '100',
            dividendTaxRate: '0',
        }
    );

    const [expanded, setExpanded] = useState(false); // ตั้งค่าเริ่มต้นเป็นปิด

    useEffect(() => {
        onUpdate(id, formData);
    }, [formData, id, onUpdate]);

    const handleChange = (field, value) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
    };

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${id}-content`}
                id={`panel${id}-header`}
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">
                        หุ้น #{id}: {formData.stockName || 'ยังไม่ได้ระบุชื่อ'}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                            e.stopPropagation(); // ป้องกันการยุบ/ขยายเมื่อคลิกปุ่มลบ
                            onRemove(id);
                        }}
                        startIcon={<DeleteIcon />}
                    >
                        ลบ
                    </Button>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
        </Accordion>
    );
}

export default DCACalculatorForm;
