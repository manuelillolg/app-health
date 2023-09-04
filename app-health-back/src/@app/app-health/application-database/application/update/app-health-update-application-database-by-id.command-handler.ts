/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationDatabaseByIdCommand } from './app-health-update-application-database-by-id.command';
import { AppHealthUpdateApplicationDatabaseByIdService } from './app-health-update-application-database-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationDatabaseByIdCommand)
export class AppHealthUpdateApplicationDatabaseByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationDatabaseByIdCommand>
{
    constructor(
        private readonly updateApplicationDatabaseByIdService: AppHealthUpdateApplicationDatabaseByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationDatabaseByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationDatabaseByIdService.main(
            {
                id: new AppHealthApplicationDatabaseId(command.payload.id),
                applicationId: new AppHealthApplicationDatabaseApplicationId(command.payload.applicationId, { undefinable: true }),
                databaseId: new AppHealthApplicationDatabaseDatabaseId(command.payload.databaseId, { undefinable: true }),
                version: new AppHealthApplicationDatabaseVersion(command.payload.version, { undefinable: true }),
                size: new AppHealthApplicationDatabaseSize(command.payload.size),
                score: new AppHealthApplicationDatabaseScore(command.payload.score, { undefinable: true }),
                totalCollectionsTables: new AppHealthApplicationDatabaseTotalCollectionsTables(command.payload.totalCollectionsTables),
                totalFields: new AppHealthApplicationDatabaseTotalFields(command.payload.totalFields),
                applicationInfrastructureServiceId: new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
