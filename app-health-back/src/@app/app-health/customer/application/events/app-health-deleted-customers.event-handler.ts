import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedCustomersEvent } from './app-health-deleted-customers.event';

@EventsHandler(AppHealthDeletedCustomersEvent)
export class AppHealthDeletedCustomersEventHandler implements IEventHandler<AppHealthDeletedCustomersEvent>
{
    handle(event: AppHealthDeletedCustomersEvent): void
    {
        // console.log('DeletedCustomersEvent: ', event);
    }
}
