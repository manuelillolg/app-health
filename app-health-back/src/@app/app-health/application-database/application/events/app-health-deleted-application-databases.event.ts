import { AppHealthDeletedApplicationDatabaseEvent } from './app-health-deleted-application-database.event';

export class AppHealthDeletedApplicationDatabasesEvent
{
    constructor(
        public readonly applicationDatabases: AppHealthDeletedApplicationDatabaseEvent[],
    ) {}
}
