import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedAuthorizationInterfaceEvent } from './app-health-created-authorization-interface.event';

@EventsHandler(AppHealthCreatedAuthorizationInterfaceEvent)
export class AppHealthCreatedAuthorizationInterfaceEventHandler implements IEventHandler<AppHealthCreatedAuthorizationInterfaceEvent>
{
    handle(event: AppHealthCreatedAuthorizationInterfaceEvent): void
    {
        // console.log('AppHealthCreatedAuthorizationInterfaceEvent: ', event);
    }
}
