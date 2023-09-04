/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationIntegrationByIdCommand } from './app-health-update-application-integration-by-id.command';
import { AppHealthUpdateApplicationIntegrationByIdService } from './app-health-update-application-integration-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationIntegrationByIdCommand)
export class AppHealthUpdateApplicationIntegrationByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationIntegrationByIdCommand>
{
    constructor(
        private readonly updateApplicationIntegrationByIdService: AppHealthUpdateApplicationIntegrationByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationIntegrationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationIntegrationByIdService.main(
            {
                id: new AppHealthApplicationIntegrationId(command.payload.id),
                name: new AppHealthApplicationIntegrationName(command.payload.name, { undefinable: true }),
                description: new AppHealthApplicationIntegrationDescription(command.payload.description),
                sourceApplicationId: new AppHealthApplicationIntegrationSourceApplicationId(command.payload.sourceApplicationId, { undefinable: true }),
                targetApplicationId: new AppHealthApplicationIntegrationTargetApplicationId(command.payload.targetApplicationId),
                apiInterfaceTypeId: new AppHealthApplicationIntegrationApiInterfaceTypeId(command.payload.apiInterfaceTypeId, { undefinable: true }),
                interfaceNumbers: new AppHealthApplicationIntegrationInterfaceNumbers(command.payload.interfaceNumbers),
                modality: new AppHealthApplicationIntegrationModality(command.payload.modality, { undefinable: true }),
                score: new AppHealthApplicationIntegrationScore(command.payload.score, { undefinable: true }),
                documentations: new AppHealthApplicationIntegrationDocumentations(command.payload.documentations),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
