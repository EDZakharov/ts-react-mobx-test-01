import { types } from 'mobx-state-tree';
import { MetersStore } from './models';

const RootStore = types.model('RootStore', {
  zkhData: types.optional(MetersStore, { meters: [] }),
});

export default RootStore;
