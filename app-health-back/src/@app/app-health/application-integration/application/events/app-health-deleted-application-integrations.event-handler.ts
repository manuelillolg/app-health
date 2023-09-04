import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationIntegrationsEvent } from './app-health-deleted-application-integrations.event';

@EventsHandler(AppHealthDeletedApplicationIntegrationsEvent)
export class AppHealthDeletedApplicationIntegrationsEventHandler implements IEventHandler<AppHealthDeletedApplicationIntegrationsEvent>
{
    handle(event: AppHealthDeletedApplicationIntegrationsEvent): void
    {
        // console.log('DeletedApplicationIntegrationsEvent: ', event);
    }
}
