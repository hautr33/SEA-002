import db from '../config/database'


function countRecord(tableName: string): number {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`);
    const result = stmt.get() as { count: number };
    return result?.count ?? 0;
}

export function CountRecordsOnInit(tableName: string) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            static counter: number = countRecord(tableName) + 1;

            constructor(...args: any[]) {
                super(...args);
                console.log(`[INIT] ${tableName} count: ${(this.constructor as any).counter}`);
            }
        };
    };
}