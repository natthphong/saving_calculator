import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Button } from 'react-bootstrap';

function CalculatorForm(props) {
    // สร้างสถานะ (state) สำหรับฟิลด์ต่างๆ
    const [initialPrincipal, setInitialPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [dividendRate, setDividendRate] = useState('');
    const [dividendFrequency, setDividendFrequency] = useState('monthly');
    const [dividendReinvestmentRate, setDividendReinvestmentRate] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [contributionIncreaseRate, setContributionIncreaseRate] = useState('');
    const [volatility, setVolatility] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = (event) => {
        event.preventDefault();

        // สร้างวัตถุพารามิเตอร์เพื่อส่งไปยังฟังก์ชันคำนวณ
        const params = {
            initialPrincipal: parseFloat(initialPrincipal) || 0,
            interestRate: parseFloat(interestRate) || 0,
            frequency,
            dividendRate: parseFloat(dividendRate) || 0,
            dividendFrequency,
            dividendReinvestmentRate: parseFloat(dividendReinvestmentRate) || 0,
            monthlyContribution: parseFloat(monthlyContribution) || 0,
            contributionIncreaseRate: parseFloat(contributionIncreaseRate) || 0,
            volatility: parseFloat(volatility) || 0,
            investmentYears: parseInt(investmentYears) || 0,
        };

        // เรียกใช้ฟังก์ชัน onCalculate ที่ส่งมาทาง props
        if (props.onCalculate) {
            props.onCalculate(params);
        }
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงของฟิลด์ต่างๆ
    const handleInitialPrincipalChange = (event) => {
        setInitialPrincipal(event.target.value);
    };

    const handleInterestRateChange = (event) => {
        setInterestRate(event.target.value);
    };

    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
    };

    const handleDividendRateChange = (event) => {
        setDividendRate(event.target.value);
    };

    const handleDividendFrequencyChange = (event) => {
        setDividendFrequency(event.target.value);
    };

    const handleDividendReinvestmentRateChange = (event) => {
        setDividendReinvestmentRate(event.target.value);
    };

    const handleMonthlyContributionChange = (event) => {
        setMonthlyContribution(event.target.value);
    };

    const handleContributionIncreaseRateChange = (event) => {
        setContributionIncreaseRate(event.target.value);
    };

    const handleVolatilityChange = (event) => {
        setVolatility(event.target.value);
    };

    const handleInvestmentYearsChange = (event) => {
        setInvestmentYears(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ฟิลด์สำหรับเงินต้น */}
            <TextField
                label="เงินต้น"
                type="number"
                value={initialPrincipal}
                onChange={handleInitialPrincipalChange}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับอัตราผลตอบแทน */}
            <TextField
                label="อัตราผลตอบแทน (%)"
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                fullWidth
                margin="normal"
            />

            {/* ตัวเลือกสำหรับความถี่ของผลตอบแทน */}
            <FormControl fullWidth margin="normal">
                <InputLabel>ความถี่ของผลตอบแทน</InputLabel>
                <Select value={frequency} onChange={handleFrequencyChange} variant='filled'>
                    <MenuItem value="monthly">รายเดือน</MenuItem>
                    <MenuItem value="yearly">รายปี</MenuItem>
                </Select>
            </FormControl>

            {/* ฟิลด์สำหรับอัตราเงินปันผล */}
            <TextField
                label="อัตราเงินปันผล (%)"
                type="number"
                value={dividendRate}
                onChange={handleDividendRateChange}
                fullWidth
                margin="normal"
            />

            {/* ตัวเลือกสำหรับความถี่ของเงินปันผล */}
            <FormControl fullWidth margin="normal">
                <InputLabel>ความถี่ของเงินปันผล</InputLabel>
                <Select value={dividendFrequency} onChange={handleDividendFrequencyChange} variant='filled'>
                    <MenuItem value="monthly">รายเดือน</MenuItem>
                    <MenuItem value="yearly">รายปี</MenuItem>
                </Select>
            </FormControl>

            {/* ฟิลด์สำหรับเปอร์เซ็นต์การนำเงินปันผลไปลงทุนต่อ */}
            <TextField
                label="นำเงินปันผลไปลงทุนต่อ (%)"
                type="number"
                value={dividendReinvestmentRate}
                onChange={handleDividendReinvestmentRateChange}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับเงินออมต่อเดือน */}
            <TextField
                label="เงินออมต่อเดือน"
                type="number"
                value={monthlyContribution}
                onChange={handleMonthlyContributionChange}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับอัตราการเพิ่มเงินออม */}
            <TextField
                label="อัตราการเพิ่มเงินออมต่อเดือน (%)"
                type="number"
                value={contributionIncreaseRate}
                onChange={handleContributionIncreaseRateChange}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับความผันผวน */}
            <TextField
                label="ความผันผวน (%)"
                type="number"
                value={volatility}
                onChange={handleVolatilityChange}
                fullWidth
                margin="normal"
            />

            {/* ฟิลด์สำหรับจำนวนปีที่จะลงทุน */}
            <TextField
                label="จำนวนปีที่จะลงทุน"
                type="number"
                value={investmentYears}
                onChange={handleInvestmentYearsChange}
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
