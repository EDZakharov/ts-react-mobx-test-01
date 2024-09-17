const imageTypeSelector = (type: string) => {
  switch (type) {
    case 'ColdWaterAreaMeter': {
      return 'meter_cold.png';
    }
    case 'HotWaterAreaMeter': {
      return 'meter_hot.png';
    }
    default: {
      return `${type}`;
    }
  }
};

export const MeterType = (props: { type: string }) => {
  return <img src={imageTypeSelector(props.type)} alt="meter_cold"></img>;
};
