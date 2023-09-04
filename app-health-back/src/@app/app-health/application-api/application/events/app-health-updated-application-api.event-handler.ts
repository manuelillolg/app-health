import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationApiEvent } from './app-health-updated-application-api.event';

@EventsHandler(AppHealthUpdatedApplicationApiEvent)
export class AppHealthUpdatedApplicationApiEventHandler implements IEventHandler<AppHealthUpdatedApplicationApiEvent>
{
    handle(event: AppHealthUpdatedApplicationApiEvent): void
    {
        // console.log('UpdatedApplicationApiEvent: ', event);
    }
}
