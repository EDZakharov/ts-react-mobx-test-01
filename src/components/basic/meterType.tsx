const imageTypeSelector = (meterType: string) => {
	switch (meterType) {
		case 'ColdWaterAreaMeter': {
			return 'meter_cold.png'
		}
		case 'HotWaterAreaMeter': {
			return 'meter_hot.png'
		}
		default: {
			return `${meterType}`
		}
	}
}

export const MeterType = (props: { meterType: string }) => {
	return <img src={imageTypeSelector(props?.meterType)} alt='meter_cold'></img>
}
