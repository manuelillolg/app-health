import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationDatabasesCommand } from './app-health-delete-application-databases.command';
import { AppHealthDeleteApplicationDatabasesService } from './app-health-delete-application-databases.service';

@CommandHandler(AppHealthDeleteApplicationDatabasesCommand)
export class AppHealthDeleteApplicationDatabasesCommandHandler implements ICommandHandler<AppHealthDeleteApplicationDatabasesCommand>
{
    constructor(
        private readonly deleteApplicationDatabasesService: AppHealthDeleteApplicationDatabasesService,
    ) {}

    async execute(command: AppHealthDeleteApplicationDatabasesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationDatabasesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
