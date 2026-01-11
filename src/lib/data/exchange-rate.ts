



export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    const fetchRequest = await fetch(`https://open.er-api.com/v6/latest/USD`);
    if (!fetchRequest.ok) {
        throw new Error('Failed to fetch exchange rates');
    }
    const data = await fetchRequest.json();
    const result = data.result;

    if (result !== 'success') {
        console.error('Unsupported currency');
        return 2;
    }

    const rates = data.rates;
    if (!(fromCurrency in rates) || !(toCurrency in rates)) {
        throw new Error('Unsupported currency');
    }

    const rateFromUSDToFromCurrency = rates[fromCurrency];
    const rateFromUSDToToCurrency = rates[toCurrency];

    const exchangeRate = rateFromUSDToToCurrency / rateFromUSDToFromCurrency;
    return exchangeRate;
};