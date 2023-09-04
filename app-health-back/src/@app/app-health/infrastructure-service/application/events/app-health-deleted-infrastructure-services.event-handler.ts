import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedInfrastructureServicesEvent } from './app-health-deleted-infrastructure-services.event';

@EventsHandler(AppHealthDeletedInfrastructureServicesEvent)
export class AppHealthDeletedInfrastructureServicesEventHandler implements IEventHandler<AppHealthDeletedInfrastructureServicesEvent>
{
    handle(event: AppHealthDeletedInfrastructureServicesEvent): void
    {
        // console.log('DeletedInfrastructureServicesEvent: ', event);
    }
}
