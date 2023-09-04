import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationAuthorizationsEvent } from './app-health-deleted-application-authorizations.event';

@EventsHandler(AppHealthDeletedApplicationAuthorizationsEvent)
export class AppHealthDeletedApplicationAuthorizationsEventHandler implements IEventHandler<AppHealthDeletedApplicationAuthorizationsEvent>
{
    handle(event: AppHealthDeletedApplicationAuthorizationsEvent): void
    {
        // console.log('DeletedApplicationAuthorizationsEvent: ', event);
    }
}
