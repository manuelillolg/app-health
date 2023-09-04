import { AppHealthDeletedDatabaseEvent } from './app-health-deleted-database.event';

export class AppHealthDeletedDatabasesEvent
{
    constructor(
        public readonly databases: AppHealthDeletedDatabaseEvent[],
    ) {}
}
