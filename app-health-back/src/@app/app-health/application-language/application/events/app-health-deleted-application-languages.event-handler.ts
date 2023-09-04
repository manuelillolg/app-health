import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationLanguagesEvent } from './app-health-deleted-application-languages.event';

@EventsHandler(AppHealthDeletedApplicationLanguagesEvent)
export class AppHealthDeletedApplicationLanguagesEventHandler implements IEventHandler<AppHealthDeletedApplicationLanguagesEvent>
{
    handle(event: AppHealthDeletedApplicationLanguagesEvent): void
    {
        // console.log('DeletedApplicationLanguagesEvent: ', event);
    }
}
