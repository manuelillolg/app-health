/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateDatabaseByIdCommand } from './app-health-update-database-by-id.command';
import { AppHealthUpdateDatabaseByIdService } from './app-health-update-database-by-id.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateDatabaseByIdCommand)
export class AppHealthUpdateDatabaseByIdCommandHandler implements ICommandHandler<AppHealthUpdateDatabaseByIdCommand>
{
    constructor(
        private readonly updateDatabaseByIdService: AppHealthUpdateDatabaseByIdService,
    ) {}

    async execute(command: AppHealthUpdateDatabaseByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateDatabaseByIdService.main(
            {
                id: new AppHealthDatabaseId(command.payload.id),
                name: new AppHealthDatabaseName(command.payload.name, { undefinable: true }),
                type: new AppHealthDatabaseType(command.payload.type, { undefinable: true }),
                versions: new AppHealthDatabaseVersions(command.payload.versions, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
