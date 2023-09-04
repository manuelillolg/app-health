import { AppHealthUpdatedDatabaseEvent } from './app-health-updated-database.event';

export class AppHealthUpdatedDatabasesEvent
{
    constructor(
        public readonly databases: AppHealthUpdatedDatabaseEvent[],
    ) {}
}
