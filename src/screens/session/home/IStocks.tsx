export interface IStocks {
    marketTrend: boolean,
    stocksTrend: {
        aaTrend: boolean,
        ccaTrend: boolean,
        xahTrend: boolean
    }
    stocks: {
        aa: number[];
        cca?: number[];
        xah?: number[];
    };
}