import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApiInterfaceTypesEvent } from './app-health-updated-api-interface-types.event';

@EventsHandler(AppHealthUpdatedApiInterfaceTypesEvent)
export class AppHealthUpdatedApiInterfaceTypesEventHandler implements IEventHandler<AppHealthUpdatedApiInterfaceTypesEvent>
{
    handle(event: AppHealthUpdatedApiInterfaceTypesEvent): void
    {
        // console.log('AppHealthUpdatedApiInterfaceTypesEvent: ', event);
    }
}
