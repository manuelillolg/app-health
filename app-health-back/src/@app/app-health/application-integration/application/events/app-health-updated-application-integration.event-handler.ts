import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationIntegrationEvent } from './app-health-updated-application-integration.event';

@EventsHandler(AppHealthUpdatedApplicationIntegrationEvent)
export class AppHealthUpdatedApplicationIntegrationEventHandler implements IEventHandler<AppHealthUpdatedApplicationIntegrationEvent>
{
    handle(event: AppHealthUpdatedApplicationIntegrationEvent): void
    {
        // console.log('UpdatedApplicationIntegrationEvent: ', event);
    }
}
