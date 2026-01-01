let taxChart = null; // Store chart instance

function calculateTax() {
    let income = parseFloat(document.getElementById("income").value) || 0;

    // ✅ **Old Regime: All deductions allowed**
    let deductions = 
        (parseFloat(document.getElementById("80C").value) || 0) +
        (parseFloat(document.getElementById("80D").value) || 0) +
        (parseFloat(document.getElementById("80E").value) || 0) +
        (parseFloat(document.getElementById("80CCD").value) || 0);
    
    let exemptions = parseFloat(document.getElementById("exemptions").value) || 0;

    // ✅ **New Regime: Only 80CCD(2) (Employer NPS) allowed**
    let newRegimeDeductions = parseFloat(document.getElementById("80CCD").value) || 0;

    // **Calculate taxable income for both regimes**
    let taxableIncomeOld = income - deductions - exemptions;
    let taxableIncomeNew = income -deductions- newRegimeDeductions;

    // **Calculate tax before rebate**
    let taxOld = calculateOldRegimeTax(taxableIncomeOld);
    let taxNew = calculateNewRegimeTax(taxableIncomeNew);

    // ✅ **Apply Section 87A Rebate if taxable income ≤ ₹12L**
    
    taxNew = apply87ARebate(taxableIncomeNew, taxNew);

    // Display Results
    document.getElementById("oldRegimeResult").innerHTML = `Old Regime Tax: ₹${taxOld}`;
    document.getElementById("newRegimeResult").innerHTML = `New Regime Tax: ₹${taxNew}`;

    // Compare and Suggest Best Option
    let bestOptionText = (taxOld < taxNew) ? "Old Regime is better!" : "New Regime is better!";
    document.getElementById("bestOption").innerHTML = `<strong>${bestOptionText}</strong>`;

    // Tax Saving Tips (Only for Old Regime)
    document.getElementById("taxSuggestions").innerHTML = getTaxSavingTips(deductions);

    // Generate Graph
    generateGraph(taxOld, taxNew);
}

// ✅ **Old Regime - All Deductions Allowed**
function calculateOldRegimeTax(income) {
    if (income <= 250000) return 0;
    else if (income <= 500000) return (income - 250000) * 0.05;
    else if (income <= 1000000) return 12500 + (income - 500000) * 0.2;
    else return 112500 + (income - 1000000) * 0.3;
}

// ✅ **New Regime - No general deductions (Only 80CCD(2) & 87A)**
function calculateNewRegimeTax(income) {
    if (income <= 250000) return 0;
    else if (income <= 600000) return (income - 250000) * 0.05;
    else if (income <= 1200000) return 17500 + (income - 600000) * 0.1;
    else if (income <= 1600000) return 77500 + (income - 1200000) * 0.15;
    else if (income <= 2000000) return 137500 + (income - 1600000) * 0.2;
    else if (income <= 2400000) return 217500 + (income - 2000000) * 0.25;
    else return 317500 + (income - 2400000) * 0.3;
}

// ✅ **Apply Section 87A Rebate (₹2,00,000 if taxable income ≤ ₹12L)**
function apply87ARebate(taxableIncome, tax) {
    if (taxableIncome <= 1200000) {
        return Math.max(tax - 200000, 0);
    }
    return tax;
}

// Tax Saving Tips (Only for Old Regime)
function getTaxSavingTips(deductions) {
    let suggestions = [];
    if (deductions < 150000) suggestions.push("Invest in 80C (PPF, LIC, ELSS) up to ₹1.5L");
    if (deductions < 25000) suggestions.push("Use 80D for health insurance premiums");
    if (deductions < 50000) suggestions.push("Contribute to NPS for extra ₹50K deduction (80CCD(1B))");
    
    return suggestions.length > 0 ? suggestions.join("<br>") : "No additional tax-saving options!";
}

// Generate Graph
function generateGraph(taxOld, taxNew) {
    let ctx = document.getElementById('taxChart').getContext('2d');

    // Destroy previous chart if exists
    if (taxChart !== null) {
        taxChart.destroy();
    }

    taxChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Old Regime', 'New Regime'],
            datasets: [{
                label: 'Tax Payable (₹)',
                data: [taxOld, taxNew],
                backgroundColor: ['#FF5733', '#33B5E5'],
                borderColor: ['#C70039', '#1E88E5'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
