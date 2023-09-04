import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationInfrastructureServiceEvent } from './app-health-deleted-application-infrastructure-service.event';

@EventsHandler(AppHealthDeletedApplicationInfrastructureServiceEvent)
export class AppHealthDeletedApplicationInfrastructureServiceEventHandler implements IEventHandler<AppHealthDeletedApplicationInfrastructureServiceEvent>
{
    handle(event: AppHealthDeletedApplicationInfrastructureServiceEvent): void
    {
        // console.log('AppHealthDeletedApplicationInfrastructureServiceEvent: ', event);
    }
}
