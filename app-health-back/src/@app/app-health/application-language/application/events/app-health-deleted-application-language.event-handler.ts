import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedApplicationLanguageEvent } from './app-health-deleted-application-language.event';

@EventsHandler(AppHealthDeletedApplicationLanguageEvent)
export class AppHealthDeletedApplicationLanguageEventHandler implements IEventHandler<AppHealthDeletedApplicationLanguageEvent>
{
    handle(event: AppHealthDeletedApplicationLanguageEvent): void
    {
        // console.log('AppHealthDeletedApplicationLanguageEvent: ', event);
    }
}
