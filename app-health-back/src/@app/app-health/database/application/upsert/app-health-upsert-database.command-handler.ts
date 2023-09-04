/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertDatabaseCommand } from './app-health-upsert-database.command';
import { AppHealthUpsertDatabaseService } from './app-health-upsert-database.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertDatabaseCommand)
export class AppHealthUpsertDatabaseCommandHandler implements ICommandHandler<AppHealthUpsertDatabaseCommand>
{
    constructor(
        private readonly upsertDatabaseService: AppHealthUpsertDatabaseService,
    ) {}

    async execute(command: AppHealthUpsertDatabaseCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertDatabaseService.main(
            {
                id: new AppHealthDatabaseId(command.payload.id),
                name: new AppHealthDatabaseName(command.payload.name),
                type: new AppHealthDatabaseType(command.payload.type),
                versions: new AppHealthDatabaseVersions(command.payload.versions),
            },
            command.cQMetadata,
        );
    }
}
