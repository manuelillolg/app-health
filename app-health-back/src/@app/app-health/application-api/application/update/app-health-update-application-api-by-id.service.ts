import { AppHealthApplicationApi, AppHealthIApplicationApiRepository } from '@app/app-health/application-api';
import {
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiDeletedAt,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiId,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiUpdatedAt,
} from '@app/app-health/application-api/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationApiByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationApiId;
            applicationId?: AppHealthApplicationApiApplicationId;
            apiInterfaceTypeId?: AppHealthApplicationApiApiInterfaceTypeId;
            score?: AppHealthApplicationApiScore;
            documentations?: AppHealthApplicationApiDocumentations;
            requestsPerDay?: AppHealthApplicationApiRequestsPerDay;
            applicationInfrastructureServiceId?: AppHealthApplicationApiApplicationInfrastructureServiceId;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationApi = AppHealthApplicationApi.register(
            payload.id,
            payload.applicationId,
            payload.apiInterfaceTypeId,
            payload.score,
            payload.documentations,
            payload.requestsPerDay,
            payload.applicationInfrastructureServiceId,
            null, // createdAt
            new AppHealthApplicationApiUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            applicationApi,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationApiRegister = this.publisher.mergeObjectContext(
            applicationApi,
        );

        applicationApiRegister.updated(applicationApi); // apply event to model events
        applicationApiRegister.commit(); // commit all events of model
    }
}
