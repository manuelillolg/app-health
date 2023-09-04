import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedAuthorizationInterfaceEvent } from './app-health-deleted-authorization-interface.event';

@EventsHandler(AppHealthDeletedAuthorizationInterfaceEvent)
export class AppHealthDeletedAuthorizationInterfaceEventHandler implements IEventHandler<AppHealthDeletedAuthorizationInterfaceEvent>
{
    handle(event: AppHealthDeletedAuthorizationInterfaceEvent): void
    {
        // console.log('AppHealthDeletedAuthorizationInterfaceEvent: ', event);
    }
}
