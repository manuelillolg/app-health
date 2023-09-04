import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationInfrastuctureServicesEvent } from './app-health-deleted-application-infrastucture-services.event';

@EventsHandler(AppHealthDeletedApplicationInfrastuctureServicesEvent)
export class AppHealthDeletedApplicationInfrastuctureServicesEventHandler implements IEventHandler<AppHealthDeletedApplicationInfrastuctureServicesEvent>
{
    handle(event: AppHealthDeletedApplicationInfrastuctureServicesEvent): void
    {
        // console.log('DeletedApplicationInfrastuctureServicesEvent: ', event);
    }
}
