/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationIntegrationsCommand } from './app-health-create-application-integrations.command';
import { AppHealthCreateApplicationIntegrationsService } from './app-health-create-application-integrations.service';
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

@CommandHandler(AppHealthCreateApplicationIntegrationsCommand)
export class AppHealthCreateApplicationIntegrationsCommandHandler implements ICommandHandler<AppHealthCreateApplicationIntegrationsCommand>
{
    constructor(
        private readonly createApplicationIntegrationsService: AppHealthCreateApplicationIntegrationsService,
    ) {}

    async execute(command: AppHealthCreateApplicationIntegrationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationIntegrationsService.main(
            command.payload
                .map(applicationIntegration =>
                {
                    return {
                        id: new AppHealthApplicationIntegrationId(applicationIntegration.id),
                        name: new AppHealthApplicationIntegrationName(applicationIntegration.name),
                        description: new AppHealthApplicationIntegrationDescription(applicationIntegration.description),
                        sourceApplicationId: new AppHealthApplicationIntegrationSourceApplicationId(applicationIntegration.sourceApplicationId),
                        targetApplicationId: new AppHealthApplicationIntegrationTargetApplicationId(applicationIntegration.targetApplicationId),
                        apiInterfaceTypeId: new AppHealthApplicationIntegrationApiInterfaceTypeId(applicationIntegration.apiInterfaceTypeId),
                        interfaceNumbers: new AppHealthApplicationIntegrationInterfaceNumbers(applicationIntegration.interfaceNumbers),
                        modality: new AppHealthApplicationIntegrationModality(applicationIntegration.modality),
                        score: new AppHealthApplicationIntegrationScore(applicationIntegration.score),
                        documentations: new AppHealthApplicationIntegrationDocumentations(applicationIntegration.documentations),
                    };
                }),
            command.cQMetadata,
        );
    }
}
