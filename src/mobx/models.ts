import { flow, types } from 'mobx-state-tree';
import { Api } from '../api/api';

const baseUrl = 'http://showroom.eis24.me/api/v4/test/';
const House = types.model({
  id: types.string,
  address: types.string,
});

const Meter = types.model({
  id: types.string,
  areaID: types.string,
  meterType: types.string,
  installationDate: types.string,
  isAutomatic: types.string,
  initialValues: types.array(types.number),
  description: types.string,
});

const Addresses = types.model({
  id: types.string,
  strNumberFull: types.string,
  house: House,
});

export const MetersStore = types
  .model({
    meters: types.maybe(types.array(Meter)),
    addresses: types.maybe(types.array(Addresses)),
  })
  .actions((self) => {
    return {
      getMeters: flow(function* () {
        const { meters } = yield Api.get(`${baseUrl}meters`, 'limit=20');
        if (meters) {
          self.meters = meters;
        }
        const ids = self.meters?.map((el) => `id__in=${el.areaID}&`).join('');
        const { addresses } = yield Api.get(`${baseUrl}areas`, ids);
        if (addresses) {
          self.addresses = addresses;
        }
      }),
      afterCreate() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        self.getMeters();
      },
    };
  });
