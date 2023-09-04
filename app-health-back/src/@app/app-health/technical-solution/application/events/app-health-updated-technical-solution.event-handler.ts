import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedTechnicalSolutionEvent } from './app-health-updated-technical-solution.event';

@EventsHandler(AppHealthUpdatedTechnicalSolutionEvent)
export class AppHealthUpdatedTechnicalSolutionEventHandler implements IEventHandler<AppHealthUpdatedTechnicalSolutionEvent>
{
    handle(event: AppHealthUpdatedTechnicalSolutionEvent): void
    {
        // console.log('UpdatedTechnicalSolutionEvent: ', event);
    }
}
