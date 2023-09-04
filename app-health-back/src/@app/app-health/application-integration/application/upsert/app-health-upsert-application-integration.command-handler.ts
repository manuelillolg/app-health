/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationIntegrationCommand } from './app-health-upsert-application-integration.command';
import { AppHealthUpsertApplicationIntegrationService } from './app-health-upsert-application-integration.service';
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

@CommandHandler(AppHealthUpsertApplicationIntegrationCommand)
export class AppHealthUpsertApplicationIntegrationCommandHandler implements ICommandHandler<AppHealthUpsertApplicationIntegrationCommand>
{
    constructor(
        private readonly upsertApplicationIntegrationService: AppHealthUpsertApplicationIntegrationService,
    ) {}

    async execute(command: AppHealthUpsertApplicationIntegrationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationIntegrationService.main(
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
