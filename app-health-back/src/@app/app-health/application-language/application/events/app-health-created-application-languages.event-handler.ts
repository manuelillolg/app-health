import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedApplicationLanguagesEvent } from './app-health-created-application-languages.event';

@EventsHandler(AppHealthCreatedApplicationLanguagesEvent)
export class AppHealthCreatedApplicationLanguagesEventHandler implements IEventHandler<AppHealthCreatedApplicationLanguagesEvent>
{
    handle(event: AppHealthCreatedApplicationLanguagesEvent): void
    {
        // console.log('CreatedApplicationLanguagesEvent: ', event);
    }
}
