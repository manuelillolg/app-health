import { AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider';
import { AppHealthInfrastructureProviderId } from '@app/app-health/infrastructure-provider/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteInfrastructureProviderByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        id: AppHealthInfrastructureProviderId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const infrastructureProvider = await this.repository
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
                infrastructureProvider.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const infrastructureProviderRegister = this.publisher.mergeObjectContext(infrastructureProvider);

        infrastructureProviderRegister.deleted(infrastructureProvider); // apply event to model events
        infrastructureProviderRegister.commit(); // commit all events of model
    }
}
