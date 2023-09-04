import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationIntegrationEvent } from './app-health-created-application-integration.event';

@EventsHandler(AppHealthCreatedApplicationIntegrationEvent)
export class AppHealthCreatedApplicationIntegrationEventHandler implements IEventHandler<AppHealthCreatedApplicationIntegrationEvent>
{
    handle(event: AppHealthCreatedApplicationIntegrationEvent): void
    {
        // console.log('AppHealthCreatedApplicationIntegrationEvent: ', event);
    }
}
