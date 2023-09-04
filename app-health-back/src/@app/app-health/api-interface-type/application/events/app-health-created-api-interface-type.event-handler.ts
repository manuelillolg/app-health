import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApiInterfaceTypeEvent } from './app-health-created-api-interface-type.event';

@EventsHandler(AppHealthCreatedApiInterfaceTypeEvent)
export class AppHealthCreatedApiInterfaceTypeEventHandler implements IEventHandler<AppHealthCreatedApiInterfaceTypeEvent>
{
    handle(event: AppHealthCreatedApiInterfaceTypeEvent): void
    {
        // console.log('AppHealthCreatedApiInterfaceTypeEvent: ', event);
    }
}
