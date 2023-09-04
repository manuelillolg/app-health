import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationApiEvent } from './app-health-created-application-api.event';

@EventsHandler(AppHealthCreatedApplicationApiEvent)
export class AppHealthCreatedApplicationApiEventHandler implements IEventHandler<AppHealthCreatedApplicationApiEvent>
{
    handle(event: AppHealthCreatedApplicationApiEvent): void
    {
        // console.log('AppHealthCreatedApplicationApiEvent: ', event);
    }
}
