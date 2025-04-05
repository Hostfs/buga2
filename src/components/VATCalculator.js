import React, { useState } from 'react';
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

    // 입력값에 콤마를 추가하는 함수
    const formatInputWithCommas = (value) => {
        // 소수점이 있는 경우를 고려하여 처리
        if (value.includes('.')) {
            const parts = value.split('.');
            const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
        }
        // 소수점이 없는 경우
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleInput = (value, setter) => {
        // 콤마 제거 후 숫자와 소수점만 남기기
        const cleanedValue = value.replace(/[^0-9.]/g, '');

        // 소수점 개수 확인 (중복 소수점 방지)
        const dotCount = (cleanedValue.match(/\./g) || []).length;

        if (dotCount > 1) {
            // 소수점이 2개 이상이면 마지막 입력된 소수점 제거
            const validValue = cleanedValue.slice(0, -1);
            setter(formatInputWithCommas(validValue));
        } else {
            // 유효한 입력이면 콤마 포맷 적용
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

    // 엔터 키 처리 함수 추가
    const handleKeyPress = (e, setValue, otherValue, otherSetter) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // 현재 입력 필드가 값이 있으면 계산하고, 다른 필드는 초기화
            if (setValue.trim() !== '') {
                otherSetter('');
            }
        }
    };

    // 타이틀 아래 서브타이틀 스타일
    const subtitle = {
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '25px',
        color: '#5f6368'
    };

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
                <div style={author}>Made by 규성</div>
            </div>
        </div>
    );
};

export default VATCalculator;