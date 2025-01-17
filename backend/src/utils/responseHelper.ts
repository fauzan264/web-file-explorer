// utils/responseHelper.ts
import { Folder } from '../models/types';

interface ResponseData<T> {
    status: string;
    code: number;
    message: string;
    data: T[];
}

function createResponse<T>({ status = 'success', code = 200, message = '', data = [] }: ResponseData<T>): ResponseData<T> {
    return {
        status,
        code,
        message,
        data,
    };
}

export default createResponse;
