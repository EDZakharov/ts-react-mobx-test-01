import { flow, types } from 'mobx-state-tree'
import { AreaModel, MeterModel, MetersType } from './models'

type FormattedFetchType = {
	endpoint: 'meters' | 'areas'
	method: 'GET' | 'POST' | 'DELETE'
	query: object
}

export const store = types
	.model('RootStore', {
		meters: types.array(MeterModel),
		areas: types.array(AreaModel),
		limit: 20,
		offset: types.optional(types.number, 0),
		totalCount: types.optional(types.number, 0),
		currentPage: types.optional(types.number, 1),
		totalPage: types.optional(types.number, 0),
		isLoading: types.optional(types.boolean, false),
	})
	.actions((self) => {
		const getMeters = flow(function* () {
			try {
				const response = yield formattedFetch({
					endpoint: 'meters',
					method: 'GET',
					query: { limit: self.limit, offset: self.offset },
				})

				const metersArray = response.results

				// const uniqMeterAreaId = new Set()

				if (self.meters.length) {
					self.meters.clear()
				}

				metersArray.forEach((meter: MetersType) => {
					const meterObj = {
						id: meter.id,
						area: meter.area,
						_type: meter._type,
						is_automatic: meter.is_automatic === null ? 'да' : 'нет',
						description: meter.description !== null ? meter.description : '',
						installation_date: meter.installation_date,
						initial_values: meter.initial_values,
					}
					self.meters.push(meterObj)
				})
			} catch (error) {
				console.log(error)
			}
		})

		return { getMeters }
	})
	.postProcessSnapshot((snapshot) => {
		return snapshot.meters
	})

// const RootStore = types.model('RootStore', {
// 	zkhData: types.optional(MetersStore, { meters: [] }),
// })

export const rootStore = store.create({ meters: [] })

async function formattedFetch({ endpoint, method, query }: FormattedFetchType) {
	const baseUrl = 'http://showroom.eis24.me/api/v4/test/'
	const queryString = new URLSearchParams({ ...query })
	const response = await fetch(`${baseUrl}${endpoint}?${queryString}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.json()
}
