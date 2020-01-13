const apiUrl = process.env.REACT_APP_API_URL;
const paymentOptions =
    process.env.REACT_APP_USE_PAYMENT === 'true' ? true : false;

module.exports = {
    apiUrl,
    paymentOptions,
};
