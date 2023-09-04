import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationViewEvent } from './app-health-created-application-view.event';

@EventsHandler(AppHealthCreatedApplicationViewEvent)
export class AppHealthCreatedApplicationViewEventHandler implements IEventHandler<AppHealthCreatedApplicationViewEvent>
{
    handle(event: AppHealthCreatedApplicationViewEvent): void
    {
        // console.log('AppHealthCreatedApplicationViewEvent: ', event);
    }
}
