import styles from './move-widget-button.module.css'
import cn from 'classnames'

type MoveWidgetButtonProps = {
	arrowType: ArrowType
	disabled: boolean
	onMove: (direction: ArrowType) => void
}

export enum ArrowType {
	LEFT,
	RIGHT
}

export default function MoveWidgetButton({arrowType, disabled, onMove}: MoveWidgetButtonProps) {
	return <button type={'button'}
	               className={cn(styles.moveWidget, arrowType === ArrowType.LEFT ? styles.left : styles.right)}
	               disabled={disabled} onClick={() => onMove(arrowType)}/>;
}