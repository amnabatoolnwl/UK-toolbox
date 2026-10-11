
const search = document.getElementById("search");

search.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    document.querySelectorAll(".tools .card").forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
    });
});

function openTool(tool) {
    const area = document.getElementById("tool-area");

    if (tool === "words") {
        area.innerHTML = `
            <div class="card">
                <h2>Word Counter</h2>
                <textarea id="text-input" rows="6"
                    placeholder="Type or paste your text here..."
                    style="width:100%;padding:12px;margin-top:12px;border:1px solid #ddd;border-radius:8px"></textarea>
                <p id="word-result">Words: 0 | Characters: 0</p>
            </div>`;

        document.getElementById("text-input").addEventListener("input", function () {
            const text = this.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const characters = this.value.length;

            document.getElementById("word-result").textContent =
                `Words: ${words} | Characters: ${characters}`;
        });
    }

    else if (tool === "dates") {
        area.innerHTML = `
            <div class="card">
                <h2>Date Calculator</h2>
                <label for="start-date">Start date</label>
                <input type="date" id="start-date"
                    style="display:block;margin:10px 0;padding:10px">

                <label for="end-date">End date</label>
                <input type="date" id="end-date"
                    style="display:block;margin:10px 0;padding:10px">

                <button onclick="calculateDates()">Calculate Days</button>
                <p id="date-result"></p>
            </div>`;
    }

    else if (tool === "salary") {
        area.innerHTML = `
            <div class="card">
                <h2>UK Salary Estimator</h2>
                <p>Enter your annual salary in pounds (£).</p>
                <input type="number" id="salary-input"
                    min="0" placeholder="e.g. 30000"
                    style="display:block;margin:12px 0;padding:12px;width:100%">

                <button onclick="calculateSalary()">Estimate Pay</button>
                <p id="salary-result">
                    This is a simplified estimate, not an official tax calculation.
                </p>
            </div>`;
    }

    area.scrollIntoView({ behavior: "smooth", block: "start" });
}

function calculateDates() {
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    const result = document.getElementById("date-result");

    if (!start || !end) {
        result.textContent = "Please select both dates.";
        return;
    }

    const startDate = new Date(start + "T00:00:00Z");
    const endDate = new Date(end + "T00:00:00Z");

    const days = Math.abs(endDate - startDate) / 86400000;

    result.textContent = `There are ${days} days between the dates.`;
}

function calculateSalary() {
    const input = document.getElementById("salary-input");
    const salary = Number(input.value);
    const result = document.getElementById("salary-result");

    if (input.value.trim() === "" || !Number.isFinite(salary) || salary < 0) {
        result.textContent = "Please enter a valid salary.";
        return;
    }

    const personalAllowance = 12570;
    const basicRateLimit = 37700;

    const taxableIncome = Math.max(0, salary - personalAllowance);
    const basicTax = Math.min(taxableIncome, basicRateLimit) * 0.20;
    const higherTax = Math.max(0, taxableIncome - basicRateLimit) * 0.40;
    const incomeTax = basicTax + higherTax;

    const nationalInsurance = Math.max(0, salary - 12570) * 0.08;
    const takeHome = salary - incomeTax - nationalInsurance;

    result.textContent =
        `Simplified estimated yearly take-home pay: £${takeHome.toFixed(2)}. Actual UK deductions may differ.`;
}
