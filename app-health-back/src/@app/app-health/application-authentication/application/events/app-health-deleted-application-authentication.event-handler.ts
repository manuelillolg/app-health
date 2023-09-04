import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationAuthenticationEvent } from './app-health-deleted-application-authentication.event';

@EventsHandler(AppHealthDeletedApplicationAuthenticationEvent)
export class AppHealthDeletedApplicationAuthenticationEventHandler implements IEventHandler<AppHealthDeletedApplicationAuthenticationEvent>
{
    handle(event: AppHealthDeletedApplicationAuthenticationEvent): void
    {
        // console.log('AppHealthDeletedApplicationAuthenticationEvent: ', event);
    }
}
