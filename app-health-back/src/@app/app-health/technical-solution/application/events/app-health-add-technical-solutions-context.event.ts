import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';
import { AppHealthCreatedTechnicalSolutionEvent } from './app-health-created-technical-solution.event';
import { AppHealthCreatedTechnicalSolutionsEvent } from './app-health-created-technical-solutions.event';
import { AppHealthUpdatedTechnicalSolutionEvent } from './app-health-updated-technical-solution.event';
import { AppHealthUpdatedTechnicalSolutionsEvent } from './app-health-updated-technical-solutions.event';
import { AppHealthDeletedTechnicalSolutionEvent } from './app-health-deleted-technical-solution.event';
import { AppHealthDeletedTechnicalSolutionsEvent } from './app-health-deleted-technical-solutions.event';

export class AppHealthAddTechnicalSolutionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthTechnicalSolution[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedTechnicalSolutionsEvent(
                this.aggregateRoots.map(technicalSolution =>
                    new AppHealthCreatedTechnicalSolutionEvent(
                        technicalSolution.id.value,
                        technicalSolution.customerId.value,
                        technicalSolution.name.value,
                        technicalSolution.description?.value,
                        technicalSolution.architectureDiagram?.value,
                        technicalSolution.proposal?.value,
                        technicalSolution.createdAt?.value,
                        technicalSolution.updatedAt?.value,
                        technicalSolution.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedTechnicalSolutionsEvent(
                this.aggregateRoots.map(technicalSolution =>
                    new AppHealthUpdatedTechnicalSolutionEvent(
                        technicalSolution.id.value,
                        technicalSolution.customerId.value,
                        technicalSolution.name.value,
                        technicalSolution.description?.value,
                        technicalSolution.architectureDiagram?.value,
                        technicalSolution.proposal?.value,
                        technicalSolution.createdAt?.value,
                        technicalSolution.updatedAt?.value,
                        technicalSolution.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedTechnicalSolutionsEvent(
                this.aggregateRoots.map(technicalSolution =>
                    new AppHealthDeletedTechnicalSolutionEvent(
                        technicalSolution.id.value,
                        technicalSolution.customerId.value,
                        technicalSolution.name.value,
                        technicalSolution.description?.value,
                        technicalSolution.architectureDiagram?.value,
                        technicalSolution.proposal?.value,
                        technicalSolution.createdAt?.value,
                        technicalSolution.updatedAt?.value,
                        technicalSolution.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
