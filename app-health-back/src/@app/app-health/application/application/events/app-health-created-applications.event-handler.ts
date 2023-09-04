import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationsEvent } from './app-health-created-applications.event';

@EventsHandler(AppHealthCreatedApplicationsEvent)
export class AppHealthCreatedApplicationsEventHandler implements IEventHandler<AppHealthCreatedApplicationsEvent>
{
    handle(event: AppHealthCreatedApplicationsEvent): void
    {
        // console.log('CreatedApplicationsEvent: ', event);
    }
}
