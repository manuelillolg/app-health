import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedAuthenticationInterfacesEvent } from './app-health-created-authentication-interfaces.event';

@EventsHandler(AppHealthCreatedAuthenticationInterfacesEvent)
export class AppHealthCreatedAuthenticationInterfacesEventHandler implements IEventHandler<AppHealthCreatedAuthenticationInterfacesEvent>
{
    handle(event: AppHealthCreatedAuthenticationInterfacesEvent): void
    {
        // console.log('CreatedAuthenticationInterfacesEvent: ', event);
    }
}
