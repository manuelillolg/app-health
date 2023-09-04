import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationApiEvent } from './app-health-deleted-application-api.event';

@EventsHandler(AppHealthDeletedApplicationApiEvent)
export class AppHealthDeletedApplicationApiEventHandler implements IEventHandler<AppHealthDeletedApplicationApiEvent>
{
    handle(event: AppHealthDeletedApplicationApiEvent): void
    {
        // console.log('AppHealthDeletedApplicationApiEvent: ', event);
    }
}
