/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationDatabaseCommand } from './app-health-create-application-database.command';
import { AppHealthCreateApplicationDatabaseService } from './app-health-create-application-database.service';
import {
    AppHealthApplicationDatabaseId,
    AppHealthApplicationDatabaseApplicationId,
    AppHealthApplicationDatabaseDatabaseId,
    AppHealthApplicationDatabaseVersion,
    AppHealthApplicationDatabaseSize,
    AppHealthApplicationDatabaseScore,
    AppHealthApplicationDatabaseTotalCollectionsTables,
    AppHealthApplicationDatabaseTotalFields,
    AppHealthApplicationDatabaseApplicationInfrastructureServiceId,
    AppHealthApplicationDatabaseCreatedAt,
    AppHealthApplicationDatabaseUpdatedAt,
    AppHealthApplicationDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationDatabaseCommand)
export class AppHealthCreateApplicationDatabaseCommandHandler implements ICommandHandler<AppHealthCreateApplicationDatabaseCommand>
{
    constructor(
        private readonly createApplicationDatabaseService: AppHealthCreateApplicationDatabaseService,
    ) {}

    async execute(command: AppHealthCreateApplicationDatabaseCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationDatabaseService.main(
            {
                id: new AppHealthApplicationDatabaseId(command.payload.id),
                applicationId: new AppHealthApplicationDatabaseApplicationId(command.payload.applicationId),
                databaseId: new AppHealthApplicationDatabaseDatabaseId(command.payload.databaseId),
                version: new AppHealthApplicationDatabaseVersion(command.payload.version),
                size: new AppHealthApplicationDatabaseSize(command.payload.size),
                score: new AppHealthApplicationDatabaseScore(command.payload.score),
                totalCollectionsTables: new AppHealthApplicationDatabaseTotalCollectionsTables(command.payload.totalCollectionsTables),
                totalFields: new AppHealthApplicationDatabaseTotalFields(command.payload.totalFields),
                applicationInfrastructureServiceId: new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId),
            },
            command.cQMetadata,
        );
    }
}
