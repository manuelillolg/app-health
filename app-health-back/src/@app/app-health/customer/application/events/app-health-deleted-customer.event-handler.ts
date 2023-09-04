import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedCustomerEvent } from './app-health-deleted-customer.event';

@EventsHandler(AppHealthDeletedCustomerEvent)
export class AppHealthDeletedCustomerEventHandler implements IEventHandler<AppHealthDeletedCustomerEvent>
{
    handle(event: AppHealthDeletedCustomerEvent): void
    {
        // console.log('AppHealthDeletedCustomerEvent: ', event);
    }
}
