import { AppHealthCreatedApplicationDatabaseEvent } from './app-health-created-application-database.event';

export class AppHealthCreatedApplicationDatabasesEvent
{
    constructor(
        public readonly applicationDatabases: AppHealthCreatedApplicationDatabaseEvent[],
    ) {}
}
