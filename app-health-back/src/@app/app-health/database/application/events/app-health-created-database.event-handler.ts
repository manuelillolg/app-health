import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedDatabaseEvent } from './app-health-created-database.event';

@EventsHandler(AppHealthCreatedDatabaseEvent)
export class AppHealthCreatedDatabaseEventHandler implements IEventHandler<AppHealthCreatedDatabaseEvent>
{
    handle(event: AppHealthCreatedDatabaseEvent): void
    {
        // console.log('AppHealthCreatedDatabaseEvent: ', event);
    }
}
