// utils/calculations.js

export function calculateDCAInvestment(stocksData) {
    let allData = [];
    let yearlyData = [];

    // คำนวณจำนวนปีสูงสุด
    const maxInvestmentYears = Math.max(...stocksData.map(stock => stock.investmentYears));

    for (let year = 1; year <= maxInvestmentYears; year++) {
        let totalBalance = 0;
        let totalContribution = 0;
        let totalDividend = 0;
        let totalDividendTax = 0;
        let stockPortion = [];

        stocksData.forEach((stock) => {
            if (year > stock.investmentYears) return;

            const previousData = allData.filter(data => data.stockName === stock.stockName);

            // ราคาหุ้น ณ ปีนี้
            const stockPrice = stock.currentStockPrice * Math.pow(1 + stock.stockReturnRate / 100, year - 1);

            // เงินต้นสำหรับหุ้นนี้
            const initialPrincipal = stock.initialPrincipal || 0;

            // เงินออมต่อปี
            const annualContribution = stock.contribution * 12;

            // จำนวนหุ้นที่ได้จากเงินต้นในปีแรก
            let initialShares = 0;
            if (year === 1 && initialPrincipal > 0) {
                initialShares = initialPrincipal / stockPrice;
            }

            // จำนวนหุ้นที่ซื้อได้ในปีนี้จากเงินออม
            const sharesPurchased = annualContribution / stockPrice;

            // รวมจำนวนหุ้นที่ถืออยู่
            const previousTotalSharesHeld = previousData.length > 0 ? previousData[previousData.length - 1].totalSharesHeld : 0;
            const totalSharesHeld = previousTotalSharesHeld + sharesPurchased + initialShares;

            // คำนวณปันผลต่อหุ้น
            const dividendPerShare = (stock.dividendYield / 100) * Math.pow(1 + stock.dividendGrowthRate / 100, year - 1);

            // ปันผลที่ได้รับในปีนี้
            let dividendReceived = totalSharesHeld * (dividendPerShare);
            const dividendTax = dividendReceived * (stock.dividendTaxRate / 100);
            totalDividendTax += dividendTax;

            // หักภาษีจากปันผล
            dividendReceived = dividendReceived - dividendTax;

            // นำปันผลไปลงทุนต่อ
            const reinvestedDividendShares = (dividendReceived * (stock.dividendReinvestmentRate / 100)) / stockPrice;

            // อัปเดตจำนวนหุ้นที่ถืออยู่
            const newTotalSharesHeld = totalSharesHeld + reinvestedDividendShares;

            // มูลค่าของหุ้นที่ถืออยู่ ณ สิ้นปี
            const balance = newTotalSharesHeld * stockPrice;

            totalBalance += balance;
            totalContribution += annualContribution + initialPrincipal;
            totalDividend += dividendReceived;

            stockPortion.push({
                stockName: stock.stockName,
                balance,
                percentage: 0, // จะคำนวณภายหลัง
                totalSharesHeld: newTotalSharesHeld, // เพิ่มจำนวนหุ้นรวม
            });

            // เก็บข้อมูลรายปี
            allData.push({
                year,
                stockName: stock.stockName,
                stockPrice,
                sharesPurchased,
                initialShares,
                totalSharesHeld: newTotalSharesHeld,
                dividendReceived,
                balance,
                annualContribution,
                dividendTax,
            });
        });

        // คำนวณสัดส่วนของหุ้นแต่ละตัว
        stockPortion.forEach(stock => {
            stock.percentage = (stock.balance / totalBalance) * 100;
        });

        // เก็บข้อมูลสรุปประจำปี
        yearlyData.push({
            year,
            totalBalance,
            totalContribution,
            totalDividend,
            stockPortion,
            totalDividendTax,
        });
    }

    return {
        data: allData,
        yearlyData,
        portfolio: yearlyData[yearlyData.length - 1]?.stockPortion || [],
    };
}
