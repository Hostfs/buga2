// ../styles/styles.js

// Rainbow 애니메이션 정의
const rainbowAnimation = {
    '0%': { color: 'red' },
    '14%': { color: 'orange' },
    '28%': { color: 'yellow' },
    '42%': { color: 'green' },
    '57%': { color: 'blue' },
    '71%': { color: 'indigo' },
    '85%': { color: 'violet' },
    '100%': { color: 'red' }
};

// Page container - holds everything
export const pageContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: '#f0f2f5',
    padding: '0 20px'
};

// Main container for the calculator
export const container = {
    width: '100%',
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '480px',
};

// Main title styling
export const h1 = {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '5px',
    color: '#1a73e8',
    textShadow: 'none'
};

// Form section title
export const h2 = {
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '0',
    marginBottom: '15px',
    color: '#202124'
};

// Rainbow text styling for <rain> tag
export const rain = {
    display: 'block',
    textAlign: 'center',
    animation: 'rainbow 2s infinite',
    fontSize: '18px',
    marginBottom: '20px'
};

// Form container
export const form = {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    textAlign: 'left'
};

// Input label styling
export const label = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5f6368',
};

// Text input field
export const input = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
};

// Read-only input field (for results)
export const readonlyInput = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    backgroundColor: '#f1f3f4',
    color: '#202124',
    fontWeight: '500',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
};

// Author credit styling
export const author = {
    marginTop: '30px',
    fontSize: '14px',
    color: '#5f6368',
    fontStyle: 'normal',
};

// 애니메이션 정의 (별도로 export하지 않음)
export const keyframes = {
    rainbow: rainbowAnimation
};