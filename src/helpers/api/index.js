// Standardize API response format across the app
// Decouple from implementation (here using axios)
const parseResponse = (response) => {
    if (!response.ok) {
        return response.json().then((json) => { if (json.error) throw new Error(JSON.stringify(json)) })
    }
    return response.text().then((text) => {
        try {
        return {
            statusCode: response.status,
            data: JSON.parse(text)
        }
    } catch (e) {
        return {
            statusCode: response.status,
            data: { text }
        }
    }
    })
};

export const get = endpoint => fetch(endpoint)
    .then(result => result.json())
    .then(response => response)
    .catch(err => JSON.parse(err.message))

export const post = (
    endpoint,
    data
) => {
    const body = JSON.stringify(data)
    return (
    fetch(endpoint, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
        .then(result => Promise.resolve(parseResponse(result)))
        .catch(err => Promise.reject(JSON.parse(err.message)))
    )
}

export const patch = (
    endpoint,
    data = {},
    opts?
) => fetch(endpoint, { method: 'PATCH', body: data, ...opts })
    .then(result => parseResponse(result))
    .catch(err => Promise.reject(JSON.parse(err.message)))

export const put = (
    endpoint,
    data
) => {
    const body = JSON.stringify(data)
    return (
        fetch(endpoint, { method: 'PUT', body, headers: { 'Content-Type': 'application/json' }})
    .then(result => parseResponse(result))
    .catch(err => Promise.reject(JSON.parse(err.message)))
    )

}

export const del = (
    endpoint,
    data,
    opts?
) => {
    const body = JSON.stringify(data)
    return (
        fetch(endpoint, { method: 'DELETE', body, headers: { 'Content-Type': 'application/json' }, ...opts })
    .then(result => parseResponse(result))
    .catch(err => Promise.reject(JSON.parse(err.message)))
    )
}