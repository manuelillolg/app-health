import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthDeletedTechnicalSolutionsEvent } from './app-health-deleted-technical-solutions.event';

@EventsHandler(AppHealthDeletedTechnicalSolutionsEvent)
export class AppHealthDeletedTechnicalSolutionsEventHandler implements IEventHandler<AppHealthDeletedTechnicalSolutionsEvent>
{
    handle(event: AppHealthDeletedTechnicalSolutionsEvent): void
    {
        // console.log('DeletedTechnicalSolutionsEvent: ', event);
    }
}
