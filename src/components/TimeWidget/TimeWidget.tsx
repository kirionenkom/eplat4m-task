import styles from './time-widget.module.css';
import timeImage from './time.png'
import {useInterval} from "usehooks-ts";
import {useState} from "react";
import TimezoneSelect, {ITimezone, ITimezoneOption} from "react-timezone-select";
import Widget from "../Widget/Widget";
import {ITimeWidget} from "../../types/types";
import {db} from "../../data/db";

type TimeWidgetProps = {
	widget: ITimeWidget
}

function getTimeInTimeZone(timezone: string): string {
	const date = new Date();
	return new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: timezone
	}).format(date);
}

export default function TimeWidget({widget}: TimeWidgetProps) {
	const [time, setTime] = useState(getTimeInTimeZone(widget.settings.timezone));

	useInterval(() => {
		setTime(getTimeInTimeZone(widget.settings.timezone))
	}, 1000)

	const handleTimezoneChange = (evt: ITimezone) => {
		db.widgets.update(widget.id, {settings: {timezone: (evt as ITimezoneOption).value.toString()}});
	}


	return <Widget widget={widget}>
		<TimezoneSelect
			value={widget.settings.timezone}
			onChange={handleTimezoneChange}
			className={styles.timezoneSelect}
		/>
		<div className={styles.widgetContent}>
			<img src={timeImage} alt={'Погода'}/>
			<time className={styles.time}>{time}</time>
		</div>
	</Widget>;
}