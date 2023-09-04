import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationApiId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiUpdatedAt,
    AppHealthApplicationApiDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';
import { AppHealthAddApplicationApisContextEvent } from '../events/app-health-add-application-apis-context.event';

@Injectable()
export class AppHealthUpdateApplicationApisService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationApiId;
            applicationId?: AppHealthApplicationApiApplicationId;
            apiInterfaceTypeId?: AppHealthApplicationApiApiInterfaceTypeId;
            score?: AppHealthApplicationApiScore;
            documentations?: AppHealthApplicationApiDocumentations;
            requestsPerDay?: AppHealthApplicationApiRequestsPerDay;
            applicationInfrastructureServiceId?: AppHealthApplicationApiApplicationInfrastructureServiceId;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            applicationApi,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationApis = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationApisRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationApisContextEvent(applicationApis),
        );

        applicationApisRegister.updated(); // apply event to model events
        applicationApisRegister.commit(); // commit all events of model
    }
}
