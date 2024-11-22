// CalculatorSaving.js

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalculatorForm from './CalculatorForm';
import ResultsGraph from './ResultsGraph';
import ResultsTable from './ResultsTable';
import { calculateInvestment } from './utils/calculations'; // ฟังก์ชันคำนวณที่เราจะสร้างขึ้น

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // สีน้ำเงิน
        },
        secondary: {
            main: '#dc004e', // สีแดง
        },
    },
});

function CalculatorSaving() {
    // สถานะสำหรับเก็บผลการคำนวณ
    const [results, setResults] = useState(null);

    // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้ส่งข้อมูลจากฟอร์ม
    const handleCalculate = (params) => {
        // เรียกใช้ฟังก์ชันคำนวณและเก็บผลลัพธ์ในสถานะ
        const calculationResults = calculateInvestment(params);
        setResults(calculationResults);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1 className="my-4">การคำนวณการออมเงิน</h1>
                <CalculatorForm onCalculate={handleCalculate} />
                {results && (
                    <>
                        <ResultsGraph data={results} />
                        <ResultsTable data={results} />
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default CalculatorSaving;
