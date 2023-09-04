import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution';
import { AppHealthTechnicalSolutionId } from '@app/app-health/technical-solution/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteTechnicalSolutionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthITechnicalSolutionRepository,
    ) {}

    async main(
        id: AppHealthTechnicalSolutionId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const technicalSolution = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                technicalSolution.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const technicalSolutionRegister = this.publisher.mergeObjectContext(technicalSolution);

        technicalSolutionRegister.deleted(technicalSolution); // apply event to model events
        technicalSolutionRegister.commit(); // commit all events of model
    }
}
