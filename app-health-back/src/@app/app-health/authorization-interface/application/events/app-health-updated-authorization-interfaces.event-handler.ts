import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedAuthorizationInterfacesEvent } from './app-health-updated-authorization-interfaces.event';

@EventsHandler(AppHealthUpdatedAuthorizationInterfacesEvent)
export class AppHealthUpdatedAuthorizationInterfacesEventHandler implements IEventHandler<AppHealthUpdatedAuthorizationInterfacesEvent>
{
    handle(event: AppHealthUpdatedAuthorizationInterfacesEvent): void
    {
        // console.log('AppHealthUpdatedAuthorizationInterfacesEvent: ', event);
    }
}
