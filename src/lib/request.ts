import axios from 'axios';

export interface IRequestResult {
    url: string;
    latency: number;
    begin: number;
    response?: {
        headers: { [index: string]: string };
        status_code: number;
        method: string;
    };
    error?: string;
}

export const request = (urls: string[]) =>
    axios.post<IRequestResult[]>('https://request.syrflover.co', urls).then((res) => res.data);

// request.json
//
