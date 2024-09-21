export const CurrencyToSymbol = (currency: string): string => {
    debugger;
    if(!currency) return '';
    switch (currency?.toLowerCase()) {
        case 'usd':
            return '$';
        case 'jpy':
            return '¥';
        default:
            return '';
    }
}