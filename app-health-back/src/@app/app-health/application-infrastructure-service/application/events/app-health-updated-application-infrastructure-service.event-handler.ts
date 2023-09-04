import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationInfrastructureServiceEvent } from './app-health-updated-application-infrastructure-service.event';

@EventsHandler(AppHealthUpdatedApplicationInfrastructureServiceEvent)
export class AppHealthUpdatedApplicationInfrastructureServiceEventHandler implements IEventHandler<AppHealthUpdatedApplicationInfrastructureServiceEvent>
{
    handle(event: AppHealthUpdatedApplicationInfrastructureServiceEvent): void
    {
        // console.log('UpdatedApplicationInfrastructureServiceEvent: ', event);
    }
}
