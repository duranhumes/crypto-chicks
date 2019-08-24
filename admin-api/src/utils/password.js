import argon2 from 'argon2';

import { promiseWrapper } from './';

export async function hashPassword(password) {
    const options = {
        timeCost: 4,
        memoryCost: 2 ** 13,
        parallelism: 2,
        type: argon2.argon2id,
    };

    const [hash, hashErr] = await promiseWrapper(
        argon2.hash(password, options)
    );
    if (hashErr) {
        return null;
    }

    return hash ? String(hash) : null;
}

export async function verifyPassword(hash, password) {
    const [verified, verifiedErr] = await promiseWrapper(
        argon2.verify(hash, password)
    );
    if (verifiedErr) {
        return false;
    }

    return verified;
}
