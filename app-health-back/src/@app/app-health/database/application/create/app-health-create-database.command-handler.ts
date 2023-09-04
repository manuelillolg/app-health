/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateDatabaseCommand } from './app-health-create-database.command';
import { AppHealthCreateDatabaseService } from './app-health-create-database.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateDatabaseCommand)
export class AppHealthCreateDatabaseCommandHandler implements ICommandHandler<AppHealthCreateDatabaseCommand>
{
    constructor(
        private readonly createDatabaseService: AppHealthCreateDatabaseService,
    ) {}

    async execute(command: AppHealthCreateDatabaseCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDatabaseService.main(
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
