import { flow, types } from 'mobx-state-tree';
import { customFetch } from '../api/api';
import { AreaModel, MeterModel, MetersType, ResponseAreaType } from './models';

export const store = types
  .model('store', {
    meters: types.array(MeterModel),
    areas: types.array(AreaModel),
    limit: 20,
    offset: types.optional(types.number, 0),
    metersCount: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
    pages: types.optional(types.number, 0),
    isLoading: false,
  })
  .actions((self) => {
    const getMeters = flow(function* () {
      try {
        self.isLoading = true;
        const response = yield customFetch({
          endpoint: 'meters',
          method: 'GET',
          query: { limit: String(self.limit), offset: String(self.offset) },
        });
        const metersArray: MetersType[] = response.results;

        self.metersCount = response.count;
        self.pages = Math.ceil(self.metersCount / self.limit);
        self.meters.clear();
        metersArray.forEach((meter) => {
          const meterObj = {
            id: meter.id,
            area: meter.area,
            _type: meter._type,
            is_automatic: meter.is_automatic === null ? 'да' : 'нет',
            description: meter.description !== null ? meter.description : '',
            installation_date: meter.installation_date,
            initial_values: meter.initial_values,
          };
          self.meters.push(meterObj);
        });

        const uniqAreasId = new Set(metersArray.map((meter) => meter.area.id));

        yield getAreas(uniqAreasId as Set<string>);
        self.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    });

    const getAreas = flow(function* (ids: Set<string>) {
      try {
        const queryParams: Record<string, string[]> = {};
        queryParams['id__in'] = Array.from(ids);
        const response = yield customFetch({
          endpoint: 'areas',
          method: 'GET',
          query: queryParams,
        });

        const areasArray: ResponseAreaType[] = response.results;
        const uniqIds = new Set(self.areas.map((area) => area.id));
        areasArray.forEach((arrayArea) => {
          if (!uniqIds.has(arrayArea.id)) {
            self.areas.push({
              id: arrayArea.id,
              address: `${arrayArea.house.address}, ${arrayArea.str_number_full}`,
            });
          } else {
            const existingArea = self.areas.find(
              (area) => area.id === arrayArea.id
            );
            if (existingArea) {
              existingArea.address = `${arrayArea.house.address}, ${arrayArea.str_number_full}`;
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    const deleteMeter = flow(function* (meterId: string) {
      try {
        yield customFetch({
          endpoint: 'meters',
          method: 'DELETE',
          query: {},
          urlModification: meterId,
        });

        getMeters();
      } catch (error) {
        console.log(error);
      }
    });

    const setPage = function (pageNumber: number) {
      self.currentPage = pageNumber || 1;
      self.offset = (pageNumber - 1) * self.limit;
      getMeters();
    };

    return { getMeters, getAreas, deleteMeter, setPage };
  });

export const rootStore = store.create({ meters: [], areas: [] });
