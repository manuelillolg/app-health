/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateDatabasesCommand } from './app-health-update-databases.command';
import { AppHealthUpdateDatabasesService } from './app-health-update-databases.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateDatabasesCommand)
export class AppHealthUpdateDatabasesCommandHandler implements ICommandHandler<AppHealthUpdateDatabasesCommand>
{
    constructor(
        private readonly updateDatabasesService: AppHealthUpdateDatabasesService,
    ) {}

    async execute(command: AppHealthUpdateDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateDatabasesService.main(
            {
                id: new AppHealthDatabaseId(command.payload.id, { undefinable: true }),
                name: new AppHealthDatabaseName(command.payload.name, { undefinable: true }),
                type: new AppHealthDatabaseType(command.payload.type, { undefinable: true }),
                versions: new AppHealthDatabaseVersions(command.payload.versions, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
