import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedCustomerEvent } from './app-health-created-customer.event';

@EventsHandler(AppHealthCreatedCustomerEvent)
export class AppHealthCreatedCustomerEventHandler implements IEventHandler<AppHealthCreatedCustomerEvent>
{
    handle(event: AppHealthCreatedCustomerEvent): void
    {
        // console.log('AppHealthCreatedCustomerEvent: ', event);
    }
}
