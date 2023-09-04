import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationDatabasesEvent } from './app-health-updated-application-databases.event';

@EventsHandler(AppHealthUpdatedApplicationDatabasesEvent)
export class AppHealthUpdatedApplicationDatabasesEventHandler implements IEventHandler<AppHealthUpdatedApplicationDatabasesEvent>
{
    handle(event: AppHealthUpdatedApplicationDatabasesEvent): void
    {
        // console.log('AppHealthUpdatedApplicationDatabasesEvent: ', event);
    }
}
