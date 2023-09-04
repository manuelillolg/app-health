import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedCustomersEvent } from './app-health-created-customers.event';

@EventsHandler(AppHealthCreatedCustomersEvent)
export class AppHealthCreatedCustomersEventHandler implements IEventHandler<AppHealthCreatedCustomersEvent>
{
    handle(event: AppHealthCreatedCustomersEvent): void
    {
        // console.log('CreatedCustomersEvent: ', event);
    }
}
