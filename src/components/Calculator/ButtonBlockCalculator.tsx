import React, {FC, useCallback, useEffect} from 'react';
import ButtonCalculator from "./ButtonCalculator";
import {Digit, Operator} from "./lib/typesCalculator";

interface ButtonBlockProps {
    onDigitClick: (digit: Digit) => void,
    onAllClearClick: () => void,
    onClearEntryClick: () => void,
    onClearBackClick: () => void,
    onOperatorClick: (operator: Operator) => void,
    onEqualClick: () => void,
    onPointClick: () => void,
    onChangeSignClick: () => void,
    onMemoryRecallClick: () => void,
    onMemoryClearClick: () => void,
    onMemoryPlusClick: () => void,
    onMemoryMinusClick: () => void,
    copyResult: () => void,
}

const ButtonBlockCalculator: FC<ButtonBlockProps> =
    ({
         onDigitClick,
         onAllClearClick,
         onClearEntryClick,
         onClearBackClick,
         onOperatorClick,
         onEqualClick,
         onPointClick,
         onChangeSignClick,
         onMemoryRecallClick,
         onMemoryClearClick,
         onMemoryPlusClick,
         onMemoryMinusClick,
         copyResult,
     }) => {

        const handleKeyDown = useCallback(({key, keyCode, ctrlKey} : KeyboardEvent) => {
            if(key >= '0' && key <= '9') {
                onDigitClick(key as unknown as Digit)
            } else if(key === '+' || key === '-' ||  key === '*' ||  key === '/') {
                if(key === '/') { key = '÷'; }
                if(key === '*') { key = '×'; }
                onOperatorClick(key as unknown as Operator)
            } else if(key === '.') {
                onPointClick()
            } else if(key === 'Backspace') {
                onClearBackClick()
            } else if(key === 'Delete') {
                onAllClearClick()
            } else if(key === 'Enter' || key === '=') {
                onEqualClick()
            } else if(ctrlKey && keyCode === 67) {
                copyResult()
            }
        }, [
            onDigitClick,
            onOperatorClick,
            onPointClick,
            onClearBackClick,
            onAllClearClick,
            onEqualClick,
            copyResult
        ])

        useEffect(() => {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            }
        }, [handleKeyDown])

        return (
            <div className="calculator-buttons">
                <ButtonCalculator className="light" onClick={() => onMemoryRecallClick()}><span>MR</span></ButtonCalculator>
                <ButtonCalculator className="light" onClick={() => onMemoryClearClick()}><span>MC</span></ButtonCalculator>
                <ButtonCalculator className="light" onClick={() => onMemoryPlusClick()}><span>M+</span></ButtonCalculator>
                <ButtonCalculator className="light" onClick={() => onMemoryMinusClick()}><span>M-</span></ButtonCalculator>

                <ButtonCalculator className="clear" onClick={() => onAllClearClick()}><span>AC</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onClearEntryClick()}><span>C</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onChangeSignClick()}><span>-/+</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onOperatorClick('+')}><span>+</span></ButtonCalculator>

                <ButtonCalculator onClick={() => onDigitClick(7)}><span>7</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(8)}><span>8</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(9)}><span>9</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onOperatorClick('-')}><span>-</span></ButtonCalculator>

                <ButtonCalculator onClick={() => onDigitClick(4)}><span>4</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(5)}><span>5</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(6)}><span>6</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onOperatorClick('×')}><span>×</span></ButtonCalculator>

                <ButtonCalculator onClick={() => onDigitClick(1)}><span>1</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(2)}><span>2</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(3)}><span>3</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onOperatorClick('÷')}><span>÷</span></ButtonCalculator>

                <ButtonCalculator onClick={() => onPointClick()}><span>.</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onDigitClick(0)}><span>0</span></ButtonCalculator>
                <ButtonCalculator onClick={() => onClearBackClick()}><span>&lArr;</span></ButtonCalculator>
                <ButtonCalculator className="equal" onClick={() => onEqualClick()}><span>=</span></ButtonCalculator>
            </div>
        );
    };

export default ButtonBlockCalculator;