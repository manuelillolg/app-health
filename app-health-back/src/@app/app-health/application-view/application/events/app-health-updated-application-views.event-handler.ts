import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationViewsEvent } from './app-health-updated-application-views.event';

@EventsHandler(AppHealthUpdatedApplicationViewsEvent)
export class AppHealthUpdatedApplicationViewsEventHandler implements IEventHandler<AppHealthUpdatedApplicationViewsEvent>
{
    handle(event: AppHealthUpdatedApplicationViewsEvent): void
    {
        // console.log('AppHealthUpdatedApplicationViewsEvent: ', event);
    }
}
