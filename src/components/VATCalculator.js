import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CalculatorForm from './CalculatorForm';
import { pageContainer, container, h1, author } from '../styles/styles.js';

const VATCalculator = () => {
    const [supplyValue, setSupplyValue] = useState('');
    const [totalValue, setTotalValue] = useState('');

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
    };

    const unformatNumber = (str) => {
        return parseFloat(str.replace(/,/g, '')) || 0;
    };

    const formatInputWithCommas = (value) => {
        if (value.includes('.')) {
            const parts = value.split('.');
            const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
        }
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleInput = (value, setter) => {
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        const dotCount = (cleanedValue.match(/\./g) || []).length;

        if (dotCount > 1) {
            const validValue = cleanedValue.slice(0, -1);
            setter(formatInputWithCommas(validValue));
        } else {
            setter(formatInputWithCommas(cleanedValue));
        }
    };

    const calculateVATFromSupply = () => {
        const supply = unformatNumber(supplyValue);
        const vat = supply * 0.1;
        const total = supply + vat;
        return [
            { label: '부가가치세 (10%)', value: `￦ ${formatNumber(vat)} 원` },
            { label: '총 금액', value: `￦ ${formatNumber(total)} 원` },
        ];
    };

    const calculateSupplyFromTotal = () => {
        const total = unformatNumber(totalValue);
        const supply = total / 1.1;
        const vat = total - supply;
        return [
            { label: '공급가액', value: `￦ ${formatNumber(supply)} 원` },
            { label: '부가가치세 (10%)', value: `￦ ${formatNumber(vat)} 원` },
        ];
    };

    const handleKeyPress = (e, setValue, otherValue, otherSetter) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (setValue.trim() !== '') {
                otherSetter('');
            }
        }
    };

    const subtitle = {
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '25px',
        color: '#5f6368'
    };

    // 레인보우 애니메이션 정의
    const rainbow = keyframes`
        0% { color: red; }
        14% { color: orange; }
        28% { color: yellow; }
        42% { color: green; }
        57% { color: blue; }
        71% { color: indigo; }
        85% { color: violet; }
        100% { color: red; }
    `;

    // author 스타일을 기반으로 레인보우 효과 추가
    const RainbowAuthor = styled.div`
        margin-top: ${author.marginTop};
        font-size: ${author.fontSize};
        color: ${author.color};
        font-style: ${author.fontStyle};
        animation: ${rainbow} 2s infinite;
    `;

    return (
        <div style={pageContainer}>
            <div style={container}>
                <h1 style={h1}>부가가치세 계산기</h1>
                <div style={subtitle}>공급가액 또는 총 금액을 입력하세요</div>
                <CalculatorForm
                    title="공급가액으로 계산"
                    inputLabel="공급가액"
                    inputValue={supplyValue}
                    onInputChange={(e) => handleInput(e.target.value, setSupplyValue)}
                    onKeyPress={(e) => handleKeyPress(e, supplyValue, totalValue, setTotalValue)}
                    results={calculateVATFromSupply()}
                />
                <CalculatorForm
                    title="총 금액으로 계산"
                    inputLabel="총 금액"
                    inputValue={totalValue}
                    onInputChange={(e) => handleInput(e.target.value, setTotalValue)}
                    onKeyPress={(e) => handleKeyPress(e, totalValue, supplyValue, setSupplyValue)}
                    results={calculateSupplyFromTotal()}
                />
                <RainbowAuthor><strong>Made by 규성 </strong></RainbowAuthor>
            </div>
        </div>
    );
};

export default VATCalculator;