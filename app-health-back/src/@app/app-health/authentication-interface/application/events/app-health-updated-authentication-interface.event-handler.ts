import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedAuthenticationInterfaceEvent } from './app-health-updated-authentication-interface.event';

@EventsHandler(AppHealthUpdatedAuthenticationInterfaceEvent)
export class AppHealthUpdatedAuthenticationInterfaceEventHandler implements IEventHandler<AppHealthUpdatedAuthenticationInterfaceEvent>
{
    handle(event: AppHealthUpdatedAuthenticationInterfaceEvent): void
    {
        // console.log('UpdatedAuthenticationInterfaceEvent: ', event);
    }
}
