import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationApisEvent } from './app-health-created-application-apis.event';

@EventsHandler(AppHealthCreatedApplicationApisEvent)
export class AppHealthCreatedApplicationApisEventHandler implements IEventHandler<AppHealthCreatedApplicationApisEvent>
{
    handle(event: AppHealthCreatedApplicationApisEvent): void
    {
        // console.log('CreatedApplicationApisEvent: ', event);
    }
}
