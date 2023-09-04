import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedInfrastructureServiceEvent } from './app-health-updated-infrastructure-service.event';

@EventsHandler(AppHealthUpdatedInfrastructureServiceEvent)
export class AppHealthUpdatedInfrastructureServiceEventHandler implements IEventHandler<AppHealthUpdatedInfrastructureServiceEvent>
{
    handle(event: AppHealthUpdatedInfrastructureServiceEvent): void
    {
        // console.log('UpdatedInfrastructureServiceEvent: ', event);
    }
}
