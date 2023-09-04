import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationAuthorizationsEvent } from './app-health-updated-application-authorizations.event';

@EventsHandler(AppHealthUpdatedApplicationAuthorizationsEvent)
export class AppHealthUpdatedApplicationAuthorizationsEventHandler implements IEventHandler<AppHealthUpdatedApplicationAuthorizationsEvent>
{
    handle(event: AppHealthUpdatedApplicationAuthorizationsEvent): void
    {
        // console.log('AppHealthUpdatedApplicationAuthorizationsEvent: ', event);
    }
}
