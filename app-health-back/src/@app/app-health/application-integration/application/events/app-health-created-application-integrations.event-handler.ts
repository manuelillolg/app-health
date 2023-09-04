import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationIntegrationsEvent } from './app-health-created-application-integrations.event';

@EventsHandler(AppHealthCreatedApplicationIntegrationsEvent)
export class AppHealthCreatedApplicationIntegrationsEventHandler implements IEventHandler<AppHealthCreatedApplicationIntegrationsEvent>
{
    handle(event: AppHealthCreatedApplicationIntegrationsEvent): void
    {
        // console.log('CreatedApplicationIntegrationsEvent: ', event);
    }
}
