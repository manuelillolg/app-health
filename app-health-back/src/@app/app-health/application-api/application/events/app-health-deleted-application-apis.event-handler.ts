import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationApisEvent } from './app-health-deleted-application-apis.event';

@EventsHandler(AppHealthDeletedApplicationApisEvent)
export class AppHealthDeletedApplicationApisEventHandler implements IEventHandler<AppHealthDeletedApplicationApisEvent>
{
    handle(event: AppHealthDeletedApplicationApisEvent): void
    {
        // console.log('DeletedApplicationApisEvent: ', event);
    }
}
