/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationIntegrationCommand } from './app-health-create-application-integration.command';
import { AppHealthCreateApplicationIntegrationService } from './app-health-create-application-integration.service';
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

@CommandHandler(AppHealthCreateApplicationIntegrationCommand)
export class AppHealthCreateApplicationIntegrationCommandHandler implements ICommandHandler<AppHealthCreateApplicationIntegrationCommand>
{
    constructor(
        private readonly createApplicationIntegrationService: AppHealthCreateApplicationIntegrationService,
    ) {}

    async execute(command: AppHealthCreateApplicationIntegrationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationIntegrationService.main(
            {
                id: new AppHealthApplicationIntegrationId(command.payload.id),
                name: new AppHealthApplicationIntegrationName(command.payload.name),
                description: new AppHealthApplicationIntegrationDescription(command.payload.description),
                sourceApplicationId: new AppHealthApplicationIntegrationSourceApplicationId(command.payload.sourceApplicationId),
                targetApplicationId: new AppHealthApplicationIntegrationTargetApplicationId(command.payload.targetApplicationId),
                apiInterfaceTypeId: new AppHealthApplicationIntegrationApiInterfaceTypeId(command.payload.apiInterfaceTypeId),
                interfaceNumbers: new AppHealthApplicationIntegrationInterfaceNumbers(command.payload.interfaceNumbers),
                modality: new AppHealthApplicationIntegrationModality(command.payload.modality),
                score: new AppHealthApplicationIntegrationScore(command.payload.score),
                documentations: new AppHealthApplicationIntegrationDocumentations(command.payload.documentations),
            },
            command.cQMetadata,
        );
    }
}
