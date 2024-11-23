// components/DCACalculatorForm.js

import React, { useState } from 'react';
import {
    TextField,
    Card,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "react-bootstrap";

function DCACalculatorForm({ id, onUpdate ,onRemove}) {
    // สถานะสำหรับฟิลด์ต่าง ๆ
    const [stockName, setStockName] = useState('');
    const [currentStockPrice, setCurrentStockPrice] = useState('');
    const [stockReturnRate, setStockReturnRate] = useState('');
    const [dividendYield, setDividendYield] = useState('');
    const [dividendGrowthRate, setDividendGrowthRate] = useState('');
    const [contribution, setContribution] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');
    const [dividendReinvestmentRate, setDividendReinvestmentRate] = useState('100');

    // ฟังก์ชันจัดการการเปลี่ยนแปลง
    const handleChange = () => {
        const data = {
            stockName,
            currentStockPrice: parseFloat(currentStockPrice) || 0,
            stockReturnRate: parseFloat(stockReturnRate) || 0,
            dividendYield: parseFloat(dividendYield) || 0,
            dividendGrowthRate: parseFloat(dividendGrowthRate) || 0,
            contribution: parseFloat(contribution) || 0,
            investmentYears: parseInt(investmentYears) || 0,
            dividendReinvestmentRate: parseFloat(dividendReinvestmentRate) || 0,
        };
        onUpdate(id, data);
    };

    // ใช้ useEffect เพื่อเรียก handleChange เมื่อมีการเปลี่ยนแปลงค่า
    React.useEffect(() => {
        handleChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        stockName,
        currentStockPrice,
        stockReturnRate,
        dividendYield,
        dividendGrowthRate,
        contribution,
        investmentYears,
        dividendReinvestmentRate,
    ]);

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
                            label="อัตราผลตอบแทนของหุ้นต่อปี (%)"
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
                            label="อัตราเงินปันผล (%)"
                            type="number"
                            value={dividendYield}
                            onChange={(e) => setDividendYield(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="อัตราการเติบโตของปันผลต่อปี (%)"
                            type="number"
                            value={dividendGrowthRate}
                            onChange={(e) => setDividendGrowthRate(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="นำเงินปันผลไปลงทุนต่อ (%)"
                            type="number"
                            value={dividendReinvestmentRate}
                            onChange={(e) => setDividendReinvestmentRate(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="จำนวนปีที่จะลงทุน"
                            type="number"
                            value={investmentYears}
                            onChange={(e) => setInvestmentYears(e.target.value)}
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
