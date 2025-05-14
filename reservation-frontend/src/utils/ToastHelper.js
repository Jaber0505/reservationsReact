import { toast } from 'react-toastify';

const ToastHelper = {
    success: (msg) =>
        toast.success(msg, {
        position: 'top-right',
        autoClose: 3000,
        icon: '✅',
        }),

    error: (msg) =>
        toast.error(msg, {
        position: 'top-right',
        autoClose: 4000,
        icon: '❌',
        }),

    info: (msg) =>
        toast.info(msg, {
        position: 'top-right',
        autoClose: 3000,
        icon: 'ℹ️',
        }),

    warning: (msg) =>
        toast.warn(msg, {
        position: 'top-right',
        autoClose: 3000,
        icon: '⚠️',
        }),

    critical: (msg) =>
        toast.error(msg, {
            position: 'top-right',
            autoClose: 6000, // ⏱️ plus long
            icon: '🗑️',
            theme: 'colored',
            style: {
            backgroundColor: '#991B1B', // rouge foncé
            color: '#fff',
            },
        }),
    };

export default ToastHelper;
