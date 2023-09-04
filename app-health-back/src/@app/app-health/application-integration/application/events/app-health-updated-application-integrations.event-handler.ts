import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationIntegrationsEvent } from './app-health-updated-application-integrations.event';

@EventsHandler(AppHealthUpdatedApplicationIntegrationsEvent)
export class AppHealthUpdatedApplicationIntegrationsEventHandler implements IEventHandler<AppHealthUpdatedApplicationIntegrationsEvent>
{
    handle(event: AppHealthUpdatedApplicationIntegrationsEvent): void
    {
        // console.log('AppHealthUpdatedApplicationIntegrationsEvent: ', event);
    }
}
