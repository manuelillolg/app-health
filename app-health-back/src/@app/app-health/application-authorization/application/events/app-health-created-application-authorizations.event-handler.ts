import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationAuthorizationsEvent } from './app-health-created-application-authorizations.event';

@EventsHandler(AppHealthCreatedApplicationAuthorizationsEvent)
export class AppHealthCreatedApplicationAuthorizationsEventHandler implements IEventHandler<AppHealthCreatedApplicationAuthorizationsEvent>
{
    handle(event: AppHealthCreatedApplicationAuthorizationsEvent): void
    {
        // console.log('CreatedApplicationAuthorizationsEvent: ', event);
    }
}
