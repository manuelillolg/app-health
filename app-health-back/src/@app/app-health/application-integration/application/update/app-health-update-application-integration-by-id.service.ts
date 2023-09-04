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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationIntegrationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationIntegrationId;
            name?: AppHealthApplicationIntegrationName;
            description?: AppHealthApplicationIntegrationDescription;
            sourceApplicationId?: AppHealthApplicationIntegrationSourceApplicationId;
            targetApplicationId?: AppHealthApplicationIntegrationTargetApplicationId;
            apiInterfaceTypeId?: AppHealthApplicationIntegrationApiInterfaceTypeId;
            interfaceNumbers?: AppHealthApplicationIntegrationInterfaceNumbers;
            modality?: AppHealthApplicationIntegrationModality;
            score?: AppHealthApplicationIntegrationScore;
            documentations?: AppHealthApplicationIntegrationDocumentations;
        },
        constraint?: QueryStatement,
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
            null, // createdAt
            new AppHealthApplicationIntegrationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            applicationIntegration,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationIntegrationRegister = this.publisher.mergeObjectContext(
            applicationIntegration,
        );

        applicationIntegrationRegister.updated(applicationIntegration); // apply event to model events
        applicationIntegrationRegister.commit(); // commit all events of model
    }
}
