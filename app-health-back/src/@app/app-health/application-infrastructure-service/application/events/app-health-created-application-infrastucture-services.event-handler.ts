import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationInfrastuctureServicesEvent } from './app-health-created-application-infrastucture-services.event';

@EventsHandler(AppHealthCreatedApplicationInfrastuctureServicesEvent)
export class AppHealthCreatedApplicationInfrastuctureServicesEventHandler implements IEventHandler<AppHealthCreatedApplicationInfrastuctureServicesEvent>
{
    handle(event: AppHealthCreatedApplicationInfrastuctureServicesEvent): void
    {
        // console.log('CreatedApplicationInfrastuctureServicesEvent: ', event);
    }
}
