import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationInfrastructureServiceEvent } from './app-health-created-application-infrastructure-service.event';

@EventsHandler(AppHealthCreatedApplicationInfrastructureServiceEvent)
export class AppHealthCreatedApplicationInfrastructureServiceEventHandler implements IEventHandler<AppHealthCreatedApplicationInfrastructureServiceEvent>
{
    handle(event: AppHealthCreatedApplicationInfrastructureServiceEvent): void
    {
        // console.log('AppHealthCreatedApplicationInfrastructureServiceEvent: ', event);
    }
}
