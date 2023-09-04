import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedApplicationLanguageEvent } from './app-health-updated-application-language.event';

@EventsHandler(AppHealthUpdatedApplicationLanguageEvent)
export class AppHealthUpdatedApplicationLanguageEventHandler implements IEventHandler<AppHealthUpdatedApplicationLanguageEvent>
{
    handle(event: AppHealthUpdatedApplicationLanguageEvent): void
    {
        // console.log('UpdatedApplicationLanguageEvent: ', event);
    }
}
