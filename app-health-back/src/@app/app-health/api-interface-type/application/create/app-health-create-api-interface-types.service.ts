import { AppHealthAddApiInterfaceTypesContextEvent, AppHealthApiInterfaceType, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import {
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeUpdatedAt,
} from '@app/app-health/api-interface-type/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApiInterfaceTypesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        apiInterfaceTypes: {
            id: AppHealthApiInterfaceTypeId;
            name: AppHealthApiInterfaceTypeName;
            score: AppHealthApiInterfaceTypeScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApiInterfaceTypes = apiInterfaceTypes.map(apiInterfaceType => AppHealthApiInterfaceType.register(
            apiInterfaceType.id,
            apiInterfaceType.name,
            apiInterfaceType.score,
            new AppHealthApiInterfaceTypeCreatedAt({ currentTimestamp: true }),
            new AppHealthApiInterfaceTypeUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApiInterfaceTypes,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApiInterfaceTypesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const apiInterfaceTypesRegistered = this.publisher.mergeObjectContext(new AppHealthAddApiInterfaceTypesContextEvent(aggregateApiInterfaceTypes));

        apiInterfaceTypesRegistered.created(); // apply event to model events
        apiInterfaceTypesRegistered.commit(); // commit all events of model
    }
}
