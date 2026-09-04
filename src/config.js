const apiUrl = import.meta.env.VITE_API_URL;
const paymentOptions =
    import.meta.env.VITE_USE_PAYMENT === 'true' ? true : false;

export default {
    apiUrl,
    paymentOptions,
};
