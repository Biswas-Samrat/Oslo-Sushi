import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress benign ResizeObserver error
// Suppress benign ResizeObserver error
const originalError = console.error;
console.error = (...args) => {
    if (/ResizeObserver loop/.test(args[0])) {
        return;
    }
    originalError.apply(console, args);
};

window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications' ||
        e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
        if (resizeObserverErr) {
            resizeObserverErr.style.display = 'none';
        }
        e.stopImmediatePropagation();
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
