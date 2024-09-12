import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import { container, h1, author } from '../styles/styles';

const VATCalculator = () => {
    const [supplyValue, setSupplyValue] = useState('');
    const [totalValue, setTotalValue] = useState('');

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
    };

    const unformatNumber = (str) => {
        return parseFloat(str.replace(/,/g, '')) || 0;
    };

    const handleInput = (value, setter) => {
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        const dotCount = (cleanedValue.match(/\./g) || []).length;
        setter(dotCount > 1 ? cleanedValue.slice(0, -1) : cleanedValue);
    };

    const calculateVATFromSupply = () => {
        const supply = unformatNumber(supplyValue);
        const vat = supply * 0.1;
        const total = supply + vat;
        return [
            { label: '부가가치세 (10%)', value: `${formatNumber(vat)} 원` },
            { label: '총 금액', value: `${formatNumber(total)} 원` },
        ];
    };

    const calculateSupplyFromTotal = () => {
        const total = unformatNumber(totalValue);
        const supply = total / 1.1;
        const vat = total - supply;
        return [
            { label: '공급가액', value: `${formatNumber(supply)} 원` },
            { label: '부가가치세 (10%)', value: `${formatNumber(vat)} 원` },
        ];
    };

    return (
        <div style={container}>
            <h1 style={h1}>부가가치세 계산기</h1>
            <CalculatorForm
                title="공급가액 기준 계산"
                inputLabel="공급가액"
                inputValue={supplyValue}
                onInputChange={(e) => handleInput(e.target.value, setSupplyValue)}
                results={calculateVATFromSupply()}
            />
            <CalculatorForm
                title="총 금액 기준 계산"
                inputLabel="총 금액"
                inputValue={totalValue}
                onInputChange={(e) => handleInput(e.target.value, setTotalValue)}
                results={calculateSupplyFromTotal()}
            />
            <div style={author}>Made by 규성</div>
        </div>
    );
};

export default VATCalculator;