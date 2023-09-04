import { AppHealthAddApplicationApisContextEvent, AppHealthApplicationApi, AppHealthIApplicationApiRepository } from '@app/app-health/application-api';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationApisService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        applicationApis: {
            id: AppHealthApplicationApiId;
            applicationId: AppHealthApplicationApiApplicationId;
            apiInterfaceTypeId: AppHealthApplicationApiApiInterfaceTypeId;
            score: AppHealthApplicationApiScore;
            documentations: AppHealthApplicationApiDocumentations;
            requestsPerDay: AppHealthApplicationApiRequestsPerDay;
            applicationInfrastructureServiceId: AppHealthApplicationApiApplicationInfrastructureServiceId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationApis = applicationApis.map(applicationApi => AppHealthApplicationApi.register(
            applicationApi.id,
            applicationApi.applicationId,
            applicationApi.apiInterfaceTypeId,
            applicationApi.score,
            applicationApi.documentations,
            applicationApi.requestsPerDay,
            applicationApi.applicationInfrastructureServiceId,
            new AppHealthApplicationApiCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationApiUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationApis,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationApisContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationApisRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationApisContextEvent(aggregateApplicationApis));

        applicationApisRegistered.created(); // apply event to model events
        applicationApisRegistered.commit(); // commit all events of model
    }
}
