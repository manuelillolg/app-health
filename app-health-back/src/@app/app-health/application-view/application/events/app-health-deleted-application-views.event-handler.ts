import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationViewsEvent } from './app-health-deleted-application-views.event';

@EventsHandler(AppHealthDeletedApplicationViewsEvent)
export class AppHealthDeletedApplicationViewsEventHandler implements IEventHandler<AppHealthDeletedApplicationViewsEvent>
{
    handle(event: AppHealthDeletedApplicationViewsEvent): void
    {
        // console.log('DeletedApplicationViewsEvent: ', event);
    }
}
