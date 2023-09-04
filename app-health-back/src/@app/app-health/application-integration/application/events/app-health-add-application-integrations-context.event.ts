import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';
import { AppHealthCreatedApplicationIntegrationEvent } from './app-health-created-application-integration.event';
import { AppHealthCreatedApplicationIntegrationsEvent } from './app-health-created-application-integrations.event';
import { AppHealthUpdatedApplicationIntegrationEvent } from './app-health-updated-application-integration.event';
import { AppHealthUpdatedApplicationIntegrationsEvent } from './app-health-updated-application-integrations.event';
import { AppHealthDeletedApplicationIntegrationEvent } from './app-health-deleted-application-integration.event';
import { AppHealthDeletedApplicationIntegrationsEvent } from './app-health-deleted-application-integrations.event';

export class AppHealthAddApplicationIntegrationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationIntegration[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedApplicationIntegrationsEvent(
                this.aggregateRoots.map(applicationIntegration =>
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
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationIntegrationsEvent(
                this.aggregateRoots.map(applicationIntegration =>
                    new AppHealthUpdatedApplicationIntegrationEvent(
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
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationIntegrationsEvent(
                this.aggregateRoots.map(applicationIntegration =>
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
                ),
            ),
        );
    }
}
