import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../data/db";
import styles from "./widget-column.module.css";
import React from "react";
import {IWidget, WidgetType} from "../../types/types";
import TimeWidget from "../TimeWidget/TimeWidget";
import CurrencyWidget from "../CurrencyWidget/CurrencyWidget";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import NewWidgetButton from "../NewWidgetButton/NewWidgetButton";

type WidgetColumnProps = {
    column: number
}

function getWidgetByType(widget: IWidget) {
    switch (widget.type) {
        case WidgetType.Time:
            return <TimeWidget widget={widget}/>
        case WidgetType.Currency:
            return <CurrencyWidget widget={widget}/>
        case WidgetType.Weather:
            return <WeatherWidget widget={widget}/>
    }
}

export default function WidgetColumn({column}: WidgetColumnProps) {
    const widgets = useLiveQuery(() => db.widgets.where({column: column}).toArray(), [])
    return  <div className={styles.column}>
        {widgets && widgets.map(widget => getWidgetByType(widget))}
        <NewWidgetButton column={column}/>
    </div>
}