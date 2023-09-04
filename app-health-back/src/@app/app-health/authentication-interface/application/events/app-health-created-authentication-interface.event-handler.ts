import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedAuthenticationInterfaceEvent } from './app-health-created-authentication-interface.event';

@EventsHandler(AppHealthCreatedAuthenticationInterfaceEvent)
export class AppHealthCreatedAuthenticationInterfaceEventHandler implements IEventHandler<AppHealthCreatedAuthenticationInterfaceEvent>
{
    handle(event: AppHealthCreatedAuthenticationInterfaceEvent): void
    {
        // console.log('AppHealthCreatedAuthenticationInterfaceEvent: ', event);
    }
}
