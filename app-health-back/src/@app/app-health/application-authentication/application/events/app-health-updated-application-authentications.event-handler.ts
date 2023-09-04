import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationAuthenticationsEvent } from './app-health-updated-application-authentications.event';

@EventsHandler(AppHealthUpdatedApplicationAuthenticationsEvent)
export class AppHealthUpdatedApplicationAuthenticationsEventHandler implements IEventHandler<AppHealthUpdatedApplicationAuthenticationsEvent>
{
    handle(event: AppHealthUpdatedApplicationAuthenticationsEvent): void
    {
        // console.log('AppHealthUpdatedApplicationAuthenticationsEvent: ', event);
    }
}
