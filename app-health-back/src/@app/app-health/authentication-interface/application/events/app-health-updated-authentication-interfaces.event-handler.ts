import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedAuthenticationInterfacesEvent } from './app-health-updated-authentication-interfaces.event';

@EventsHandler(AppHealthUpdatedAuthenticationInterfacesEvent)
export class AppHealthUpdatedAuthenticationInterfacesEventHandler implements IEventHandler<AppHealthUpdatedAuthenticationInterfacesEvent>
{
    handle(event: AppHealthUpdatedAuthenticationInterfacesEvent): void
    {
        // console.log('AppHealthUpdatedAuthenticationInterfacesEvent: ', event);
    }
}
