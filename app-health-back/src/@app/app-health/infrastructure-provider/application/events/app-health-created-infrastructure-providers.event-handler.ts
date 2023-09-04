import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedInfrastructureProvidersEvent } from './app-health-created-infrastructure-providers.event';

@EventsHandler(AppHealthCreatedInfrastructureProvidersEvent)
export class AppHealthCreatedInfrastructureProvidersEventHandler implements IEventHandler<AppHealthCreatedInfrastructureProvidersEvent>
{
    handle(event: AppHealthCreatedInfrastructureProvidersEvent): void
    {
        // console.log('CreatedInfrastructureProvidersEvent: ', event);
    }
}
