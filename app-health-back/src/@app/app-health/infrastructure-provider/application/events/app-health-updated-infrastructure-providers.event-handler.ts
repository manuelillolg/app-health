import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedInfrastructureProvidersEvent } from './app-health-updated-infrastructure-providers.event';

@EventsHandler(AppHealthUpdatedInfrastructureProvidersEvent)
export class AppHealthUpdatedInfrastructureProvidersEventHandler implements IEventHandler<AppHealthUpdatedInfrastructureProvidersEvent>
{
    handle(event: AppHealthUpdatedInfrastructureProvidersEvent): void
    {
        // console.log('AppHealthUpdatedInfrastructureProvidersEvent: ', event);
    }
}
