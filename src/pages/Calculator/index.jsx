// CalculatorSaving.js

import React, {useRef, useState} from 'react';
import {Button, Container} from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalculatorForm from './CalculatorForm';
import ResultsGraph from './ResultsGraph';
import ResultsTable from './ResultsTable';
import { calculateInvestment } from './utils/calculations';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


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
    const resultsRef = useRef();
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

            pdf.save('Saving_Report.pdf');
        });
    };

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
                        <div ref={resultsRef}>
                            <ResultsGraph data={results.data}/>
                            <ResultsTable yearlyData={results.yearlyData}/>
                        </div>

                        <Button variant="secondary" onClick={exportToPDF} className="mt-3">
                            ส่งออกเป็น PDF
                        </Button>
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default CalculatorSaving;
