import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationApisEvent } from './app-health-updated-application-apis.event';

@EventsHandler(AppHealthUpdatedApplicationApisEvent)
export class AppHealthUpdatedApplicationApisEventHandler implements IEventHandler<AppHealthUpdatedApplicationApisEvent>
{
    handle(event: AppHealthUpdatedApplicationApisEvent): void
    {
        // console.log('AppHealthUpdatedApplicationApisEvent: ', event);
    }
}
