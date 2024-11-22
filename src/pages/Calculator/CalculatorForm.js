// CalculatorForm.js

import React, { useState } from 'react';
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import { Button } from 'react-bootstrap';

function CalculatorForm(props) {
    // สถานะสำหรับฟิลด์ต่าง ๆ
    const [initialPrincipal, setInitialPrincipal] = useState('0');
    const [interestRate, setInterestRate] = useState('10');
    const [interestFrequency, setInterestFrequency] = useState('yearly');
    const [dividendRate, setDividendRate] = useState('0');
    const [dividendFrequency, setDividendFrequency] = useState('yearly');
    const [dividendReinvestmentRate, setDividendReinvestmentRate] = useState('100');
    const [contribution, setContribution] = useState('10000');
    const [contributionFrequency, setContributionFrequency] = useState('monthly');
    const [contributionIncreaseRate, setContributionIncreaseRate] = useState('');
    const [volatility, setVolatility] = useState('0');
    const [investmentYears, setInvestmentYears] = useState('10');
    const [dividendIncreaseRate, setDividendIncreaseRate] = useState('0');

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = (event) => {
        event.preventDefault();

        // สร้างวัตถุพารามิเตอร์เพื่อส่งไปยังฟังก์ชันคำนวณ
        const params = {
            initialPrincipal: parseFloat(initialPrincipal) || 0,
            interestRate: parseFloat(interestRate) || 0,
            interestFrequency,
            dividendRate: parseFloat(dividendRate) || 0,
            dividendFrequency,
            dividendReinvestmentRate: parseFloat(dividendReinvestmentRate) || 0,
            contribution: parseFloat(contribution) || 0,
            contributionFrequency,
            contributionIncreaseRate: parseFloat(contributionIncreaseRate) || 0,
            volatility: parseFloat(volatility) || 0,
            investmentYears: parseInt(investmentYears) || 0,
            dividendIncreaseRate: parseFloat(dividendIncreaseRate) || 0,

        };

        // เรียกใช้ฟังก์ชัน onCalculate ที่ส่งมาทาง props
        if (props.onCalculate) {
            props.onCalculate(params);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ฟิลด์สำหรับเงินต้น */}
            <TextField
                label="เงินต้น"
                type="number"
                value={initialPrincipal}
                onChange={(e) => setInitialPrincipal(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับอัตราผลตอบแทน */}
            <TextField
                label="อัตราผลตอบแทน (%)"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ตัวเลือกสำหรับความถี่ของผลตอบแทน */}
            <FormControl fullWidth margin="normal">
                <InputLabel>ความถี่ของผลตอบแทน</InputLabel>
                <Select
                    value={interestFrequency}
                    onChange={(e) => setInterestFrequency(e.target.value)}
                >
                    <MenuItem value="monthly">รายเดือน</MenuItem>
                    <MenuItem value="yearly">รายปี</MenuItem>
                </Select>
            </FormControl>

            {/* ฟิลด์สำหรับอัตราเงินปันผล */}
            <TextField
                label="อัตราเงินปันผล (%)"
                type="number"
                value={dividendRate}
                onChange={(e) => setDividendRate(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ตัวเลือกสำหรับความถี่ของเงินปันผล */}
            <FormControl fullWidth margin="normal">
                <InputLabel>ความถี่ของเงินปันผล</InputLabel>
                <Select
                    value={dividendFrequency}
                    onChange={(e) => setDividendFrequency(e.target.value)}
                >
                    <MenuItem value="monthly">รายเดือน</MenuItem>
                    <MenuItem value="yearly">รายปี</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="อัตราการเพิ่มปันผลต่อปี (%)"
                type="number"
                value={dividendIncreaseRate}
                onChange={(e) => setDividendIncreaseRate(e.target.value)}
                fullWidth
                margin="normal"
            />
            {/* ฟิลด์สำหรับเปอร์เซ็นต์การนำเงินปันผลไปลงทุนต่อ */}
            <TextField
                label="นำเงินปันผลไปลงทุนต่อ (%)"
                type="number"
                value={dividendReinvestmentRate}
                onChange={(e) => setDividendReinvestmentRate(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับเงินออม */}
            <TextField
                label="เงินออม"
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ตัวเลือกสำหรับความถี่ของเงินออม */}
            <FormControl fullWidth margin="normal">
                <InputLabel>ความถี่ของเงินออม</InputLabel>
                <Select
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value)}
                >
                    <MenuItem value="monthly">รายเดือน</MenuItem>
                    <MenuItem value="yearly">รายปี</MenuItem>
                </Select>
            </FormControl>

            {/* ฟิลด์สำหรับอัตราการเพิ่มเงินออม */}
            <TextField
                label="อัตราการเพิ่มเงินออม (%)"
                type="number"
                value={contributionIncreaseRate}
                onChange={(e) => setContributionIncreaseRate(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับความผันผวน */}
            <TextField
                label="ความผันผวน (%)"
                type="number"
                value={volatility}
                onChange={(e) => setVolatility(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับจำนวนปีที่จะลงทุน */}
            <TextField
                label="จำนวนปีที่จะลงทุน"
                type="number"
                value={investmentYears}
                onChange={(e) => setInvestmentYears(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* ปุ่มส่งข้อมูล */}
            <Button variant="primary" type="submit" className="mt-3">
                คำนวณ
            </Button>
        </form>
    );
}

export default CalculatorForm;
