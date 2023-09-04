import { AppHealthITechnicalSolutionRepository, AppHealthTechnicalSolution } from '@app/app-health/technical-solution';
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
export class AppHealthCreateTechnicalSolutionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthTechnicalSolutionId;
            customerId: AppHealthTechnicalSolutionCustomerId;
            name: AppHealthTechnicalSolutionName;
            description: AppHealthTechnicalSolutionDescription;
            architectureDiagram: AppHealthTechnicalSolutionArchitectureDiagram;
            proposal: AppHealthTechnicalSolutionProposal;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const technicalSolution = AppHealthTechnicalSolution.register(
            payload.id,
            payload.customerId,
            payload.name,
            payload.description,
            payload.architectureDiagram,
            payload.proposal,
            new AppHealthTechnicalSolutionCreatedAt({ currentTimestamp: true }),
            new AppHealthTechnicalSolutionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            technicalSolution,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const technicalSolutionRegister = this.publisher.mergeObjectContext(
            technicalSolution,
        );

        technicalSolutionRegister.created(technicalSolution); // apply event to model events
        technicalSolutionRegister.commit(); // commit all events of model
    }
}
