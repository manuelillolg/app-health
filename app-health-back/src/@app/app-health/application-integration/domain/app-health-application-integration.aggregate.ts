/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { AppHealthCreatedApplicationIntegrationEvent } from '../application/events/app-health-created-application-integration.event';
import { AppHealthUpdatedApplicationIntegrationEvent } from '../application/events/app-health-updated-application-integration.event';
import { AppHealthDeletedApplicationIntegrationEvent } from '../application/events/app-health-deleted-application-integration.event';
import { AppHealthApplication } from '@app/app-health/application';
import { AppHealthApiInterfaceType } from '@app/app-health/api-interface-type';

export class AppHealthApplicationIntegration extends AggregateRoot
{
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
    createdAt: AppHealthApplicationIntegrationCreatedAt;
    updatedAt: AppHealthApplicationIntegrationUpdatedAt;
    deletedAt: AppHealthApplicationIntegrationDeletedAt;

    // eager relationship
    sourceApplication: AppHealthApplication;
    targetApplication: AppHealthApplication;
    apiInterfaceType: AppHealthApiInterfaceType;

    constructor(
        id: AppHealthApplicationIntegrationId,
        name: AppHealthApplicationIntegrationName,
        description: AppHealthApplicationIntegrationDescription,
        sourceApplicationId: AppHealthApplicationIntegrationSourceApplicationId,
        targetApplicationId: AppHealthApplicationIntegrationTargetApplicationId,
        apiInterfaceTypeId: AppHealthApplicationIntegrationApiInterfaceTypeId,
        interfaceNumbers: AppHealthApplicationIntegrationInterfaceNumbers,
        modality: AppHealthApplicationIntegrationModality,
        score: AppHealthApplicationIntegrationScore,
        documentations: AppHealthApplicationIntegrationDocumentations,
        createdAt: AppHealthApplicationIntegrationCreatedAt,
        updatedAt: AppHealthApplicationIntegrationUpdatedAt,
        deletedAt: AppHealthApplicationIntegrationDeletedAt,

        sourceApplication?: AppHealthApplication,
        targetApplication?: AppHealthApplication,
        apiInterfaceType?: AppHealthApiInterfaceType,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.sourceApplicationId = sourceApplicationId;
        this.targetApplicationId = targetApplicationId;
        this.apiInterfaceTypeId = apiInterfaceTypeId;
        this.interfaceNumbers = interfaceNumbers;
        this.modality = modality;
        this.score = score;
        this.documentations = documentations;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.sourceApplication = sourceApplication;
        this.targetApplication = targetApplication;
        this.apiInterfaceType = apiInterfaceType;
    }

    static register (
        id: AppHealthApplicationIntegrationId,
        name: AppHealthApplicationIntegrationName,
        description: AppHealthApplicationIntegrationDescription,
        sourceApplicationId: AppHealthApplicationIntegrationSourceApplicationId,
        targetApplicationId: AppHealthApplicationIntegrationTargetApplicationId,
        apiInterfaceTypeId: AppHealthApplicationIntegrationApiInterfaceTypeId,
        interfaceNumbers: AppHealthApplicationIntegrationInterfaceNumbers,
        modality: AppHealthApplicationIntegrationModality,
        score: AppHealthApplicationIntegrationScore,
        documentations: AppHealthApplicationIntegrationDocumentations,
        createdAt: AppHealthApplicationIntegrationCreatedAt,
        updatedAt: AppHealthApplicationIntegrationUpdatedAt,
        deletedAt: AppHealthApplicationIntegrationDeletedAt,

        sourceApplication?: AppHealthApplication,
        targetApplication?: AppHealthApplication,
        apiInterfaceType?: AppHealthApiInterfaceType,
    ): AppHealthApplicationIntegration
    {
        return new AppHealthApplicationIntegration(
            id,
            name,
            description,
            sourceApplicationId,
            targetApplicationId,
            apiInterfaceTypeId,
            interfaceNumbers,
            modality,
            score,
            documentations,
            createdAt,
            updatedAt,
            deletedAt,

            sourceApplication,
            targetApplication,
            apiInterfaceType,
        );
    }

    created(applicationIntegration: AppHealthApplicationIntegration): void
    {
        this.apply(
            new AppHealthCreatedApplicationIntegrationEvent(
                applicationIntegration.id.value,
                applicationIntegration.name.value,
                applicationIntegration.description?.value,
                applicationIntegration.sourceApplicationId.value,
                applicationIntegration.targetApplicationId?.value,
                applicationIntegration.apiInterfaceTypeId.value,
                applicationIntegration.interfaceNumbers?.value,
                applicationIntegration.modality.value,
                applicationIntegration.score.value,
                applicationIntegration.documentations?.value,
                applicationIntegration.createdAt?.value,
                applicationIntegration.updatedAt?.value,
                applicationIntegration.deletedAt?.value,
            ),
        );
    }

    updated(applicationIntegration: AppHealthApplicationIntegration): void
    {
        this.apply(
            new AppHealthUpdatedApplicationIntegrationEvent(
                applicationIntegration.id?.value,
                applicationIntegration.name?.value,
                applicationIntegration.description?.value,
                applicationIntegration.sourceApplicationId?.value,
                applicationIntegration.targetApplicationId?.value,
                applicationIntegration.apiInterfaceTypeId?.value,
                applicationIntegration.interfaceNumbers?.value,
                applicationIntegration.modality?.value,
                applicationIntegration.score?.value,
                applicationIntegration.documentations?.value,
                applicationIntegration.createdAt?.value,
                applicationIntegration.updatedAt?.value,
                applicationIntegration.deletedAt?.value,
            ),
        );
    }

    deleted(applicationIntegration: AppHealthApplicationIntegration): void
    {
        this.apply(
            new AppHealthDeletedApplicationIntegrationEvent(
                applicationIntegration.id.value,
                applicationIntegration.name.value,
                applicationIntegration.description?.value,
                applicationIntegration.sourceApplicationId.value,
                applicationIntegration.targetApplicationId?.value,
                applicationIntegration.apiInterfaceTypeId.value,
                applicationIntegration.interfaceNumbers?.value,
                applicationIntegration.modality.value,
                applicationIntegration.score.value,
                applicationIntegration.documentations?.value,
                applicationIntegration.createdAt?.value,
                applicationIntegration.updatedAt?.value,
                applicationIntegration.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            description: this.description?.value,
            sourceApplicationId: this.sourceApplicationId.value,
            targetApplicationId: this.targetApplicationId?.value,
            apiInterfaceTypeId: this.apiInterfaceTypeId.value,
            interfaceNumbers: this.interfaceNumbers?.value,
            modality: this.modality.value,
            score: this.score.value,
            documentations: this.documentations?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            sourceApplication: this.sourceApplication?.toDTO(),
            targetApplication: this.targetApplication?.toDTO(),
            apiInterfaceType: this.apiInterfaceType?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            description: this.description?.value,
            sourceApplicationId: this.sourceApplicationId.value,
            targetApplicationId: this.targetApplicationId?.value,
            apiInterfaceTypeId: this.apiInterfaceTypeId.value,
            interfaceNumbers: this.interfaceNumbers?.value,
            modality: this.modality.value,
            score: this.score.value,
            documentations: this.documentations?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            sourceApplication: this.sourceApplication?.toDTO(),
            targetApplication: this.targetApplication?.toDTO(),
            apiInterfaceType: this.apiInterfaceType?.toDTO(),
        };
    }
}
