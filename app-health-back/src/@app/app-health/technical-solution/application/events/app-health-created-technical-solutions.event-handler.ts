import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppHealthCreatedTechnicalSolutionsEvent } from './app-health-created-technical-solutions.event';

@EventsHandler(AppHealthCreatedTechnicalSolutionsEvent)
export class AppHealthCreatedTechnicalSolutionsEventHandler implements IEventHandler<AppHealthCreatedTechnicalSolutionsEvent>
{
    handle(event: AppHealthCreatedTechnicalSolutionsEvent): void
    {
        // console.log('CreatedTechnicalSolutionsEvent: ', event);
    }
}
