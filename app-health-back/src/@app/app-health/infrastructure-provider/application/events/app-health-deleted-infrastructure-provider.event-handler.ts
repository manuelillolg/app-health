import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedInfrastructureProviderEvent } from './app-health-deleted-infrastructure-provider.event';

@EventsHandler(AppHealthDeletedInfrastructureProviderEvent)
export class AppHealthDeletedInfrastructureProviderEventHandler implements IEventHandler<AppHealthDeletedInfrastructureProviderEvent>
{
    handle(event: AppHealthDeletedInfrastructureProviderEvent): void
    {
        // console.log('AppHealthDeletedInfrastructureProviderEvent: ', event);
    }
}
