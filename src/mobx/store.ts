import { flow, types } from 'mobx-state-tree'
import { formattedFetch } from '../api/api'
import { AreaModel, MeterModel, MetersType } from './models'

export const store = types
	.model('RootStore', {
		meters: types.array(MeterModel),
		areas: types.array(AreaModel),
		limit: 20,
		offset: types.optional(types.number, 0),
		metersCount: types.optional(types.number, 0),
		currentPage: types.optional(types.number, 1),
		pages: types.optional(types.number, 0),
	})
	.actions((self) => {
		const getMeters = flow(function* () {
			try {
				const response = yield formattedFetch({
					endpoint: 'meters',
					method: 'GET',
					query: { limit: String(self.limit), offset: String(self.offset) },
				})
				const metersArray = response.results

				self.metersCount = response.count
				self.pages = Math.ceil(self.metersCount / self.limit)

				self.meters.clear()
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

				const uniqAreasId = new Set(
					metersArray.map((meter: MetersType) => meter.area.id)
				)

				getAreas(uniqAreasId as Set<string>)
			} catch (error) {
				console.log(error)
			}
		})

		const getAreas = flow(function* (ids: Set<string>) {
			try {
				const queryParams: Record<string, string[]> = {}
				queryParams['id__in'] = Array.from(ids)
				const response = yield formattedFetch({
					endpoint: 'areas',
					method: 'GET',
					query: queryParams,
				})

				console.log(response)
			} catch (error) {
				console.error('Error fetching areas:', error)
			}
		})

		const setPage = function (pageNumber: number) {
			self.currentPage = pageNumber

			getMeters()
		}

		return { getMeters, getAreas, setPage }
	})

export const rootStore = store.create({ meters: [], areas: [] })
