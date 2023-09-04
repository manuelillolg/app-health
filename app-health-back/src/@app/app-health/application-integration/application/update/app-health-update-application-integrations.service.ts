import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationIntegrationId,
    AppHealthApplicationIntegrationName,
    AppHealthApplicationIntegrationDescription,
    AppHealthApplicationIntegrationSourceApplicationId,
    AppHealthApplicationIntegrationTargetApplicationId,
    AppHealthApplicationIntegrationApiInterfaceTypeId,
    AppHealthApplicationIntegrationInterfaceNumbers,
    AppHealthApplicationIntegrationModality,
    AppHealthApplicationIntegrationScore,
    AppHealthApplicationIntegrationDocumentations,
    AppHealthApplicationIntegrationCreatedAt,
    AppHealthApplicationIntegrationUpdatedAt,
    AppHealthApplicationIntegrationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';
import { AppHealthAddApplicationIntegrationsContextEvent } from '../events/app-health-add-application-integrations-context.event';

@Injectable()
export class AppHealthUpdateApplicationIntegrationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationIntegrationId;
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
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            applicationIntegration,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationIntegrations = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationIntegrationsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationIntegrationsContextEvent(applicationIntegrations),
        );

        applicationIntegrationsRegister.updated(); // apply event to model events
        applicationIntegrationsRegister.commit(); // commit all events of model
    }
}
