// DCAInvestment.js

import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DCACalculatorForm from './components/DCACalculatorForm';
import DCAResultsGraph from './components/DCAResultsGraph';
import DCAResultsTable from './components/DCAResultsTable';
import PortfolioOverview from './components/PortfolioOverview';
import { calculateDCAInvestment } from './utils/calculations';

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

function DCAInvestment() {
    const [stockCards, setStockCards] = useState([
        { id: 1, stockData: null },
    ]);
    const [results, setResults] = useState(null);
    const removeStockCard = (id) => {
        setStockCards(stockCards.filter(card => card.id !== id));
    };
    const addStockCard = () => {
        setStockCards([...stockCards, { id: stockCards.length + 1, stockData: null }]);
    };

    const handleCalculate = () => {
        const calculations = calculateDCAInvestment(stockCards.map(card => card.stockData));
        setResults(calculations);
    };

    const updateStockData = (id, data) => {
        setStockCards(stockCards.map(card => (card.id === id ? { ...card, stockData: data } : card)));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1 className="my-4">การคำนวณการลงทุนแบบ DCA By Tar</h1>
                {stockCards.map((card) => (
                    <DCACalculatorForm
                        key={card.id}
                        id={card.id}
                        onUpdate={updateStockData}
                        onRemove={removeStockCard}
                    />
                ))}
                <Button variant="success" onClick={addStockCard} className="mt-3">
                    เพิ่มหุ้น +
                </Button>
                <Button variant="primary" onClick={handleCalculate} className="mt-3 ml-3">
                    คำนวณ
                </Button>
                {results && (
                    <>
                        <DCAResultsGraph data={results.data} />
                        <DCAResultsTable yearlyData={results.yearlyData} />
                        <PortfolioOverview portfolio={results.portfolio} />
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default DCAInvestment;
