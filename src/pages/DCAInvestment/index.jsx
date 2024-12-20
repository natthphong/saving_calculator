// DCAInvestment.js

import React, { useState, useRef } from 'react';
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
        setStockCards([...stockCards, { id: stockCards.length + 1, stockData: null }]);
    };

    const handleDataChange = (id, data) => {
        setStockCards(stockCards.map(card => (card.id === id ? { ...card, stockData: data } : card)));
    };

    const handleCalculate = () => {
        const validData = stockCards.map(card => card.stockData).filter(data => data !== null);
        if (validData.length === stockCards.length) {
            // คำนวณเมื่อหุ้นทุกตัวมีข้อมูลครบ
            const calculations = calculateDCAInvestment(validData);
            if (calculations.data.length === 0) {
                alert("ไม่มีข้อมูลที่จะคำนวณ");
            } else {
                setResults(calculations);
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบทุกหุ้น");
        }
    };

    // Function to export PDF
    const exportToPDF = () => {
        const input = resultsRef.current;
        if (!input) {
            alert('ไม่มีข้อมูลที่จะส่งออก');
            return;
        }

        const marginTop = 100; // ระยะขอบด้านบน 100px

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
            let position = marginTop; // เริ่มต้นที่ marginTop

            // หัก marginTop จากความสูงที่เหลือ
            heightLeft -= marginTop;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > -pageHeight) {
                position = heightLeft - imgHeight + marginTop;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('Investment_Report.pdf');
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
                        onDataChange={handleDataChange}
                        onRemove={removeStockCard}
                    />
                ))}
                {/* ปุ่ม "เพิ่มหุ้น +" และ "คำนวณ" */}
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
