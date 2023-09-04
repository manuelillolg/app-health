import { AppHealthDeletedTechnicalSolutionEvent } from './app-health-deleted-technical-solution.event';

export class AppHealthDeletedTechnicalSolutionsEvent
{
    constructor(
        public readonly technicalSolutions: AppHealthDeletedTechnicalSolutionEvent[],
    ) {}
}
