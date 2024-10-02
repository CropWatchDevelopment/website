export const CurrencyToSymbol = (currency: string): string => {
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