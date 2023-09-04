import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationDatabaseEvent } from './app-health-deleted-application-database.event';

@EventsHandler(AppHealthDeletedApplicationDatabaseEvent)
export class AppHealthDeletedApplicationDatabaseEventHandler implements IEventHandler<AppHealthDeletedApplicationDatabaseEvent>
{
    handle(event: AppHealthDeletedApplicationDatabaseEvent): void
    {
        // console.log('AppHealthDeletedApplicationDatabaseEvent: ', event);
    }
}
