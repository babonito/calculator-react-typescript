import React, {FC, useState} from 'react';
import DisplayCalculator from "./DisplayCalculator";
import ButtonBlockCalculator from "./ButtonBlockCalculator";
import './calculator.css';
import {Digit, Operator} from "./lib/typesCalculator";

const AppCalculator: FC = () => {
    const [display, setDisplay] = useState<string>('0')
    const [memory, setMemory] = useState<number>(0)
    const [result, setResult] = useState<number>(0)

    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true)
    const [pendingOperator, setPendingOperator] = useState<Operator>()

    const calculate = (rightOperand: number, pendingOperator: Operator): boolean => {
        let newResult = result

        switch (pendingOperator) {
            case '+':
                newResult += rightOperand
                break
            case '-':
                newResult -= rightOperand
                break
            case '×':
                newResult *= rightOperand
                break
            case '÷':
                if (rightOperand === 0) {
                    return false
                }
                newResult /= rightOperand
        }

        setResult(newResult)
        setDisplay(newResult.toString().toString().slice(0, 12))

        return true
    }

    const onMemoryClearClick = () => {
        setMemory(0)
        setWaitingForOperand(true)
    }

    const onMemoryRecallClick = () => {
        setDisplay(memory.toString())
        setWaitingForOperand(true)
    }

    const onMemoryPlusClick = () => {
        setMemory(memory + Number(display))
        setWaitingForOperand(true)
    }

    const onMemoryMinusClick = () => {
        setMemory(memory - Number(display))
        setWaitingForOperand(true)
    }

    const onDigitClick = (digit: Digit) => {
        let newDisplay = display

        if ((display === '0' && digit === 0) || display.length > 12) {
            return
        }

        if (waitingForOperand) {
            newDisplay = ''
            setWaitingForOperand(false)
        }

        if (display !== '0') {
            newDisplay = newDisplay + digit.toString()
        } else {
            newDisplay = digit.toString()
        }

        setDisplay(newDisplay)
    }

    const onPointClick = () => {
        let newDisplay = display

        if (waitingForOperand) {
            newDisplay = '0'
        }

        if (newDisplay.indexOf('.') === -1) {
            newDisplay = newDisplay + '.'
        }

        setDisplay(newDisplay)
        setWaitingForOperand(false)
    }

    const onOperatorClick = (operator: Operator) => {
        const operand = Number(display)

        if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
            if (!calculate(operand, pendingOperator)) {
                return
            }
        } else {
            setResult(operand)
        }
        setPendingOperator(operator)
        setWaitingForOperand(true)
    }

    const onChangeSignClick = () => {
        const value = Number(display)

        if (value > 0) {
            setDisplay('-' + display)
        } else if (value < 0) {
            setDisplay(display.slice(1))
        }
    }

    const onAllClearClick = () => {
        setMemory(0)
        setResult(0)
        setPendingOperator(undefined)
        setDisplay('0')
        setWaitingForOperand(true)
    }

    const onClearEntryClick = () => {
        setDisplay('0')
        setWaitingForOperand(true)
    }

    const onClearBackClick = () => {
        let newDisplay = display

        if (waitingForOperand) {
            return
        }

        if (display.length === 1) {
            newDisplay = '0'
            setWaitingForOperand(true)
        } else {
            newDisplay = display.substring(0, display.length -1).toString()
        }

        setDisplay(newDisplay)
    }

    const onEqualClick = () => {
        const operand = Number(display)
        if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
            if (!calculate(operand, pendingOperator)) {
                return
            }
            setPendingOperator(undefined)
        } else {
            setDisplay(operand.toString())
        }
        setResult(operand)
        setWaitingForOperand(true)
    }

    const copyResult = () => {
        navigator.clipboard.writeText(display);
    }

    const sizeDisplay = () => {
        let size = 30;
        if(display.length === 10) {
            size = 27;
        } else if(display.length === 11) {
            size = 25;
        } else if(display.length === 12) {
            size = 23;
        } else if(display.length === 13) {
            size = 20;
        }
        return size + 'px';
    }
    return (
        <div className="calculator">
            <DisplayCalculator
                sizeValue={sizeDisplay()}
                value={Number(display).toLocaleString()}
                hasMemory={memory !== 0}
                expression={typeof pendingOperator !== 'undefined' ? `${result}${pendingOperator}${waitingForOperand ? '' : display}` : ''}/>
            <ButtonBlockCalculator
                onDigitClick={onDigitClick}
                onOperatorClick={onOperatorClick}
                onMemoryRecallClick={onMemoryRecallClick}
                onMemoryClearClick={onMemoryClearClick}
                onMemoryPlusClick={onMemoryPlusClick}
                onMemoryMinusClick={onMemoryMinusClick}
                onAllClearClick={onAllClearClick}
                onClearEntryClick={onClearEntryClick}
                onClearBackClick={onClearBackClick}
                onChangeSignClick={onChangeSignClick}
                onEqualClick={onEqualClick}
                onPointClick={onPointClick}
                copyResult={copyResult}

            />
        </div>

    );
};

export default AppCalculator;