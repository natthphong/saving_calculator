// DCAInvestment.js

import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DCACalculatorForm from './components/DCACalculatorForm';
import DCAResultsGraph from './components/DCAResultsGraph';
import DCAResultsTable from './components/DCAResultsTable';
import PortfolioOverview from './components/PortfolioOverview';
import { calculateDCAInvestment } from './utils/calculations';

// Import jsPDF and html2canvas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    // Reference to the results section
    const resultsRef = useRef();

    const removeStockCard = (id) => {
        setStockCards(stockCards.filter(card => card.id !== id));
    };

    const addStockCard = () => {
        setStockCards([...stockCards, { id: Date.now(), stockData: null }]);
    };

    const handleCalculate = () => {
        const validData = stockCards.map(card => card.stockData).filter(data => data !== null);
        const calculations = calculateDCAInvestment(validData);
        if (calculations.data.length === 0) {
            alert("no data")
        }else{
            setResults(calculations);
        }


    };

    const updateStockData = (id, data) => {
        setStockCards(stockCards.map(card => (card.id === id ? { ...card, stockData: data } : card)));
    };

    // Function to export PDF
    const exportToPDF = () => {
        const input = resultsRef.current;
        if (!input) {
            alert('ไม่มีข้อมูลที่จะส่งออก');
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });

            // Calculate width and height to fit A4
            const imgWidth = 595.28;
            const pageHeight = 841.89;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('DCA_Investment_Report.pdf');
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1 className="my-4">การคำนวณการลงทุนแบบ DCA By Tar</h1>
                {stockCards.map((card) => (
                    <DCACalculatorForm
                        key={card.id}
                        id={card.id}
                        stockData={card.stockData}
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
                        {/* Wrap the results in a div with ref */}
                        <div ref={resultsRef}>
                            <DCAResultsGraph data={results.data} />
                            <DCAResultsTable yearlyData={results.yearlyData} />
                            <PortfolioOverview portfolio={results.portfolio} />
                        </div>
                        {/* Add Export to PDF button */}
                        <Button variant="secondary" onClick={exportToPDF} className="mt-3">
                            ส่งออกเป็น PDF
                        </Button>
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default DCAInvestment;
