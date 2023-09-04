import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedDatabaseEvent } from './app-health-updated-database.event';

@EventsHandler(AppHealthUpdatedDatabaseEvent)
export class AppHealthUpdatedDatabaseEventHandler implements IEventHandler<AppHealthUpdatedDatabaseEvent>
{
    handle(event: AppHealthUpdatedDatabaseEvent): void
    {
        // console.log('UpdatedDatabaseEvent: ', event);
    }
}
