import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedInfrastructureProviderEvent } from './app-health-updated-infrastructure-provider.event';

@EventsHandler(AppHealthUpdatedInfrastructureProviderEvent)
export class AppHealthUpdatedInfrastructureProviderEventHandler implements IEventHandler<AppHealthUpdatedInfrastructureProviderEvent>
{
    handle(event: AppHealthUpdatedInfrastructureProviderEvent): void
    {
        // console.log('UpdatedInfrastructureProviderEvent: ', event);
    }
}
