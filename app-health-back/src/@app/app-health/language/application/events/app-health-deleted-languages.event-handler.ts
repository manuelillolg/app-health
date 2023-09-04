import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedLanguagesEvent } from './app-health-deleted-languages.event';

@EventsHandler(AppHealthDeletedLanguagesEvent)
export class AppHealthDeletedLanguagesEventHandler implements IEventHandler<AppHealthDeletedLanguagesEvent>
{
    handle(event: AppHealthDeletedLanguagesEvent): void
    {
        // console.log('DeletedLanguagesEvent: ', event);
    }
}
