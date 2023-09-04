import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthTechnicalSolutionId,
    AppHealthTechnicalSolutionCustomerId,
    AppHealthTechnicalSolutionName,
    AppHealthTechnicalSolutionDescription,
    AppHealthTechnicalSolutionArchitectureDiagram,
    AppHealthTechnicalSolutionProposal,
    AppHealthTechnicalSolutionCreatedAt,
    AppHealthTechnicalSolutionUpdatedAt,
    AppHealthTechnicalSolutionDeletedAt,
} from '../../domain/value-objects';
import { AppHealthITechnicalSolutionRepository } from '../../domain/app-health-technical-solution.repository';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';
import { AppHealthAddTechnicalSolutionsContextEvent } from '../events/app-health-add-technical-solutions-context.event';

@Injectable()
export class AppHealthUpdateTechnicalSolutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthTechnicalSolutionId;
            customerId?: AppHealthTechnicalSolutionCustomerId;
            name?: AppHealthTechnicalSolutionName;
            description?: AppHealthTechnicalSolutionDescription;
            architectureDiagram?: AppHealthTechnicalSolutionArchitectureDiagram;
            proposal?: AppHealthTechnicalSolutionProposal;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new AppHealthTechnicalSolutionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            technicalSolution,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const technicalSolutions = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const technicalSolutionsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddTechnicalSolutionsContextEvent(technicalSolutions),
        );

        technicalSolutionsRegister.updated(); // apply event to model events
        technicalSolutionsRegister.commit(); // commit all events of model
    }
}
