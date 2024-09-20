type FormattedFetchType = {
	endpoint: 'meters' | 'areas'
	method: 'GET' | 'POST' | 'DELETE'
	query: Record<string, string | string[]>
}
export async function formattedFetch({
	endpoint,
	method,
	query,
}: FormattedFetchType) {
	const baseUrl = 'http://showroom.eis24.me/api/v4/test/'
	const queryParams = new URLSearchParams()

	const queryEntries = query

	Object.keys(queryEntries).forEach((key) => {
		const value = queryEntries[key]
		if (Array.isArray(value)) {
			value.forEach((v) => queryParams.append(key, v))
		} else {
			queryParams.append(key, String(value))
		}
	})

	const queryString = queryParams.toString()

	const response = await fetch(`${baseUrl}${endpoint}?${queryString}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error(`Error: ${response.status} - ${response.statusText}`)
	}

	const data = await response.json()
	return data
}
