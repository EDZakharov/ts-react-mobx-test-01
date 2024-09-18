import './meterType.css';

const imageTypeSelector = (meterType: string) => {
  switch (meterType) {
    case 'ColdWaterAreaMeter': {
      return { src: 'meter_cold.png', tittle: 'ХВС' };
    }
    case 'HotWaterAreaMeter': {
      return { src: 'meter_hot.png', tittle: 'ГВС' };
    }
    default: {
      return { src: '', tittle: '' };
    }
  }
};

export const MeterType = (props: { meterType: string }) => {
  return (
    <div className="meterType__image__wrapper">
      <img
        src={imageTypeSelector(props?.meterType).src}
        alt="meterType"
        className="meterType__image"
      ></img>
      <span>{imageTypeSelector(props?.meterType).tittle}</span>
    </div>
  );
};
