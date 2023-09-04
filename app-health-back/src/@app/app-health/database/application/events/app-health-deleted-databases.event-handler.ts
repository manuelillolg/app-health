import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedDatabasesEvent } from './app-health-deleted-databases.event';

@EventsHandler(AppHealthDeletedDatabasesEvent)
export class AppHealthDeletedDatabasesEventHandler implements IEventHandler<AppHealthDeletedDatabasesEvent>
{
    handle(event: AppHealthDeletedDatabasesEvent): void
    {
        // console.log('DeletedDatabasesEvent: ', event);
    }
}
