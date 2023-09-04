import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationAuthenticationEvent } from './app-health-updated-application-authentication.event';

@EventsHandler(AppHealthUpdatedApplicationAuthenticationEvent)
export class AppHealthUpdatedApplicationAuthenticationEventHandler implements IEventHandler<AppHealthUpdatedApplicationAuthenticationEvent>
{
    handle(event: AppHealthUpdatedApplicationAuthenticationEvent): void
    {
        // console.log('UpdatedApplicationAuthenticationEvent: ', event);
    }
}
