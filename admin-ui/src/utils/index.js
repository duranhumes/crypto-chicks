export async function promiseWrapper(promise) {
    try {
        return [await promise, undefined];
    } catch (e) {
        return [undefined, e];
    }
}
