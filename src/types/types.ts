export enum WidgetType {
	Time= 'Time',
	Currency = 'Currency',
	Weather = 'Weather',
}

interface IWidgetBase {
	id?: string;
	type: WidgetType;
	column: number;
}

interface ITimeWidgetProps {
	timezone: string;
}

export interface ITimeWidget extends IWidgetBase {
	type: WidgetType.Time;
	settings: ITimeWidgetProps;
}

interface ICurrencyWidgetProps {
	currency: string;
}

export interface ICurrencyWidget extends IWidgetBase {
	type: WidgetType.Currency;
	settings: ICurrencyWidgetProps;
}

export interface ICity {
	name: string
	latitude: number
	longitude: number
}

interface IWeatherWidgetProps {
	city: ICity;
}

export interface IWeatherWidget extends IWidgetBase {
	type: WidgetType.Weather;
	settings: IWeatherWidgetProps;
}

export type IWidget = ITimeWidget | ICurrencyWidget | IWeatherWidget;