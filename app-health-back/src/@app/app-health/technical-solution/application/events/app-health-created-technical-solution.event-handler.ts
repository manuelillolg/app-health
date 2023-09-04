import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedTechnicalSolutionEvent } from './app-health-created-technical-solution.event';

@EventsHandler(AppHealthCreatedTechnicalSolutionEvent)
export class AppHealthCreatedTechnicalSolutionEventHandler implements IEventHandler<AppHealthCreatedTechnicalSolutionEvent>
{
    handle(event: AppHealthCreatedTechnicalSolutionEvent): void
    {
        // console.log('AppHealthCreatedTechnicalSolutionEvent: ', event);
    }
}
