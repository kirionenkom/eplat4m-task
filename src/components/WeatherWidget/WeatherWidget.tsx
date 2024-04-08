import styles from './weather-widget.module.css'
import weatherImage from './weather.png'
import Widget from "../Widget/Widget";
import {ICity, IWeatherWidget} from "../../types/types";
import cities from "../../data/cities.json";
import {useEffect, useState} from "react";
import axios from "axios";
import {db} from "../../data/db";
import Select from "react-select";

type WeatherWidgetProps = {
	widget: IWeatherWidget
}

export default function WeatherWidget({widget}: WeatherWidgetProps) {
	const [temperature, setTemperature] = useState(0)


	useEffect(() => {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${widget.settings.city.latitude}&longitude=${widget.settings.city.longitude}&current=temperature_2m`;
		axios.get(url).then(res => setTemperature(res.data.current['temperature_2m']))

	}, [widget.settings.city]);

	const handleChangeCity = (newCity: ICity | undefined) => {
		if (newCity) {
			db.widgets.update(widget.id, {settings: {city: newCity}})
		}
	}

	return <Widget widget={widget}>
		<Select value={{value: widget.settings.city, label: widget.settings.city.name}}
		        onChange={(newValue) => handleChangeCity(newValue?.value)} isSearchable={true}
		        options={cities.map(city => ({value: city, label: city.name}))} className={styles.citySelect}/>
		<div className={styles.widgetContent}>
			<img src={weatherImage} alt={'Погода'}/>
			<p className={styles.value}><span>Температура:</span> {temperature} °C</p>
		</div>
	</Widget>;
}