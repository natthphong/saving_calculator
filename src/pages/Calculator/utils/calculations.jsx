// utils/calculations.js

export function calculateInvestment(params) {
    const {
        initialPrincipal = 0,
        interestRate = 0,
        frequency = 'monthly',
        dividendRate = 0,
        dividendFrequency = 'monthly',
        dividendReinvestmentRate = 0,
        monthlyContribution = 0,
        contributionIncreaseRate = 0,
        volatility = 0,
        investmentYears = 0,
    } = params;

    const periodsPerYear = frequency === 'monthly' ? 12 : 1;
    const totalPeriods = investmentYears * periodsPerYear;
    const ratePerPeriod = (interestRate / 100) / periodsPerYear;
    const dividendPerPeriod = (dividendRate / 100) / (dividendFrequency === 'monthly' ? 12 : 1);
    const reinvestmentRate = dividendReinvestmentRate / 100;
    const contributionIncreasePerPeriod = contributionIncreaseRate / 100 / periodsPerYear;

    let data = [];
    let balance = initialPrincipal;
    let contribution = monthlyContribution;

    for (let period = 1; period <= totalPeriods; period++) {
        // ความผันผวน
        const randomVolatility = (Math.random() * 2 - 1) * (volatility / 100);
        const adjustedRate = ratePerPeriod + randomVolatility;

        // ดอกเบี้ย
        const interest = balance * adjustedRate;

        // เงินปันผล
        const dividend = balance * dividendPerPeriod;

        // เงินปันผลที่นำไปลงทุนต่อ
        const reinvestedDividend = dividend * reinvestmentRate;

        // อัปเดตยอดเงิน
        balance += interest + reinvestedDividend + contribution;

        // เก็บข้อมูล
        data.push({
            period,
            balance,
            interest,
            dividend,
            reinvestedDividend,
            contribution,
        });

        // เพิ่มเงินออมตามอัตราที่กำหนด
        contribution += contribution * contributionIncreasePerPeriod;
    }

    return data;
}
