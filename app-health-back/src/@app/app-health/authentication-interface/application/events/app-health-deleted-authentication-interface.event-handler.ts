import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedAuthenticationInterfaceEvent } from './app-health-deleted-authentication-interface.event';

@EventsHandler(AppHealthDeletedAuthenticationInterfaceEvent)
export class AppHealthDeletedAuthenticationInterfaceEventHandler implements IEventHandler<AppHealthDeletedAuthenticationInterfaceEvent>
{
    handle(event: AppHealthDeletedAuthenticationInterfaceEvent): void
    {
        // console.log('AppHealthDeletedAuthenticationInterfaceEvent: ', event);
    }
}
