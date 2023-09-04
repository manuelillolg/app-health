import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationAuthenticationsEvent } from './app-health-created-application-authentications.event';

@EventsHandler(AppHealthCreatedApplicationAuthenticationsEvent)
export class AppHealthCreatedApplicationAuthenticationsEventHandler implements IEventHandler<AppHealthCreatedApplicationAuthenticationsEvent>
{
    handle(event: AppHealthCreatedApplicationAuthenticationsEvent): void
    {
        // console.log('CreatedApplicationAuthenticationsEvent: ', event);
    }
}
