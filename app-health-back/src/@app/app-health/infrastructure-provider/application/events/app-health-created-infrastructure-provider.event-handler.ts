import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedInfrastructureProviderEvent } from './app-health-created-infrastructure-provider.event';

@EventsHandler(AppHealthCreatedInfrastructureProviderEvent)
export class AppHealthCreatedInfrastructureProviderEventHandler implements IEventHandler<AppHealthCreatedInfrastructureProviderEvent>
{
    handle(event: AppHealthCreatedInfrastructureProviderEvent): void
    {
        // console.log('AppHealthCreatedInfrastructureProviderEvent: ', event);
    }
}
