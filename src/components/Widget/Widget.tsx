import styles from './widget.module.css'
import DeleteWidgetButton from "../DeleteWidgetButton/DeleteWidgetButton";
import MoveWidgetButton, {ArrowType} from "../MoveWidgetButton/MoveWidgetButton";
import {IWidget} from "../../types/types";
import {db} from "../../data/db";

type WidgetProps = {
	widget: IWidget
	children: React.ReactNode
}

export default function Widget({widget, children}: WidgetProps) {

	const handleMoveButtonClick = (direction: ArrowType) => {
		const newColumn = direction === ArrowType.LEFT ? widget.column - 1 : widget.column + 1;
		db.widgets.update(widget.id, {column: newColumn})
	}

	return <div className={styles.widget}>
		<menu>
				<MoveWidgetButton arrowType={ArrowType.LEFT} disabled={widget.column === 1} onMove={handleMoveButtonClick}/>
				<MoveWidgetButton arrowType={ArrowType.RIGHT} disabled={widget.column === 3} onMove={handleMoveButtonClick}/>
				<DeleteWidgetButton widgetId={widget.id}/>
		</menu>
		{children}
	</div>;
}