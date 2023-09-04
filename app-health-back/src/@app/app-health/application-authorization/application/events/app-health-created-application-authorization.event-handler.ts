import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationAuthorizationEvent } from './app-health-created-application-authorization.event';

@EventsHandler(AppHealthCreatedApplicationAuthorizationEvent)
export class AppHealthCreatedApplicationAuthorizationEventHandler implements IEventHandler<AppHealthCreatedApplicationAuthorizationEvent>
{
    handle(event: AppHealthCreatedApplicationAuthorizationEvent): void
    {
        // console.log('AppHealthCreatedApplicationAuthorizationEvent: ', event);
    }
}
