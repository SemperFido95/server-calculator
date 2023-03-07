const express = require('express');
const router = express.Router();

let calcs = [];

function getAnswer() {
    let calcObject = calcs[calcs.length - 1]
    switch(calcObject.operation) {
        case '+':
            calcObject.answer = calcObject.num1 + calcObject.num2;
            break;
        case '-':
            calcObject.answer = calcObject.num1 - calcObject.num2;
            break;
        case '*':
            calcObject.answer = calcObject.num1 * calcObject.num2;
            break;
        case '/':
            calcObject.answer = calcObject.num1 / calcObject.num2;
            break;
        default:
            console.log('invalid calculation');
    }
    console.log(calcObject.operation);
}


router.get('/', (req, res) => {
    console.log('GET request made for /calc');
    res.send(calcs);
});

router.post('/', (req, res) => {
    console.log('POST request made for /calc');
    console.log(req.body);
    let calcToAdd = req.body;
    calcs.push(calcToAdd);
    res.sendStatus(201);
    getAnswer();
});

router.delete('/', (req, res) => {
    res.sendStatus(200);
    calcs = [];
    console.log(calcs);
})


module.exports = router;