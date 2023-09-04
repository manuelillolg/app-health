/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationDatabasesCommand } from './app-health-create-application-databases.command';
import { AppHealthCreateApplicationDatabasesService } from './app-health-create-application-databases.service';
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

@CommandHandler(AppHealthCreateApplicationDatabasesCommand)
export class AppHealthCreateApplicationDatabasesCommandHandler implements ICommandHandler<AppHealthCreateApplicationDatabasesCommand>
{
    constructor(
        private readonly createApplicationDatabasesService: AppHealthCreateApplicationDatabasesService,
    ) {}

    async execute(command: AppHealthCreateApplicationDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationDatabasesService.main(
            command.payload
                .map(applicationDatabase =>
                {
                    return {
                        id: new AppHealthApplicationDatabaseId(applicationDatabase.id),
                        applicationId: new AppHealthApplicationDatabaseApplicationId(applicationDatabase.applicationId),
                        databaseId: new AppHealthApplicationDatabaseDatabaseId(applicationDatabase.databaseId),
                        version: new AppHealthApplicationDatabaseVersion(applicationDatabase.version),
                        size: new AppHealthApplicationDatabaseSize(applicationDatabase.size),
                        score: new AppHealthApplicationDatabaseScore(applicationDatabase.score),
                        totalCollectionsTables: new AppHealthApplicationDatabaseTotalCollectionsTables(applicationDatabase.totalCollectionsTables),
                        totalFields: new AppHealthApplicationDatabaseTotalFields(applicationDatabase.totalFields),
                        applicationInfrastructureServiceId: new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(applicationDatabase.applicationInfrastructureServiceId),
                    };
                }),
            command.cQMetadata,
        );
    }
}
