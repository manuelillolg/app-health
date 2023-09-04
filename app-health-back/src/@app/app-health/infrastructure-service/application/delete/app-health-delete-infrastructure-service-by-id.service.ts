import { AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service';
import { AppHealthInfrastructureServiceId } from '@app/app-health/infrastructure-service/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteInfrastructureServiceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        id: AppHealthInfrastructureServiceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const infrastructureService = await this.repository
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
                infrastructureService.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const infrastructureServiceRegister = this.publisher.mergeObjectContext(infrastructureService);

        infrastructureServiceRegister.deleted(infrastructureService); // apply event to model events
        infrastructureServiceRegister.commit(); // commit all events of model
    }
}
