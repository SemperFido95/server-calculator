console.log('script sourced.');

let operation = '';

let getOperation = symbol => {
    operation = symbol;
    console.log(operation);
}

let getCalc = () => {
    axios.get('/calc').then((response) => {
        console.log(response);
        let calcsFromServer = response.data;
        let answerDiv = document.getElementById('answer');
        answerDiv.innerHTML = calcsFromServer[calcsFromServer.length - 1].answer;
        let historyDiv = document.getElementById('history') ;
        historyDiv.innerHTML = '';
        for (let calc of calcsFromServer) {
            historyDiv.innerHTML += `
            <p>${calc.num1} ${calc.operation} ${calc.num2} = ${calc.answer}</p>
            `
        }
    });
}

let submitForm = event => {
    event.preventDefault();
    if (operation === '') {
        alert('please select an operator')
    } else {
        console.log(event);
        let num1 = event.target[0].valueAsNumber;
        let num2 = event.target[5].valueAsNumber;
        let calcForServer = {
            num1,
            operation,
            num2
        };
        axios.post('/calc', calcForServer).then((response) => {
            console.log(response);
            getCalc();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong.');
        })
    }
    
}

let clearInput = () => {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    operation = '';
}

function addToInput(event) {
    console.log('testing');
    console.log(event)
    let textToAdd = event.target
    let inputDiv = document.getElementById('input-field');
    inputDiv.innerHTML += 
}