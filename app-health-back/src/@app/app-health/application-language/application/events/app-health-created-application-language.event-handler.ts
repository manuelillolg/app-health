import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationLanguageEvent } from './app-health-created-application-language.event';

@EventsHandler(AppHealthCreatedApplicationLanguageEvent)
export class AppHealthCreatedApplicationLanguageEventHandler implements IEventHandler<AppHealthCreatedApplicationLanguageEvent>
{
    handle(event: AppHealthCreatedApplicationLanguageEvent): void
    {
        // console.log('AppHealthCreatedApplicationLanguageEvent: ', event);
    }
}
