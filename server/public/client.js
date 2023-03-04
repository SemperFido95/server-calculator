console.log('script sourced.');

let operation = '';

// let getOperation = symbol => {
//     operation = symbol;
//     console.log(operation);
// }

let getCalc = () => {
    axios.get('/calc').then((response) => {
        console.log(response);
        let calcsFromServer = response.data;
        let answerDiv = document.getElementById('input-field');
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
    console.log(event);
    let toArray = document.getElementById('input-field').innerHTML.split(' ');
    toArray.forEach(element => {
        switch (element) {
            case '+':
                operation = '+';
                break;
            case '-':
                operation = '-';
                break;
            case '*':
                operation = '*';
                break;
            case '/':
                operation = '/';
                break;
        }
    });
    console.log(operation);
    if (operation === '') {
        alert('Please select an operator.');
    } else {
        let num1 = parseFloat(toArray[0]);
        let num2 = parseFloat(toArray[2]);
        console.log(num1);
        console.log('num1:', num1);
        console.log('num2:', num2);
        if (isNaN(num1) || isNaN(num2)) {
            alert('invalid calculation. Please try again');
        } else {
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
            });
        }
        
    }
}

// let submitForm = event => {
//     event.preventDefault();
//     if (operation === '') {
//         alert('please select an operator')
//     } else {
//         console.log(event);
//         let num1 = event.target[0].valueAsNumber;
//         let num2 = event.target[5].valueAsNumber;
//         let calcForServer = {
//             num1,
//             operation,
//             num2
//         };
        // axios.post('/calc', calcForServer).then((response) => {
        //     console.log(response);
        //     getCalc();
        // }).catch((error) => {
        //     console.log(error);
        //     alert('Something went wrong.');
        // })
//     }
    
// }

let clearInput = () => {
    document.getElementById('input-field').value = '';
    operation = '';
}

function addToInput(event) {
    console.log('testing');
    console.log(event);
    let textToAdd = event.target.value;
    console.log(textToAdd);
    let inputDiv = document.getElementById('input-field');
    switch (textToAdd) {
        case '+':
            inputDiv.innerHTML += ` ${textToAdd} `;
            break;
        case '-':
            inputDiv.innerHTML += ` ${textToAdd} `;
            break;
        case '*':
            inputDiv.innerHTML += ` ${textToAdd} `;
            break;
        case '/':
                inputDiv.innerHTML += ` ${textToAdd} `;
                break;
        default:
            inputDiv.innerHTML += textToAdd;
    }
}