import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedLanguageEvent } from './app-health-updated-language.event';

@EventsHandler(AppHealthUpdatedLanguageEvent)
export class AppHealthUpdatedLanguageEventHandler implements IEventHandler<AppHealthUpdatedLanguageEvent>
{
    handle(event: AppHealthUpdatedLanguageEvent): void
    {
        // console.log('UpdatedLanguageEvent: ', event);
    }
}
