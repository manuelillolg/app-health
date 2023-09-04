import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedInfrastructureProvidersEvent } from './app-health-deleted-infrastructure-providers.event';

@EventsHandler(AppHealthDeletedInfrastructureProvidersEvent)
export class AppHealthDeletedInfrastructureProvidersEventHandler implements IEventHandler<AppHealthDeletedInfrastructureProvidersEvent>
{
    handle(event: AppHealthDeletedInfrastructureProvidersEvent): void
    {
        // console.log('DeletedInfrastructureProvidersEvent: ', event);
    }
}
