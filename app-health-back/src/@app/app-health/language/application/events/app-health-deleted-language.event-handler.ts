import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedLanguageEvent } from './app-health-deleted-language.event';

@EventsHandler(AppHealthDeletedLanguageEvent)
export class AppHealthDeletedLanguageEventHandler implements IEventHandler<AppHealthDeletedLanguageEvent>
{
    handle(event: AppHealthDeletedLanguageEvent): void
    {
        // console.log('AppHealthDeletedLanguageEvent: ', event);
    }
}
