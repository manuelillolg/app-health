import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedCustomerEvent } from './app-health-updated-customer.event';

@EventsHandler(AppHealthUpdatedCustomerEvent)
export class AppHealthUpdatedCustomerEventHandler implements IEventHandler<AppHealthUpdatedCustomerEvent>
{
    handle(event: AppHealthUpdatedCustomerEvent): void
    {
        // console.log('UpdatedCustomerEvent: ', event);
    }
}
