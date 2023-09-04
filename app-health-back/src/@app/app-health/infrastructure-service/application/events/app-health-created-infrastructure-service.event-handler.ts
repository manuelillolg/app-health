import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedInfrastructureServiceEvent } from './app-health-created-infrastructure-service.event';

@EventsHandler(AppHealthCreatedInfrastructureServiceEvent)
export class AppHealthCreatedInfrastructureServiceEventHandler implements IEventHandler<AppHealthCreatedInfrastructureServiceEvent>
{
    handle(event: AppHealthCreatedInfrastructureServiceEvent): void
    {
        // console.log('AppHealthCreatedInfrastructureServiceEvent: ', event);
    }
}
