const getSerializedData = async (response: any) => {
	const resp = await response
	let serializedResponse = null
	if (Array.isArray(resp.results) && !resp.results[0].house) {
		serializedResponse = resp.results.map((meter: any) => {
			const serializedMeter = serializedMeterResponse(meter)
			return serializedMeter
		})
	}

	if (resp.results[0].house) {
		serializedResponse = resp.results.map((address: any) => {
			const serializedMeter = serializedAddressesResponse(address)
			return serializedMeter
		})
	}
	return serializedResponse
}

function serializedMeterResponse(response: any) {
	return {
		id: response.id,
		areaID: response.area.id,
		meterType: response?._type[0] || 'не указан',
		installationDate: response.installation_date,
		isAutomatic: response.is_automatic !== null ? 'нет' : 'да',
		initialValues: response.initial_values,
		description: response.description,
	}
}

function serializedAddressesResponse(response: any) {
	return {
		id: response.id,
		strNumberFull: response.str_number_full,
		house: {
			address: response.house.address,
			id: response.house.id,
		},
	}
}

export class Api {
	static async get(url: string, query?: string) {
		try {
			const response = await fetch(`${url}${query && '?' + query}`, {
				headers: {
					'Content-type': 'application-json',
				},
			})

			const data = await getSerializedData(response.json())
			return Promise.resolve(data)
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
