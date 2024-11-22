// CalculatorSaving.js

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalculatorForm from './CalculatorForm';
import ResultsGraph from './ResultsGraph';
import ResultsTable from './ResultsTable';
import { calculateInvestment } from './utils/calculations';

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
    const [results, setResults] = useState(null);

    const handleCalculate = (params) => {
        const calculationResults = calculateInvestment(params);
        setResults(calculationResults);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1 className="my-4">การคำนวณการออมเงิน By Tar</h1>
                <CalculatorForm onCalculate={handleCalculate} />
                {results && (
                    <>
                        <ResultsGraph data={results.data} />
                        <ResultsTable yearlyData={results.yearlyData} />
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default CalculatorSaving;
