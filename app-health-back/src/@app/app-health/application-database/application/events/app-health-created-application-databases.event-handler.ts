import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationDatabasesEvent } from './app-health-created-application-databases.event';

@EventsHandler(AppHealthCreatedApplicationDatabasesEvent)
export class AppHealthCreatedApplicationDatabasesEventHandler implements IEventHandler<AppHealthCreatedApplicationDatabasesEvent>
{
    handle(event: AppHealthCreatedApplicationDatabasesEvent): void
    {
        // console.log('CreatedApplicationDatabasesEvent: ', event);
    }
}
