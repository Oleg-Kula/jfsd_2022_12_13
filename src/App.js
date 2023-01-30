import React from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import HistoryList from "./HistoryList";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            operation: null,
            prevNumber: 0,
            currentNumber: '',
            isOperation: false,
            history: [],
            examples: [],
        };
    }

    handleClick(i){
        this.setState({
            currentNumber: Number('' + this.state.currentNumber + i),
            display: this.state.display + i,
        })
    }

    handleOperationClick(o){
        const current = this.state.currentNumber;
        const prev = this.state.prevNumber;
        const operation = this.state.operation;

        if(current === ''){
            let display = this.state.display;
            display = display.slice(0, -2);
            this.setState({
                operation: o,
                display: display + o + " ",
            })
            return;
        }

        if(this.state.isOperation === true){
           let result = this.calculate(prev, current, operation);
           let history = this.state.history;
           history.push(this.state.display + " = " + result)

           this.setState({
               prevNumber: result,
               display: '' + result + " " + o + " ",
               currentNumber: '',
               operation: o,
               history: history,
           })
        } else {
            this.setState({
                operation: o,
                prevNumber: current,
                currentNumber: '',
                display: this.state.display + " " + o + " ",
                isOperation: true,
            })
        }
    }

    handleResultClick(){
        if(!this.state.isOperation || this.state.currentNumber === '') return;

        let current = this.state.currentNumber;
        let prev = this.state.prevNumber;
        let operation = this.state.operation;
        let result = this.calculate(prev, current, operation);
        let history = this.state.history;
        history.push(this.state.display + " = " + result)

        this.setState({
            isOperation: false,
            operation: null,
            display: '' + result,
            currentNumber: result,
            prevNumber: 0,
            history: history,
        })
    }

    handleResetClick(){
        this.setState({
            display: '',
            operation: null,
            prevNumber: 0,
            currentNumber: '',
            isOperation: false,
        });
    }

    handleResetHistory(){
        this.setState({
           history: [],
        });
    }

    handleGetClick(){
        fetch("http://localhost:8080/math/examples?count=4")
            .then((res) => res.json())
            .then((data) => {
                this.calcExamples(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    calculate(x, y, o){
        if(o === '+'){
            return x+y;
        }
        if(o === '-'){
            return x-y;
        }
        if(o === '/'){
            return x/y;
        }
        if(o === '*'){
            return x*y;
        }
    }

    calcExamples(examples){
        let x;
        let y;
        let o;
        let string = '';
        const operators = ['+','-','*','/'];

        const result = examples.map(example =>{
            for(let i = 0; i<=example.length; i++){
                for(let j = 0; j <= operators.length-1; j++){
                    if(example[i] === operators[j]){
                        x = (example.split(operators[j]))[0];
                        x = Number(x);
                        y = (example.split(operators[j]))[1];
                        y = Number(y);
                        o = operators[j];
                        string = example + ' = ' + this.calculate(x, y, o);
                    }
                }
            }
            return string;
        });
        const history = this.state.history.concat(result);
        this.setState({
            history: history,
        })
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"display"}>
                    <CalculatorDisplay display={this.state.display}/>
                </div>
                <div>
                    <CalculatorButton buttonValue={1} onClick={() =>this.handleClick(1)}/>
                    <CalculatorButton buttonValue={2} onClick={() =>this.handleClick(2)}/>
                    <CalculatorButton buttonValue={3} onClick={() =>this.handleClick(3)}/>
                    <CalculatorButton buttonValue={'+'} onClick={() =>this.handleOperationClick('+')}/>
                </div>
                <div>
                    <CalculatorButton buttonValue={4} onClick={() =>this.handleClick(4)}/>
                    <CalculatorButton buttonValue={5} onClick={() =>this.handleClick(5)}/>
                    <CalculatorButton buttonValue={6} onClick={() =>this.handleClick(6)}/>
                    <CalculatorButton buttonValue={'-'} onClick={() =>this.handleOperationClick('-')}/>
                </div>
                <div>
                    <CalculatorButton buttonValue={7} onClick={() =>this.handleClick(7)}/>
                    <CalculatorButton buttonValue={8} onClick={() =>this.handleClick(8)}/>
                    <CalculatorButton buttonValue={9} onClick={() =>this.handleClick(9)}/>
                    <CalculatorButton buttonValue={'*'} onClick={() =>this.handleOperationClick('*')}/>
                </div>
                <div>
                    <CalculatorButton buttonValue={'/'} onClick={() =>this.handleOperationClick('/')}/>
                    <CalculatorButton buttonValue={0} onClick={() =>this.handleClick(0)}/>
                    <CalculatorButton buttonValue={'='} onClick={() =>this.handleResultClick()}/>
                    <CalculatorButton buttonValue={'CE'} onClick={() => this.handleResetClick()}/>
                </div>
                <div>
                    <CalculatorButton buttonValue={'Reset History'} onClick={() =>this.handleResetHistory()}/>
                    <CalculatorButton buttonValue={'Get'} onClick={() =>this.handleGetClick()}/>
                </div>
                <div className={"history"}>
                    <HistoryList history={this.state.history}/>
                </div>
            </div>
        );
    }

}
export default App;
