// const { math } = require("./mathjs");

const exprInput = document.getElementById("formula");
const aInput = document.getElementById("aNumber");
const bInput = document.getElementById("bNumber");
const errInput = document.getElementById("maxError");

const outputDiv = document.getElementById("output");

const actionButton = document.getElementById("executeButton");

const funct = (x) => {
    return Math.pow(Math.E, x) + x - 11;
};

const invE = 1 / Math.E;
const functB = (x) => {
    return Math.pow(Math.E, -x) - x;
};

const iterator = (a, b, maxErr, funct, tableResults = []) => {
    const avg = (b + a) / 2;
    const avgRes = funct(avg);
    const currentErr = Math.abs((b - a) / 2);
    const aRes = funct(a);
    const bRes = funct(b);
    tableResults.push([a, b, avg, aRes, bRes, avgRes, currentErr]);

    if (currentErr < maxErr) {
        return tableResults;
    }

    if (Math.sign(avgRes) == Math.sign(aRes)) {
        a = avg;
    } else {
        b = avg;
    }
    return iterator(a, b, maxErr, funct, tableResults);
};

actionButton.onclick = (evt) => {
    const scope = {
        e: Math.E,
    };
    const inputStr = "f(x) =" + exprInput.value;
    console.log(inputStr);
    const f = math.evaluate(inputStr, scope);
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const maxErr = parseFloat(errInput.value);

    const fa = f(a)
    const fb = f(b)

    let opHtml = ""
    if (Math.sign(fa) == Math.sign(fb)) {
        opHtml = `<div class="error">f(a) (${fa}) y f(b) (${fb}) tienen el mismo signo. Para poder aproximar con este algoritmo deben tener signos opuestos.</div>`;
    } else {
        const ress = iterator(a, b, maxErr, f);
        opHtml = `
        <table>
        <tr>
            <th>a</th>
            <th>b</th>
            <th>xMed</th>
            <th>f(a)</th>
            <th>f(b)</th>
            <th>f(xMed)</th>
            <th>err</th>
        </tr>
        `;
        ress.forEach((res) => {
            opHtml += `
            <tr>
                <td>${res[0]}</td>
                <td>${res[1]}</td>
                <td class="xMed">${res[2]}</td>
                <td>${res[3]}</td>
                <td>${res[4]}</td>
                <td>${res[5]}</td>
                <td>${res[6]}</td>
            </tr>
            `;
        });
        opHtml += "</table>";
    }
    outputDiv.innerHTML = opHtml;
};
// const approx = iterator(0, 1, 0.005, functB);
// console.log(approx);
