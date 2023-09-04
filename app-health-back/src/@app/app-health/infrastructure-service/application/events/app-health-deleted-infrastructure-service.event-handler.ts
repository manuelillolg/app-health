import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedInfrastructureServiceEvent } from './app-health-deleted-infrastructure-service.event';

@EventsHandler(AppHealthDeletedInfrastructureServiceEvent)
export class AppHealthDeletedInfrastructureServiceEventHandler implements IEventHandler<AppHealthDeletedInfrastructureServiceEvent>
{
    handle(event: AppHealthDeletedInfrastructureServiceEvent): void
    {
        // console.log('AppHealthDeletedInfrastructureServiceEvent: ', event);
    }
}
