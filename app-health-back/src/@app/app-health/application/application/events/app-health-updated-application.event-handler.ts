import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationEvent } from './app-health-updated-application.event';

@EventsHandler(AppHealthUpdatedApplicationEvent)
export class AppHealthUpdatedApplicationEventHandler implements IEventHandler<AppHealthUpdatedApplicationEvent>
{
    handle(event: AppHealthUpdatedApplicationEvent): void
    {
        // console.log('UpdatedApplicationEvent: ', event);
    }
}
