import { Instance, types } from 'mobx-state-tree'

export type MetersType = Instance<typeof MeterModel>

export const AreaModel = types.model('AreaModel', {
	id: types.string,
	// address: types.maybe(types.string),
})

export const MeterModel = types.model('MeterModel', {
	id: types.string,
	_type: types.array(types.string),
	area: AreaModel,
	is_automatic: types.string,
	description: types.string,
	installation_date: types.string,
	initial_values: types.array(types.number),
	// formattedInstallationDate: types.optional(types.string, ''),
})

// export const Addresses = types.model({
// 	id: types.string,
// 	strNumberFull: types.string,
// 	house: House,
// })
