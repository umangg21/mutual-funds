const MutualFundData = require('../contract/testData.json')


function getRequestUrl(offset: number) {
    return `https://dev.indiawealth.in/api/v2/funds/getList/?limit=16&offset=${offset}`;
}

const AuthToken = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDI3LCJ1c2VybmFtZSI6Ijk4MTE4ODU5ODkiLCJleHAiOjE1NTE3NzA1MzcsImVtYWlsIjoia2xzYWRqbGFAYXNkLmFjb20iLCJtb2JpbGUiOiI5ODExODg1OTg5In0.yNnIloeXKJk5q77osuieKAWR-1vhAjpGbjdTh-u3A7E`

export class IndWealth {

    static async getMutualFunds(offset: number): Promise<Response> {
        return fetch(getRequestUrl(offset),
            {
                method: `get`,
                headers: {
                    "Authorization": AuthToken
                }
            })
    };

    static async getMutualFundsOffline(offset: number): Promise<Response> {
        let mutualFundData = {...MutualFundData}
        mutualFundData.data = mutualFundData.data.slice(offset, offset + 16)
        return Promise.resolve(mutualFundData);
    };
}