export interface MutualFund {
    count?: number,
    data?: Fund[]
}

export interface Fund {
    id: number,
    name: string,
    rating: number,
    returns: Returns,
    aum: number,
    expenseRatio: number,
}

export interface Returns {
    oneYear: number,
}

export enum ViewState {
    InProgress,
    Result
}