// components/DCACalculatorForm.js

import React, { useState } from 'react';
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

function DCACalculatorForm({ id, handleCalculate, onRemove }) {
    // สถานะสำหรับฟิลด์ต่าง ๆ
    const [stockName, setStockName] = useState('');
    const [currentStockPrice, setCurrentStockPrice] = useState('');
    const [initialPrincipal, setInitialPrincipal] = useState('');
    const [stockReturnRate, setStockReturnRate] = useState('');
    const [dividendYield, setDividendYield] = useState('');
    const [dividendGrowthRate, setDividendGrowthRate] = useState('');
    const [contribution, setContribution] = useState('10000');
    const [investmentYears, setInvestmentYears] = useState('10');
    const [dividendReinvestmentRate, setDividendReinvestmentRate] = useState('100');
    const [dividendTaxRate, setDividendTaxRate] = useState('10');

    const [expanded, setExpanded] = useState(false);

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = (event) => {
        event.preventDefault();

        const params = {
            stockName,
            currentStockPrice: parseFloat(currentStockPrice) || 0,
            initialPrincipal: parseFloat(initialPrincipal) || 0,
            stockReturnRate: parseFloat(stockReturnRate) || 0,
            dividendYield: parseFloat(dividendYield) || 0,
            dividendGrowthRate: parseFloat(dividendGrowthRate) || 0,
            contribution: parseFloat(contribution) || 0,
            investmentYears: parseInt(investmentYears) || 0,
            dividendReinvestmentRate: parseFloat(dividendReinvestmentRate) || 0,
            dividendTaxRate: parseFloat(dividendTaxRate) || 0,
        };

        // เรียกใช้ฟังก์ชัน handleCalculate ที่ส่งมาทาง props
        if (handleCalculate) {
            handleCalculate(params);
        }
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
                        หุ้น #{id}: {stockName || 'ยังไม่ได้ระบุชื่อ'}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(id);
                        }}
                        startIcon={<DeleteIcon />}
                    >
                        ลบ
                    </Button>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="ชื่อหุ้น"
                                value={stockName}
                                onChange={(e) => setStockName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="ราคาหุ้นปัจจุบัน"
                                type="number"
                                value={currentStockPrice}
                                onChange={(e) => setCurrentStockPrice(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="เงินต้น"
                                type="number"
                                value={initialPrincipal}
                                onChange={(e) => setInitialPrincipal(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="อัตราผลตอบแทน (%)"
                                type="number"
                                value={stockReturnRate}
                                onChange={(e) => setStockReturnRate(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="เงินออมต่อเดือน"
                                type="number"
                                value={contribution}
                                onChange={(e) => setContribution(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="ปันผล (%)"
                                type="number"
                                value={dividendYield}
                                onChange={(e) => setDividendYield(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="การเติบโตของปันผล (%)"
                                type="number"
                                value={dividendGrowthRate}
                                onChange={(e) => setDividendGrowthRate(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="อัตราภาษีปันผล (%)"
                                type="number"
                                value={dividendTaxRate}
                                onChange={(e) => setDividendTaxRate(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="ลงทุนปันผลซ้ำ (%)"
                                type="number"
                                value={dividendReinvestmentRate}
                                onChange={(e) => setDividendReinvestmentRate(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="จำนวนปีลงทุน"
                                type="number"
                                value={investmentYears}
                                onChange={(e) => setInvestmentYears(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                คำนวณ
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

export default DCACalculatorForm;
