import Dexie, { Table } from 'dexie';
import {IWidget} from "../types/types";

export class MySubClassedDexie extends Dexie {
	widgets!: Table<IWidget>;

	constructor() {
		super('widgetsDb');
		this.version(1).stores({
			widgets: '++id, column, type, settings' // Primary key and indexed props
		});
	}
}

export const db = new MySubClassedDexie();