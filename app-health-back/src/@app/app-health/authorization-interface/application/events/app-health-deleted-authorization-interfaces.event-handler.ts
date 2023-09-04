import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedAuthorizationInterfacesEvent } from './app-health-deleted-authorization-interfaces.event';

@EventsHandler(AppHealthDeletedAuthorizationInterfacesEvent)
export class AppHealthDeletedAuthorizationInterfacesEventHandler implements IEventHandler<AppHealthDeletedAuthorizationInterfacesEvent>
{
    handle(event: AppHealthDeletedAuthorizationInterfacesEvent): void
    {
        // console.log('DeletedAuthorizationInterfacesEvent: ', event);
    }
}
