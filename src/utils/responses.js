export function normalizeResponse(body) {
    if (
        body?.success &&
        body.data &&
        typeof body.data === 'object' &&
        !Array.isArray(body.data)
    ) {
        return { ...body.data, ...body };
    }
    return body;
}
