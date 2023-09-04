import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationDatabasesEvent } from './app-health-deleted-application-databases.event';

@EventsHandler(AppHealthDeletedApplicationDatabasesEvent)
export class AppHealthDeletedApplicationDatabasesEventHandler implements IEventHandler<AppHealthDeletedApplicationDatabasesEvent>
{
    handle(event: AppHealthDeletedApplicationDatabasesEvent): void
    {
        // console.log('DeletedApplicationDatabasesEvent: ', event);
    }
}
