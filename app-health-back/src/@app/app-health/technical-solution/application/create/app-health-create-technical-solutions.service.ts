import { AppHealthAddTechnicalSolutionsContextEvent, AppHealthITechnicalSolutionRepository, AppHealthTechnicalSolution } from '@app/app-health/technical-solution';
import {
    AppHealthTechnicalSolutionArchitectureDiagram,
    AppHealthTechnicalSolutionCreatedAt,
    AppHealthTechnicalSolutionCustomerId,
    AppHealthTechnicalSolutionDeletedAt,
    AppHealthTechnicalSolutionDescription,
    AppHealthTechnicalSolutionId,
    AppHealthTechnicalSolutionName,
    AppHealthTechnicalSolutionProposal,
    AppHealthTechnicalSolutionUpdatedAt,
} from '@app/app-health/technical-solution/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateTechnicalSolutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        technicalSolutions: {
            id: AppHealthTechnicalSolutionId;
            customerId: AppHealthTechnicalSolutionCustomerId;
            name: AppHealthTechnicalSolutionName;
            description: AppHealthTechnicalSolutionDescription;
            architectureDiagram: AppHealthTechnicalSolutionArchitectureDiagram;
            proposal: AppHealthTechnicalSolutionProposal;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateTechnicalSolutions = technicalSolutions.map(technicalSolution => AppHealthTechnicalSolution.register(
            technicalSolution.id,
            technicalSolution.customerId,
            technicalSolution.name,
            technicalSolution.description,
            technicalSolution.architectureDiagram,
            technicalSolution.proposal,
            new AppHealthTechnicalSolutionCreatedAt({ currentTimestamp: true }),
            new AppHealthTechnicalSolutionUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateTechnicalSolutions,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddTechnicalSolutionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const technicalSolutionsRegistered = this.publisher.mergeObjectContext(new AppHealthAddTechnicalSolutionsContextEvent(aggregateTechnicalSolutions));

        technicalSolutionsRegistered.created(); // apply event to model events
        technicalSolutionsRegistered.commit(); // commit all events of model
    }
}
