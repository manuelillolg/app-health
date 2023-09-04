import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationAuthenticationsEvent } from './app-health-deleted-application-authentications.event';

@EventsHandler(AppHealthDeletedApplicationAuthenticationsEvent)
export class AppHealthDeletedApplicationAuthenticationsEventHandler implements IEventHandler<AppHealthDeletedApplicationAuthenticationsEvent>
{
    handle(event: AppHealthDeletedApplicationAuthenticationsEvent): void
    {
        // console.log('DeletedApplicationAuthenticationsEvent: ', event);
    }
}
