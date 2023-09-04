import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthUpdatedTechnicalSolutionsEvent } from './app-health-updated-technical-solutions.event';

@EventsHandler(AppHealthUpdatedTechnicalSolutionsEvent)
export class AppHealthUpdatedTechnicalSolutionsEventHandler implements IEventHandler<AppHealthUpdatedTechnicalSolutionsEvent>
{
    handle(event: AppHealthUpdatedTechnicalSolutionsEvent): void
    {
        // console.log('AppHealthUpdatedTechnicalSolutionsEvent: ', event);
    }
}
