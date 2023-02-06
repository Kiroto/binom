// const { math } = require("./mathjs");

const exprInput = document.getElementById("formula")
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
    const currentErr = (b - a) / 2;
    const aRes = funct(a);
    const bRes = funct(b);
    tableResults.push([a, b, avg, aRes, bRes, avgRes, currentErr])

    console.log(
        `${a.toFixed(8).padStart(15)}|${b.toFixed(8).padStart(15)}|${avg
            .toFixed(8)
            .padStart(15)}|${aRes.toFixed(8).padStart(15)}|${bRes
            .toFixed(8)
            .padStart(15)}|${avgRes.toFixed(8).padStart(15)}|${currentErr
            .toFixed(8)
            .padStart(15)}`
    );

    if (currentErr < maxErr) {
        return avg;
    }

    if (Math.sign(avgRes) == Math.sign(aRes)) {
        a = avg
    } else {
        b = avg
    }
    return iterator(a, b, maxErr, funct, tableResults);
};

actionButton.onclick = (evt) => {
    const scope = {
        "e": Math.E
    }
    const f = math.evaluate("f(x) =" + exprInput.value, scope);
    const res = iterator(2, 3, 0.005, f);
    console.log(res)
}
// const approx = iterator(0, 1, 0.005, functB);
// console.log(approx);
