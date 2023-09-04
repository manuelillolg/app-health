/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationDatabasesCommand } from './app-health-update-application-databases.command';
import { AppHealthUpdateApplicationDatabasesService } from './app-health-update-application-databases.service';
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

@CommandHandler(AppHealthUpdateApplicationDatabasesCommand)
export class AppHealthUpdateApplicationDatabasesCommandHandler implements ICommandHandler<AppHealthUpdateApplicationDatabasesCommand>
{
    constructor(
        private readonly updateApplicationDatabasesService: AppHealthUpdateApplicationDatabasesService,
    ) {}

    async execute(command: AppHealthUpdateApplicationDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationDatabasesService.main(
            {
                id: new AppHealthApplicationDatabaseId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationDatabaseApplicationId(command.payload.applicationId, { undefinable: true }),
                databaseId: new AppHealthApplicationDatabaseDatabaseId(command.payload.databaseId, { undefinable: true }),
                version: new AppHealthApplicationDatabaseVersion(command.payload.version, { undefinable: true }),
                size: new AppHealthApplicationDatabaseSize(command.payload.size),
                score: new AppHealthApplicationDatabaseScore(command.payload.score, { undefinable: true }),
                totalCollectionsTables: new AppHealthApplicationDatabaseTotalCollectionsTables(command.payload.totalCollectionsTables),
                totalFields: new AppHealthApplicationDatabaseTotalFields(command.payload.totalFields),
                applicationInfrastructureServiceId: new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
