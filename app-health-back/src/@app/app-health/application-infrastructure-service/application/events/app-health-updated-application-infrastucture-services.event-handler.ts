import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationInfrastuctureServicesEvent } from './app-health-updated-application-infrastucture-services.event';

@EventsHandler(AppHealthUpdatedApplicationInfrastuctureServicesEvent)
export class AppHealthUpdatedApplicationInfrastuctureServicesEventHandler implements IEventHandler<AppHealthUpdatedApplicationInfrastuctureServicesEvent>
{
    handle(event: AppHealthUpdatedApplicationInfrastuctureServicesEvent): void
    {
        // console.log('AppHealthUpdatedApplicationInfrastuctureServicesEvent: ', event);
    }
}
