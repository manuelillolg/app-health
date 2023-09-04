import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedDatabaseEvent } from './app-health-deleted-database.event';

@EventsHandler(AppHealthDeletedDatabaseEvent)
export class AppHealthDeletedDatabaseEventHandler implements IEventHandler<AppHealthDeletedDatabaseEvent>
{
    handle(event: AppHealthDeletedDatabaseEvent): void
    {
        // console.log('AppHealthDeletedDatabaseEvent: ', event);
    }
}
