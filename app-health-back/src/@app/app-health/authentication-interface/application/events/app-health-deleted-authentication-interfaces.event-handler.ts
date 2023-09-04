import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedAuthenticationInterfacesEvent } from './app-health-deleted-authentication-interfaces.event';

@EventsHandler(AppHealthDeletedAuthenticationInterfacesEvent)
export class AppHealthDeletedAuthenticationInterfacesEventHandler implements IEventHandler<AppHealthDeletedAuthenticationInterfacesEvent>
{
    handle(event: AppHealthDeletedAuthenticationInterfacesEvent): void
    {
        // console.log('DeletedAuthenticationInterfacesEvent: ', event);
    }
}
