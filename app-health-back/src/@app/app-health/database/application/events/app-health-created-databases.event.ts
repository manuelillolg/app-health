import { AppHealthCreatedDatabaseEvent } from './app-health-created-database.event';

export class AppHealthCreatedDatabasesEvent
{
    constructor(
        public readonly databases: AppHealthCreatedDatabaseEvent[],
    ) {}
}
