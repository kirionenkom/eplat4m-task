import styles from './currency-widget.module.css';
import currencyImage from './currency.png'
import {useEffect, useState} from "react";
import axios from "axios";
import Widget from "../Widget/Widget";
import {ICurrencyWidget} from "../../types/types";
import {db} from "../../data/db";
import Select from "react-select";

type CurrencyWidgetProps = {
	widget: ICurrencyWidget
}

export default function CurrencyWidget({widget}: CurrencyWidgetProps) {
	const [currenciesList, setCurrenciesList] = useState<string[]>([])
	const [value, setValue] = useState<number>(0)

	useEffect(() => {
		axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(res => {
			const currencies = Object.keys(res.data['Valute']);
			setCurrenciesList(currencies);
		});
	}, []);

	useEffect(() => {
		axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(res => setValue(res.data['Valute'][widget.settings.currency]['Value']));
	}, [widget.settings.currency]);

	const handleCurrencyChange = (newCurrency: string | undefined) => {
		if (newCurrency) {
			db.widgets.update(widget.id, {settings: {currency: newCurrency}});
		}
	}

	return <Widget widget={widget}>
		<Select value={{value: widget.settings.currency, label: widget.settings.currency}}
		        onChange={(newValue) => handleCurrencyChange(newValue?.value)} isSearchable={true}
		        options={currenciesList.map(currency => ({value: currency, label: currency}))} className={styles.currencySelect}/>
		<div className={styles.widgetContent}>
			<img src={currencyImage} alt={'Погода'}/>
			<p className={styles.value}><span>{widget.settings.currency}:</span> {value} рублей</p>
		</div>
	</Widget>;
}