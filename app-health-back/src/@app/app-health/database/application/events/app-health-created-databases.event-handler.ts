import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedDatabasesEvent } from './app-health-created-databases.event';

@EventsHandler(AppHealthCreatedDatabasesEvent)
export class AppHealthCreatedDatabasesEventHandler implements IEventHandler<AppHealthCreatedDatabasesEvent>
{
    handle(event: AppHealthCreatedDatabasesEvent): void
    {
        // console.log('CreatedDatabasesEvent: ', event);
    }
}
