import { AppHealthAddApplicationIntegrationsContextEvent, AppHealthApplicationIntegration, AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
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
export class AppHealthCreateApplicationIntegrationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        applicationIntegrations: {
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationIntegrations = applicationIntegrations.map(applicationIntegration => AppHealthApplicationIntegration.register(
            applicationIntegration.id,
            applicationIntegration.name,
            applicationIntegration.description,
            applicationIntegration.sourceApplicationId,
            applicationIntegration.targetApplicationId,
            applicationIntegration.apiInterfaceTypeId,
            applicationIntegration.interfaceNumbers,
            applicationIntegration.modality,
            applicationIntegration.score,
            applicationIntegration.documentations,
            new AppHealthApplicationIntegrationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationIntegrationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationIntegrations,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationIntegrationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationIntegrationsRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationIntegrationsContextEvent(aggregateApplicationIntegrations));

        applicationIntegrationsRegistered.created(); // apply event to model events
        applicationIntegrationsRegistered.commit(); // commit all events of model
    }
}
