import { AppHealthCreatedTechnicalSolutionEvent } from './app-health-created-technical-solution.event';

export class AppHealthCreatedTechnicalSolutionsEvent
{
    constructor(
        public readonly technicalSolutions: AppHealthCreatedTechnicalSolutionEvent[],
    ) {}
}
