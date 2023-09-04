import { AppHealthAddTechnicalSolutionsContextEvent, AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteTechnicalSolutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const technicalSolutions = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (technicalSolutions.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddTechnicalSolutionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const technicalSolutionsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddTechnicalSolutionsContextEvent(technicalSolutions),
        );

        technicalSolutionsRegistered.deleted(); // apply event to model events
        technicalSolutionsRegistered.commit(); // commit all events of model
    }
}
