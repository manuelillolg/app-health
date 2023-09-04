import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedLanguagesEvent } from './app-health-updated-languages.event';

@EventsHandler(AppHealthUpdatedLanguagesEvent)
export class AppHealthUpdatedLanguagesEventHandler implements IEventHandler<AppHealthUpdatedLanguagesEvent>
{
    handle(event: AppHealthUpdatedLanguagesEvent): void
    {
        // console.log('AppHealthUpdatedLanguagesEvent: ', event);
    }
}
