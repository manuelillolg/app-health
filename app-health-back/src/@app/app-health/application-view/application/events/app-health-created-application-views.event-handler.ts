import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationViewsEvent } from './app-health-created-application-views.event';

@EventsHandler(AppHealthCreatedApplicationViewsEvent)
export class AppHealthCreatedApplicationViewsEventHandler implements IEventHandler<AppHealthCreatedApplicationViewsEvent>
{
    handle(event: AppHealthCreatedApplicationViewsEvent): void
    {
        // console.log('CreatedApplicationViewsEvent: ', event);
    }
}
