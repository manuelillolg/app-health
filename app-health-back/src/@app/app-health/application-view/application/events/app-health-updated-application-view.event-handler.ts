import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationViewEvent } from './app-health-updated-application-view.event';

@EventsHandler(AppHealthUpdatedApplicationViewEvent)
export class AppHealthUpdatedApplicationViewEventHandler implements IEventHandler<AppHealthUpdatedApplicationViewEvent>
{
    handle(event: AppHealthUpdatedApplicationViewEvent): void
    {
        // console.log('UpdatedApplicationViewEvent: ', event);
    }
}
