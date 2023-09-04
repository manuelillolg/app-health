import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationAuthorizationEvent } from './app-health-deleted-application-authorization.event';

@EventsHandler(AppHealthDeletedApplicationAuthorizationEvent)
export class AppHealthDeletedApplicationAuthorizationEventHandler implements IEventHandler<AppHealthDeletedApplicationAuthorizationEvent>
{
    handle(event: AppHealthDeletedApplicationAuthorizationEvent): void
    {
        // console.log('AppHealthDeletedApplicationAuthorizationEvent: ', event);
    }
}
