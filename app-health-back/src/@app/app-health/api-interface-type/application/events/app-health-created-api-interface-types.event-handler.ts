import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApiInterfaceTypesEvent } from './app-health-created-api-interface-types.event';

@EventsHandler(AppHealthCreatedApiInterfaceTypesEvent)
export class AppHealthCreatedApiInterfaceTypesEventHandler implements IEventHandler<AppHealthCreatedApiInterfaceTypesEvent>
{
    handle(event: AppHealthCreatedApiInterfaceTypesEvent): void
    {
        // console.log('CreatedApiInterfaceTypesEvent: ', event);
    }
}
