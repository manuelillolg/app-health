import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationAuthorizationEvent } from './app-health-updated-application-authorization.event';

@EventsHandler(AppHealthUpdatedApplicationAuthorizationEvent)
export class AppHealthUpdatedApplicationAuthorizationEventHandler implements IEventHandler<AppHealthUpdatedApplicationAuthorizationEvent>
{
    handle(event: AppHealthUpdatedApplicationAuthorizationEvent): void
    {
        // console.log('UpdatedApplicationAuthorizationEvent: ', event);
    }
}
