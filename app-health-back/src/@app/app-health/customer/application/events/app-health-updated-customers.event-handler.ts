import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedCustomersEvent } from './app-health-updated-customers.event';

@EventsHandler(AppHealthUpdatedCustomersEvent)
export class AppHealthUpdatedCustomersEventHandler implements IEventHandler<AppHealthUpdatedCustomersEvent>
{
    handle(event: AppHealthUpdatedCustomersEvent): void
    {
        // console.log('AppHealthUpdatedCustomersEvent: ', event);
    }
}
