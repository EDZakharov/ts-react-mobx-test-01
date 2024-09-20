import { Instance, types } from 'mobx-state-tree';

export type MetersType = Instance<typeof MeterModel>;
export type AreaType = Instance<typeof AreaModel>;
export type ResponseAreaType = {
  id: string;
  house: AreaType;
  str_number_full: string;
};

export const AreaModel = types.model('AreaModel', {
  id: types.string,
  address: types.maybe(types.string),
});

export const MeterModel = types.model('MeterModel', {
  id: types.string,
  _type: types.array(types.string),
  area: AreaModel,
  is_automatic: types.string,
  description: types.string,
  installation_date: types.string,
  initial_values: types.array(types.number),
});
