import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationsEvent } from './app-health-deleted-applications.event';

@EventsHandler(AppHealthDeletedApplicationsEvent)
export class AppHealthDeletedApplicationsEventHandler implements IEventHandler<AppHealthDeletedApplicationsEvent>
{
    handle(event: AppHealthDeletedApplicationsEvent): void
    {
        // console.log('DeletedApplicationsEvent: ', event);
    }
}
