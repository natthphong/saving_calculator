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

function DCACalculatorForm({ id, onDataChange, onRemove }) {
    // สถานะสำหรับฟิลด์ต่าง ๆ
    const [stockName, setStockName] = useState('');
    const [currentStockPrice, setCurrentStockPrice] = useState('1');
    const [initialPrincipal, setInitialPrincipal] = useState('');
    const [stockReturnRate, setStockReturnRate] = useState('');
    const [dividendYield, setDividendYield] = useState('');
    const [dividendGrowthRate, setDividendGrowthRate] = useState('');
    const [contribution, setContribution] = useState('10000');
    const [investmentYears, setInvestmentYears] = useState('30');
    const [dividendReinvestmentRate, setDividendReinvestmentRate] = useState('100');
    const [dividendTaxRate, setDividendTaxRate] = useState('15');

    const [expanded, setExpanded] = useState(false);

    // ฟังก์ชันสำหรับเรียกใช้ onDataChange เมื่อมีการเปลี่ยนแปลงค่า
    const handleDataChange = (field, value) => {
        // อัปเดตสถานะของฟิลด์ที่เปลี่ยนแปลง
        switch (field) {
            case 'stockName':
                setStockName(value);
                break;
            case 'currentStockPrice':
                if (value<=0){
                    alert("cannot value price equal less than 0")
                    break;
                }
                setCurrentStockPrice(value);
                break;
            case 'initialPrincipal':
                setInitialPrincipal(value);
                break;
            case 'stockReturnRate':
                setStockReturnRate(value);
                break;
            case 'dividendYield':
                setDividendYield(value);
                break;
            case 'dividendGrowthRate':
                setDividendGrowthRate(value);
                break;
            case 'contribution':
                setContribution(value);
                break;
            case 'investmentYears':
                setInvestmentYears(value);
                break;
            case 'dividendReinvestmentRate':
                setDividendReinvestmentRate(value);
                break;
            case 'dividendTaxRate':
                setDividendTaxRate(value);
                break;
            default:
                break;
        }

        // สร้างวัตถุ params จากค่าปัจจุบันของฟิลด์ทั้งหมด
        const params = {
            stockName: field === 'stockName' ? value : stockName,
            currentStockPrice: parseFloat(field === 'currentStockPrice' ? value : currentStockPrice) || 1,
            initialPrincipal: parseFloat(field === 'initialPrincipal' ? value : initialPrincipal) || 0,
            stockReturnRate: parseFloat(field === 'stockReturnRate' ? value : stockReturnRate) || 0,
            dividendYield: parseFloat(field === 'dividendYield' ? value : dividendYield) || 0,
            dividendGrowthRate: parseFloat(field === 'dividendGrowthRate' ? value : dividendGrowthRate) || 0,
            contribution: parseFloat(field === 'contribution' ? value : contribution) || 0,
            investmentYears: parseInt(field === 'investmentYears' ? value : investmentYears) || 0,
            dividendReinvestmentRate: parseFloat(field === 'dividendReinvestmentRate' ? value : dividendReinvestmentRate) || 0,
            dividendTaxRate: parseFloat(field === 'dividendTaxRate' ? value : dividendTaxRate) || 0,
        };

        // เรียกใช้ onDataChange พร้อมกับ params ที่อัปเดตแล้ว
        if (onDataChange) {
            onDataChange(id, params);
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ชื่อหุ้น"
                            value={stockName}
                            onChange={(e) => handleDataChange('stockName', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="ราคาหุ้นปัจจุบัน"
                            type="number"
                            value={currentStockPrice}
                            onChange={(e) => handleDataChange('currentStockPrice', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="เงินต้น"
                            type="number"
                            value={initialPrincipal}
                            onChange={(e) => handleDataChange('initialPrincipal', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="อัตราผลตอบแทน (%)"
                            type="number"
                            value={stockReturnRate}
                            onChange={(e) => handleDataChange('stockReturnRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="เงินออมต่อเดือน"
                            type="number"
                            value={contribution}
                            onChange={(e) => handleDataChange('contribution', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ปันผล (%)"
                            type="number"
                            value={dividendYield}
                            onChange={(e) => handleDataChange('dividendYield', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="การเติบโตของปันผล (%)"
                            type="number"
                            value={dividendGrowthRate}
                            onChange={(e) => handleDataChange('dividendGrowthRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="อัตราภาษีปันผล (%)"
                            type="number"
                            value={dividendTaxRate}
                            onChange={(e) => handleDataChange('dividendTaxRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="ลงทุนปันผลซ้ำ (%)"
                            type="number"
                            value={dividendReinvestmentRate}
                            onChange={(e) => handleDataChange('dividendReinvestmentRate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="จำนวนปีลงทุน"
                            type="number"
                            value={investmentYears}
                            onChange={(e) => handleDataChange('investmentYears', e.target.value)}
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
