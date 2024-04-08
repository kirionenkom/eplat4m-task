import styles from './delete-widget-button.module.css'
import {IWidget} from "../../types/types";
import {db} from "../../data/db";

type DeleteWidgetButtonProps = {
	widgetId: IWidget['id']
}

export default function DeleteWidgetButton({widgetId}: DeleteWidgetButtonProps) {

	const onDelete = () => {
		db.widgets.delete(widgetId);
	}
	return <button type={'button'} className={styles.deleteWidget} onClick={onDelete}></button>;
}