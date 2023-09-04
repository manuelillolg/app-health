import { AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureServiceId } from '@app/app-health/application-infrastructure-service/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationInfrastructureServiceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        id: AppHealthApplicationInfrastructureServiceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationInfrastructureService = await this.repository
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
                applicationInfrastructureService.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationInfrastructureServiceRegister = this.publisher.mergeObjectContext(applicationInfrastructureService);

        applicationInfrastructureServiceRegister.deleted(applicationInfrastructureService); // apply event to model events
        applicationInfrastructureServiceRegister.commit(); // commit all events of model
    }
}
