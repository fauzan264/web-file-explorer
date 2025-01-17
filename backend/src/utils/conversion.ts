import _ from 'lodash';
import snakeCase from 'lodash.snakecase';

export function toSnakeCase(obj: any): any {
    if (obj instanceof Date) {
        return obj.toISOString(); 
    }

    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase);
    } else if (obj !== null && typeof obj === 'object') {

        return _.mapValues(
            _.mapKeys(obj, (_: any, key: any) => snakeCase(key)), 
            toSnakeCase
        );
    }

    return obj;
}
