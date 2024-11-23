// utils/calculations.js

export function calculateDCAInvestment(stocksData) {
    let allData = [];
    let yearlyData = [];
    let portfolio = [];

    // คำนวณจำนวนปีสูงสุด
    const maxInvestmentYears = Math.max(...stocksData.map(stock => stock.investmentYears));

    for (let year = 1; year <= maxInvestmentYears; year++) {
        let totalBalance = 0;
        let totalContribution = 0;
        let totalDividend = 0;
        let stockPortion = [];

        stocksData.forEach((stock, index) => {
            if (year > stock.investmentYears) return;

            const previousData = allData.filter(data => data.stockName === stock.stockName);

            // ราคาหุ้น ณ ปีนี้
            const stockPrice = stock.currentStockPrice * Math.pow(1 + stock.stockReturnRate / 100, year - 1);

            // เงินออมต่อปี
            const annualContribution = stock.contribution * 12;

            // จำนวนหุ้นที่ซื้อได้ในปีนี้
            const sharesPurchased = annualContribution / stockPrice;

            // รวมจำนวนหุ้นที่ถืออยู่
            const totalSharesHeld = sharesPurchased + (previousData.length > 0 ? previousData[previousData.length - 1].totalSharesHeld : 0);

            // คำนวณปันผลต่อหุ้น
            const dividendPerShare = (stock.dividendYield / 100) * Math.pow(1 + stock.dividendGrowthRate / 100, year - 1);

            // ปันผลที่ได้รับในปีนี้
            const dividendReceived = totalSharesHeld * dividendPerShare;

            // นำปันผลไปลงทุนต่อ
            const reinvestedDividend = (dividendReceived * (stock.dividendReinvestmentRate / 100)) / stockPrice;

            // อัปเดตจำนวนหุ้นที่ถืออยู่
            const newTotalSharesHeld = totalSharesHeld + reinvestedDividend;

            // มูลค่าของหุ้นที่ถืออยู่ ณ สิ้นปี
            const balance = newTotalSharesHeld * stockPrice;

            totalBalance += balance;
            totalContribution += annualContribution;
            totalDividend += dividendReceived;

            stockPortion.push({
                stockName: stock.stockName,
                balance,
                percentage: 0, // จะคำนวณภายหลัง
            });

            // เก็บข้อมูลรายปี
            allData.push({
                year,
                stockName: stock.stockName,
                stockPrice,
                sharesPurchased,
                totalSharesHeld: newTotalSharesHeld,
                dividendReceived,
                balance,
                annualContribution,
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
        });
    }

    return {
        data: allData,
        yearlyData,
        portfolio: yearlyData[yearlyData.length - 1].stockPortion,
    };
}
