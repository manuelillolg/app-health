import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteDatabasesCommand } from './app-health-delete-databases.command';
import { AppHealthDeleteDatabasesService } from './app-health-delete-databases.service';

@CommandHandler(AppHealthDeleteDatabasesCommand)
export class AppHealthDeleteDatabasesCommandHandler implements ICommandHandler<AppHealthDeleteDatabasesCommand>
{
    constructor(
        private readonly deleteDatabasesService: AppHealthDeleteDatabasesService,
    ) {}

    async execute(command: AppHealthDeleteDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteDatabasesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
