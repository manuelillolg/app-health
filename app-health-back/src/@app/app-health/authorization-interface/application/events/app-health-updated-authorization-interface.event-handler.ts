import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedAuthorizationInterfaceEvent } from './app-health-updated-authorization-interface.event';

@EventsHandler(AppHealthUpdatedAuthorizationInterfaceEvent)
export class AppHealthUpdatedAuthorizationInterfaceEventHandler implements IEventHandler<AppHealthUpdatedAuthorizationInterfaceEvent>
{
    handle(event: AppHealthUpdatedAuthorizationInterfaceEvent): void
    {
        // console.log('UpdatedAuthorizationInterfaceEvent: ', event);
    }
}
