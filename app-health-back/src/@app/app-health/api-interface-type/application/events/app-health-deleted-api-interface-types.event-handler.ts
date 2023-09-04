import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApiInterfaceTypesEvent } from './app-health-deleted-api-interface-types.event';

@EventsHandler(AppHealthDeletedApiInterfaceTypesEvent)
export class AppHealthDeletedApiInterfaceTypesEventHandler implements IEventHandler<AppHealthDeletedApiInterfaceTypesEvent>
{
    handle(event: AppHealthDeletedApiInterfaceTypesEvent): void
    {
        // console.log('DeletedApiInterfaceTypesEvent: ', event);
    }
}
