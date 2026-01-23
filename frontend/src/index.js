import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress benign ResizeObserver errors
const debounce = (callback, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), delay);
    };
};

// Suppress console errors
const originalError = console.error;
console.error = (...args) => {
    if (
        typeof args[0] === 'string' &&
        (args[0].includes('ResizeObserver loop') ||
         args[0].includes('ResizeObserver'))
    ) {
        return;
    }
    originalError.apply(console, args);
};

// Suppress window errors
window.addEventListener('error', (e) => {
    if (
        e.message &&
        (e.message.includes('ResizeObserver loop completed with undelivered notifications') ||
         e.message.includes('ResizeObserver loop limit exceeded') ||
         e.message.includes('ResizeObserver'))
    ) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
    }
});

// Suppress unhandled promise rejections related to ResizeObserver
window.addEventListener('unhandledrejection', (e) => {
    if (
        e.reason &&
        e.reason.message &&
        e.reason.message.includes('ResizeObserver')
    ) {
        e.preventDefault();
        return false;
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
