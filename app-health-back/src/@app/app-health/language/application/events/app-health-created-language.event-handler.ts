import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedLanguageEvent } from './app-health-created-language.event';

@EventsHandler(AppHealthCreatedLanguageEvent)
export class AppHealthCreatedLanguageEventHandler implements IEventHandler<AppHealthCreatedLanguageEvent>
{
    handle(event: AppHealthCreatedLanguageEvent): void
    {
        // console.log('AppHealthCreatedLanguageEvent: ', event);
    }
}
