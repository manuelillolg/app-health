import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedLanguagesEvent } from './app-health-created-languages.event';

@EventsHandler(AppHealthCreatedLanguagesEvent)
export class AppHealthCreatedLanguagesEventHandler implements IEventHandler<AppHealthCreatedLanguagesEvent>
{
    handle(event: AppHealthCreatedLanguagesEvent): void
    {
        // console.log('CreatedLanguagesEvent: ', event);
    }
}
