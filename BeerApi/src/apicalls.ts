import { BeerType, urlParams } from "./interfaces";

const API_URL = "https://api.punkapi.com/v2/";

const api = {
    get: async (query: string) => {
        return fetch(API_URL + query, {
            method: "GET",
        }).then(readResponse);
    }
}

function readResponse(res: Response): Promise<any> {
    if(res.ok) return res.json();
    else throw new Error();
}

function prepParams(parameters: urlParams): string {
    let paramsString = '?';
    Object.entries(parameters).map((item, index) => {
        if (index > 0) paramsString+='&';
        paramsString += item[0] + '=' + item[1];
        console.log('item', item);
    })
    return paramsString;
}

export function getBeers(parameters?: urlParams): Promise<BeerType[]> {
    const params = parameters? prepParams(parameters) : '';
    return api.get(`beers${params}`);
}

export function getBeer(id: string): Promise<BeerType> {
    return api.get(`beers/${id}`);
}

export function getRandomBeer(): Promise<BeerType> {
    return api.get(`beers/random`);
}