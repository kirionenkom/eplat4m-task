import styles from './new-widget-button.module.css'
import {IWidget, WidgetType} from "../../types/types";
import {FormEventHandler, useState} from "react";
import {db} from "../../data/db";
import {nanoid} from "nanoid";

type NewWidgetButtonProps = {
	column: IWidget['column']
}

function getWidgetByType(widgetType: IWidget['type'], column: IWidget['column']): IWidget {
	switch (widgetType) {
		case WidgetType.Time:
			return {id: nanoid(10), type: widgetType, column: column, settings: {timezone: 'Europe/Moscow'}}
		case WidgetType.Currency:
			return {id: nanoid(10), type: widgetType, column: column, settings: {currency: 'USD'}}
		case WidgetType.Weather:
			return {
				id: nanoid(10), type: widgetType, column: column, settings: {
					city: {
						"name": "Екатеринбург",
						"latitude": 56.84,
						"longitude": 60.61
					}
				}
			}
	}
}

export default function NewWidgetButton({column}: NewWidgetButtonProps) {
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
	const [selectedWidgetType, setSelectedWidgetType] = useState<WidgetType>(WidgetType.Time);

	const handleSubmit: FormEventHandler = () => {
		db.widgets.add(getWidgetByType(selectedWidgetType, column))
		setIsFormVisible(false)
	}

	return <>
		{isFormVisible &&
      <form className={styles.newWidgetForm} onSubmit={handleSubmit}>
        <h3>Добавить виджет</h3>
        <p>Выберите виджет для добавления на доску</p>
        <select value={selectedWidgetType}
                onChange={(event) => setSelectedWidgetType(event.target.value as WidgetType)}>
					{Object.keys(WidgetType).map((key) => <option value={key}>{key}</option>)}
        </select>
        <button type={'submit'}>Добавить</button>
      </form>
		}
		<button type={'button'} className={styles.newWidgetButton} onClick={() => setIsFormVisible(prevState => !prevState)}/>
	</>;
}
