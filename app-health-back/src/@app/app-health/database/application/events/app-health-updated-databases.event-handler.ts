import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedDatabasesEvent } from './app-health-updated-databases.event';

@EventsHandler(AppHealthUpdatedDatabasesEvent)
export class AppHealthUpdatedDatabasesEventHandler implements IEventHandler<AppHealthUpdatedDatabasesEvent>
{
    handle(event: AppHealthUpdatedDatabasesEvent): void
    {
        // console.log('AppHealthUpdatedDatabasesEvent: ', event);
    }
}
