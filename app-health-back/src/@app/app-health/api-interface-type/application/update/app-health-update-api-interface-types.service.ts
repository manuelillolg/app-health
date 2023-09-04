import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';
import { AppHealthAddApiInterfaceTypesContextEvent } from '../events/app-health-add-api-interface-types-context.event';

@Injectable()
export class AppHealthUpdateApiInterfaceTypesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApiInterfaceTypeId;
            name?: AppHealthApiInterfaceTypeName;
            score?: AppHealthApiInterfaceTypeScore;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            apiInterfaceType,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const apiInterfaceTypes = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const apiInterfaceTypesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApiInterfaceTypesContextEvent(apiInterfaceTypes),
        );

        apiInterfaceTypesRegister.updated(); // apply event to model events
        apiInterfaceTypesRegister.commit(); // commit all events of model
    }
}
