import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationsEvent } from './app-health-updated-applications.event';

@EventsHandler(AppHealthUpdatedApplicationsEvent)
export class AppHealthUpdatedApplicationsEventHandler implements IEventHandler<AppHealthUpdatedApplicationsEvent>
{
    handle(event: AppHealthUpdatedApplicationsEvent): void
    {
        // console.log('AppHealthUpdatedApplicationsEvent: ', event);
    }
}
