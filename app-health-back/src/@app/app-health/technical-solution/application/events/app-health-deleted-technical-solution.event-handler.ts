import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedTechnicalSolutionEvent } from './app-health-deleted-technical-solution.event';

@EventsHandler(AppHealthDeletedTechnicalSolutionEvent)
export class AppHealthDeletedTechnicalSolutionEventHandler implements IEventHandler<AppHealthDeletedTechnicalSolutionEvent>
{
    handle(event: AppHealthDeletedTechnicalSolutionEvent): void
    {
        // console.log('AppHealthDeletedTechnicalSolutionEvent: ', event);
    }
}
