import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationAuthenticationEvent } from './app-health-created-application-authentication.event';

@EventsHandler(AppHealthCreatedApplicationAuthenticationEvent)
export class AppHealthCreatedApplicationAuthenticationEventHandler implements IEventHandler<AppHealthCreatedApplicationAuthenticationEvent>
{
    handle(event: AppHealthCreatedApplicationAuthenticationEvent): void
    {
        // console.log('AppHealthCreatedApplicationAuthenticationEvent: ', event);
    }
}
