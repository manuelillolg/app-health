import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationLanguagesEvent } from './app-health-updated-application-languages.event';

@EventsHandler(AppHealthUpdatedApplicationLanguagesEvent)
export class AppHealthUpdatedApplicationLanguagesEventHandler implements IEventHandler<AppHealthUpdatedApplicationLanguagesEvent>
{
    handle(event: AppHealthUpdatedApplicationLanguagesEvent): void
    {
        // console.log('AppHealthUpdatedApplicationLanguagesEvent: ', event);
    }
}
