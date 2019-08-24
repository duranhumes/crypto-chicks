import uuid from 'uuid/v4';
import escape from 'escape-html';
import { existsSync, mkdirSync } from 'fs';

/**
 * Check if object is plain or has extra properties
 * like a date object.
 *
 * @param {object} obj
 *
 * @returns boolean
 */
export function isPlainObject(obj) {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.prototype.toString.call(obj) === '[object Object]'
    );
}

/**
 *
 * @param {object} obj
 *
 * Check if object is empty
 *
 * @returns boolean
 */
export function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object with only keys
 * specified in keys param
 */
export function pick(obj, keys) {
    return Object.assign(
        {},
        ...keys.map(k => (k in obj ? { [k]: obj[k] } : {}))
    );
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object without keys
 * specified in keys param
 */
export function reject(obj, keys) {
    return Object.assign(
        {},
        ...Object.keys(obj)
            .filter(k => !keys.includes(k))
            .map(k => ({ [k]: obj[k] }))
    );
}

/**
 * @param {object} entity
 * @param {array} fields
 *
 * @returns An object with all entity
 * properties fields specified in the fields param
 */
export function filterEntity(entity = {}, fields = []) {
    const fieldsToExclude = ['password'].concat(fields);

    // If entity param is an array of entities loop through
    // and return the new array.
    if (Array.isArray(entity)) {
        return entity.map(e => {
            Object.assign(e, entityRecurse(e, fieldsToExclude));

            return pick(e, fieldsToExclude);
        });
    }

    Object.assign(entity, entityRecurse(entity, fieldsToExclude));

    return pick(entity, fieldsToExclude);
}

function entityRecurse(obj = {}, fieldsToExclude = []) {
    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            Object.assign(obj, {
                [key]: filterEntity(obj[key], fieldsToExclude),
            });
        }
    }

    return obj;
}

export async function promiseWrapper(promise) {
    try {
        return [await promise, undefined];
    } catch (e) {
        return [undefined, e];
    }
}

/**
 * Boils uuid string down to only numbers and letters
 *
 * @returns string
 */
export function formattedUUID() {
    return uuid().replace(/[^a-z0-9]/gi, '');
}

export function upperCaseFirstLetter(str) {
    const s = String(str);

    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function createDirIfNotExists(dir) {
    return !existsSync(dir) ? mkdirSync(dir) : undefined;
}

/**
 * Escapes and removed all extra spaces
 *
 * @param str string to be escaped
 *
 * @returns string
 */
export function escapeString(str) {
    return escape(str)
        .replace(/\s+/g, ' ')
        .trim();
}
