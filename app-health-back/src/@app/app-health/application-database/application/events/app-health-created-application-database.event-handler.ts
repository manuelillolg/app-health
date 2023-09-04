import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationDatabaseEvent } from './app-health-created-application-database.event';

@EventsHandler(AppHealthCreatedApplicationDatabaseEvent)
export class AppHealthCreatedApplicationDatabaseEventHandler implements IEventHandler<AppHealthCreatedApplicationDatabaseEvent>
{
    handle(event: AppHealthCreatedApplicationDatabaseEvent): void
    {
        // console.log('AppHealthCreatedApplicationDatabaseEvent: ', event);
    }
}
