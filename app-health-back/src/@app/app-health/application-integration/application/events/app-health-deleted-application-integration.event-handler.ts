import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationIntegrationEvent } from './app-health-deleted-application-integration.event';

@EventsHandler(AppHealthDeletedApplicationIntegrationEvent)
export class AppHealthDeletedApplicationIntegrationEventHandler implements IEventHandler<AppHealthDeletedApplicationIntegrationEvent>
{
    handle(event: AppHealthDeletedApplicationIntegrationEvent): void
    {
        // console.log('AppHealthDeletedApplicationIntegrationEvent: ', event);
    }
}
