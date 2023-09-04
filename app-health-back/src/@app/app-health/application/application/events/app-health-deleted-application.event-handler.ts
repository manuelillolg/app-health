import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationEvent } from './app-health-deleted-application.event';

@EventsHandler(AppHealthDeletedApplicationEvent)
export class AppHealthDeletedApplicationEventHandler implements IEventHandler<AppHealthDeletedApplicationEvent>
{
    handle(event: AppHealthDeletedApplicationEvent): void
    {
        // console.log('AppHealthDeletedApplicationEvent: ', event);
    }
}
