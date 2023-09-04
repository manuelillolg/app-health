import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApiInterfaceTypeEvent } from './app-health-updated-api-interface-type.event';

@EventsHandler(AppHealthUpdatedApiInterfaceTypeEvent)
export class AppHealthUpdatedApiInterfaceTypeEventHandler implements IEventHandler<AppHealthUpdatedApiInterfaceTypeEvent>
{
    handle(event: AppHealthUpdatedApiInterfaceTypeEvent): void
    {
        // console.log('UpdatedApiInterfaceTypeEvent: ', event);
    }
}
