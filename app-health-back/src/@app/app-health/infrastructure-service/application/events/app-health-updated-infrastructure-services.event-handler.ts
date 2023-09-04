import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedInfrastructureServicesEvent } from './app-health-updated-infrastructure-services.event';

@EventsHandler(AppHealthUpdatedInfrastructureServicesEvent)
export class AppHealthUpdatedInfrastructureServicesEventHandler implements IEventHandler<AppHealthUpdatedInfrastructureServicesEvent>
{
    handle(event: AppHealthUpdatedInfrastructureServicesEvent): void
    {
        // console.log('AppHealthUpdatedInfrastructureServicesEvent: ', event);
    }
}
