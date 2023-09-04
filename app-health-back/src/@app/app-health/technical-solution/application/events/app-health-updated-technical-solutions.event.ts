import { AppHealthUpdatedTechnicalSolutionEvent } from './app-health-updated-technical-solution.event';

export class AppHealthUpdatedTechnicalSolutionsEvent
{
    constructor(
        public readonly technicalSolutions: AppHealthUpdatedTechnicalSolutionEvent[],
    ) {}
}
