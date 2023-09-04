import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedAuthorizationInterfacesEvent } from './app-health-created-authorization-interfaces.event';

@EventsHandler(AppHealthCreatedAuthorizationInterfacesEvent)
export class AppHealthCreatedAuthorizationInterfacesEventHandler implements IEventHandler<AppHealthCreatedAuthorizationInterfacesEvent>
{
    handle(event: AppHealthCreatedAuthorizationInterfacesEvent): void
    {
        // console.log('CreatedAuthorizationInterfacesEvent: ', event);
    }
}
