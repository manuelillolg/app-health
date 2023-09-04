import { AppHealthApplicationIntegration, AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
import {
    AppHealthApplicationIntegrationApiInterfaceTypeId,
    AppHealthApplicationIntegrationCreatedAt,
    AppHealthApplicationIntegrationDeletedAt,
    AppHealthApplicationIntegrationDescription,
    AppHealthApplicationIntegrationDocumentations,
    AppHealthApplicationIntegrationId,
    AppHealthApplicationIntegrationInterfaceNumbers,
    AppHealthApplicationIntegrationModality,
    AppHealthApplicationIntegrationName,
    AppHealthApplicationIntegrationScore,
    AppHealthApplicationIntegrationSourceApplicationId,
    AppHealthApplicationIntegrationTargetApplicationId,
    AppHealthApplicationIntegrationUpdatedAt,
} from '@app/app-health/application-integration/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationIntegrationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationIntegrationId;
            name: AppHealthApplicationIntegrationName;
            description: AppHealthApplicationIntegrationDescription;
            sourceApplicationId: AppHealthApplicationIntegrationSourceApplicationId;
            targetApplicationId: AppHealthApplicationIntegrationTargetApplicationId;
            apiInterfaceTypeId: AppHealthApplicationIntegrationApiInterfaceTypeId;
            interfaceNumbers: AppHealthApplicationIntegrationInterfaceNumbers;
            modality: AppHealthApplicationIntegrationModality;
            score: AppHealthApplicationIntegrationScore;
            documentations: AppHealthApplicationIntegrationDocumentations;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationIntegration = AppHealthApplicationIntegration.register(
            payload.id,
            payload.name,
            payload.description,
            payload.sourceApplicationId,
            payload.targetApplicationId,
            payload.apiInterfaceTypeId,
            payload.interfaceNumbers,
            payload.modality,
            payload.score,
            payload.documentations,
            new AppHealthApplicationIntegrationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationIntegrationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            applicationIntegration,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationIntegrationRegister = this.publisher.mergeObjectContext(
            applicationIntegration,
        );

        applicationIntegrationRegister.created(applicationIntegration); // apply event to model events
        applicationIntegrationRegister.commit(); // commit all events of model
    }
}
