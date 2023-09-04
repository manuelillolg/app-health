/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateDatabasesCommand } from './app-health-create-databases.command';
import { AppHealthCreateDatabasesService } from './app-health-create-databases.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateDatabasesCommand)
export class AppHealthCreateDatabasesCommandHandler implements ICommandHandler<AppHealthCreateDatabasesCommand>
{
    constructor(
        private readonly createDatabasesService: AppHealthCreateDatabasesService,
    ) {}

    async execute(command: AppHealthCreateDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDatabasesService.main(
            command.payload
                .map(database =>
                {
                    return {
                        id: new AppHealthDatabaseId(database.id),
                        name: new AppHealthDatabaseName(database.name),
                        type: new AppHealthDatabaseType(database.type),
                        versions: new AppHealthDatabaseVersions(database.versions),
                    };
                }),
            command.cQMetadata,
        );
    }
}
