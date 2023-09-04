import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationEvent } from './app-health-created-application.event';

@EventsHandler(AppHealthCreatedApplicationEvent)
export class AppHealthCreatedApplicationEventHandler implements IEventHandler<AppHealthCreatedApplicationEvent>
{
    handle(event: AppHealthCreatedApplicationEvent): void
    {
        // console.log('AppHealthCreatedApplicationEvent: ', event);
    }
}
