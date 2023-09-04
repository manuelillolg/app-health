import { AppHealthApiInterfaceType, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
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
export class AppHealthCreateApiInterfaceTypeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApiInterfaceTypeId;
            name: AppHealthApiInterfaceTypeName;
            score: AppHealthApiInterfaceTypeScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const apiInterfaceType = AppHealthApiInterfaceType.register(
            payload.id,
            payload.name,
            payload.score,
            new AppHealthApiInterfaceTypeCreatedAt({ currentTimestamp: true }),
            new AppHealthApiInterfaceTypeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            apiInterfaceType,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const apiInterfaceTypeRegister = this.publisher.mergeObjectContext(
            apiInterfaceType,
        );

        apiInterfaceTypeRegister.created(apiInterfaceType); // apply event to model events
        apiInterfaceTypeRegister.commit(); // commit all events of model
    }
}
