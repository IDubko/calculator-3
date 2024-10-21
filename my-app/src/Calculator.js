import React, { useState } from 'react';
import styles from './Calculator.modules.css'; // Импортируем CSS-модуль

const Calculator = () => {
    const [operand1, setOperand1] = useState('');
    const [operator, setOperator] = useState('');
    const [operand2, setOperand2] = useState('');
    const [result, setResult] = useState(null);
    const [activeColor, setActiveColor] = useState(false);

    const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // Массив с цифрами
    const operators = ['+', '-']; // Массив с операторами
    const buttons = [...NUMS, ...operators, '=', 'C']; // Объединяем массивы

    // Обработчик клика кнопки
    const handleButtonClick = (value) => {
        if (value === 'C') {
            // Сбрасываем все состояния
            setOperand1('');
            setOperator('');
            setOperand2('');
            setResult(null);
            setActiveColor(false);
        } else if (value === '=') {
            // Обрабатываем вычисление результата
            if (operand1 && operator && operand2) {
                try {
                    const evalResult = eval(`${operand1} ${operator} ${operand2}`);
                    setResult(evalResult);
                    setActiveColor(true);
                } catch (error) {
                    setResult('Error');
                }
            }
        } else if (operators.includes(value)) {
            // Устанавливаем оператор
            if (operand1 && !operator) {
                setOperator(value);
            }
        } else {
            // Обрабатываем нажатие цифры
            if (!operator) {
                // Если оператора нет, добавляем цифру к operand1
                setOperand1(operand1 + value);
            } else {
                // Если оператор установлен, добавляем цифру к operand2
                setOperand2(operand2 + value);
            }
            setActiveColor(false);
        }
    };

    return (
        <div className={styles.calculator}>
            <div className={styles.display} style={{ color: activeColor ? 'green' : 'black' }}>
                {result !== null ? result : `${operand1} ${operator} ${operand2}`}
            </div>
            <div className={styles.buttonGrid}>
                {buttons.map((button) => (
                    <button key={button} onClick={() => handleButtonClick(button)}>
                        {button}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
