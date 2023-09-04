import { AppHealthApiInterfaceType, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import {
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeUpdatedAt,
} from '@app/app-health/api-interface-type/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApiInterfaceTypeByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApiInterfaceTypeId;
            name?: AppHealthApiInterfaceTypeName;
            score?: AppHealthApiInterfaceTypeScore;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const apiInterfaceType = AppHealthApiInterfaceType.register(
            payload.id,
            payload.name,
            payload.score,
            null, // createdAt
            new AppHealthApiInterfaceTypeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            apiInterfaceType,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const apiInterfaceTypeRegister = this.publisher.mergeObjectContext(
            apiInterfaceType,
        );

        apiInterfaceTypeRegister.updated(apiInterfaceType); // apply event to model events
        apiInterfaceTypeRegister.commit(); // commit all events of model
    }
}
