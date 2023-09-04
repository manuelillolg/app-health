import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationViewEvent } from './app-health-deleted-application-view.event';

@EventsHandler(AppHealthDeletedApplicationViewEvent)
export class AppHealthDeletedApplicationViewEventHandler implements IEventHandler<AppHealthDeletedApplicationViewEvent>
{
    handle(event: AppHealthDeletedApplicationViewEvent): void
    {
        // console.log('AppHealthDeletedApplicationViewEvent: ', event);
    }
}
