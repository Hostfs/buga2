import React from 'react';
import { form, h2, label, input, readonlyInput } from '../styles/styles';

const CalculatorForm = ({ title, inputLabel, inputValue, onInputChange, results }) => (
    <form style={form}>
        <h2 style={h2}>{title}</h2>
        <label style={label} htmlFor={inputLabel}>
            {inputLabel}
        </label>
        <input
            type="text"
            id={inputLabel}
            style={input}
            value={inputValue}
            onChange={onInputChange}
            placeholder={`${inputLabel}을 입력하세요`}
        />
        {results.map((result, index) => (
            <React.Fragment key={index}>
                <label style={label} htmlFor={result.label}>
                    {result.label}
                </label>
                <input
                    type="text"
                    id={result.label}
                    style={{ ...input, ...readonlyInput }}
                    value={result.value}
                    readOnly
                />
            </React.Fragment>
        ))}
    </form>
);

export default CalculatorForm;