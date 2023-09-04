import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedInfrastructureServicesEvent } from './app-health-created-infrastructure-services.event';

@EventsHandler(AppHealthCreatedInfrastructureServicesEvent)
export class AppHealthCreatedInfrastructureServicesEventHandler implements IEventHandler<AppHealthCreatedInfrastructureServicesEvent>
{
    handle(event: AppHealthCreatedInfrastructureServicesEvent): void
    {
        // console.log('CreatedInfrastructureServicesEvent: ', event);
    }
}
