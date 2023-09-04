import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationDatabaseEvent } from './app-health-updated-application-database.event';

@EventsHandler(AppHealthUpdatedApplicationDatabaseEvent)
export class AppHealthUpdatedApplicationDatabaseEventHandler implements IEventHandler<AppHealthUpdatedApplicationDatabaseEvent>
{
    handle(event: AppHealthUpdatedApplicationDatabaseEvent): void
    {
        // console.log('UpdatedApplicationDatabaseEvent: ', event);
    }
}
