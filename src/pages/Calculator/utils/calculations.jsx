// calculations.js

export function calculateInvestment(params) {
    const {
        initialPrincipal = 0,
        interestRate = 0,
        interestFrequency = 'yearly',
        dividendRate = 0,
        dividendFrequency = 'yearly',
        dividendReinvestmentRate = 0,
        contribution = 0,
        contributionFrequency = 'monthly',
        contributionIncreaseRate = 0,
        volatility = 0,
        investmentYears = 0,
        dividendIncreaseRate = 0,
        dividendTaxRate = 0,
    } = params;

    // กำหนดความถี่ต่อปี
    const frequencies = {
        yearly: 1,
        monthly: 12,
    };

    const interestPeriodsPerYear = frequencies[interestFrequency];
    const dividendPeriodsPerYear = frequencies[dividendFrequency];
    const contributionPeriodsPerYear = frequencies[contributionFrequency];

    // คำนวณจำนวนงวดทั้งหมด (ใช้ความถี่สูงสุดเพื่อความถูกต้อง)
    const maxPeriodsPerYear = Math.max(
        interestPeriodsPerYear,
        dividendPeriodsPerYear,
        contributionPeriodsPerYear
    );
    const totalPeriods = investmentYears * maxPeriodsPerYear;

    // อัตราดอกเบี้ยและเงินปันผลต่องวด
    const ratePerInterestPeriod = (interestRate / 100) / interestPeriodsPerYear;
    const dividendGrowthRate = dividendIncreaseRate / 100; // เปลี่ยนชื่อเพื่อความชัดเจน
    const reinvestmentRate = dividendReinvestmentRate / 100;
    const currentDividendTaxRate = dividendTaxRate/100;
    const contributionIncreasePerPeriod =
        (contributionIncreaseRate / 100) / contributionPeriodsPerYear;

    let data = [];
    let balance = initialPrincipal;
    let totalContribution = 0;
    let totalInterest = 0;
    let totalDividend = 0;
    let currentContribution = contribution;

    // สร้างตัวแปรสำหรับสรุปผลรายปี
    let yearlyData = [];

    // เก็บอัตราเงินปันผลเริ่มต้น
    const initialDividendRate = dividendRate / 100;

    for (let period = 1; period <= totalPeriods; period++) {
        // คำนวณปีปัจจุบัน
        const year = Math.ceil(period / maxPeriodsPerYear);

        // คำนวณอัตราเงินปันผลปัจจุบันตามอัตราการเติบโต
        const currentDividendRate =
            initialDividendRate * Math.pow(1 + dividendGrowthRate, year - 1);
        const ratePerDividendPeriod = currentDividendRate / dividendPeriodsPerYear;

        // ความผันผวน
        const randomVolatility =
            (Math.random() * 2 - 1) * (volatility / 100);

        // ดอกเบี้ย
        let interest = 0;
        if (
            (period - 1) %
            (maxPeriodsPerYear / interestPeriodsPerYear) ===
            0
        ) {
            const adjustedRate = ratePerInterestPeriod + randomVolatility;
            interest = balance * adjustedRate;
            totalInterest += interest;
        }

        // เงินปันผล
        let dividend = 0;
        let dividendTax = 0;
        let reinvestedDividend = 0;
        if (
            (period - 1) %
            (maxPeriodsPerYear / dividendPeriodsPerYear) ===
            0
        ) {

            dividend = (balance * ratePerDividendPeriod)
            dividendTax = currentDividendTaxRate * dividend
            dividend = dividend-dividendTax
            reinvestedDividend = dividend * reinvestmentRate;
            totalDividend += dividend;
        }

        // เงินออม
        let contributionThisPeriod = 0;
        if (
            (period - 1) %
            (maxPeriodsPerYear / contributionPeriodsPerYear) ===
            0
        ) {
            contributionThisPeriod = currentContribution;
            totalContribution += contributionThisPeriod;
            // เพิ่มเงินออมตามอัตราที่กำหนด
            currentContribution +=
                currentContribution * contributionIncreasePerPeriod;
        }

        // อัปเดตยอดเงิน
        balance += interest + reinvestedDividend + contributionThisPeriod;

        // เก็บข้อมูลในแต่ละงวด
        data.push({
            period,
            year,
            balance,
            interest,
            totalInterest,
            dividend,
            totalDividend,
            reinvestedDividend,
            contribution: contributionThisPeriod,
            totalContribution,
            currentDividendRate: currentDividendRate * 100, // เก็บอัตราเงินปันผลปัจจุบัน (%)
            dividendTax,
        });

        // สรุปผลรายปี
        if (period % maxPeriodsPerYear === 0) {
            // ดึงข้อมูลของปีนั้น
            const periodsInYear = data.slice(
                period - maxPeriodsPerYear,
                period
            );

            // สรุปยอดเงินออม, ดอกเบี้ย, และเงินปันผลในปีนั้น
            const yearlyContribution = periodsInYear.reduce(
                (sum, p) => sum + p.contribution,
                0
            );
            const yearlyInterest = periodsInYear.reduce(
                (sum, p) => sum + p.interest,
                0
            );
            const yearlyDividend = periodsInYear.reduce(
                (sum, p) => sum + p.dividend,
                0
            );
            const yearlyDividendTax = periodsInYear.reduce(
                (sum, p) => sum + p.dividendTax,
                0
            );

            // ยอดเงินปลายปี
            const endOfYearBalance =
                periodsInYear[periodsInYear.length - 1].balance;

            // เก็บข้อมูลรายปี
            yearlyData.push({
                year,
                balance: endOfYearBalance,
                totalContribution,
                totalInterest,
                totalDividend,
                yearlyContribution,
                yearlyInterest,
                yearlyDividend,
                currentDividendRate: currentDividendRate * 100, // เก็บอัตราเงินปันผลปัจจุบัน (%)
                yearlyDividendTax,
            });
        }
    }

    return {
        data, // ข้อมูลทุกงวด
        yearlyData, // ข้อมูลสรุปต่อปี
    };
}

export const numberFormatter = (value) =>
    value.toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
    });
