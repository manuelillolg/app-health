import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApiInterfaceTypeEvent } from './app-health-deleted-api-interface-type.event';

@EventsHandler(AppHealthDeletedApiInterfaceTypeEvent)
export class AppHealthDeletedApiInterfaceTypeEventHandler implements IEventHandler<AppHealthDeletedApiInterfaceTypeEvent>
{
    handle(event: AppHealthDeletedApiInterfaceTypeEvent): void
    {
        // console.log('AppHealthDeletedApiInterfaceTypeEvent: ', event);
    }
}
