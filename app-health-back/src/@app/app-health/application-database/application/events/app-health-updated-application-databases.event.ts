import { AppHealthUpdatedApplicationDatabaseEvent } from './app-health-updated-application-database.event';

export class AppHealthUpdatedApplicationDatabasesEvent
{
    constructor(
        public readonly applicationDatabases: AppHealthUpdatedApplicationDatabaseEvent[],
    ) {}
}
