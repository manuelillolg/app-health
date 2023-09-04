import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationDatabaseByIdCommand } from './app-health-delete-application-database-by-id.command';
import { AppHealthDeleteApplicationDatabaseByIdService } from './app-health-delete-application-database-by-id.service';
import {
    AppHealthApplicationDatabaseId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationDatabaseByIdCommand)
export class AppHealthDeleteApplicationDatabaseByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationDatabaseByIdCommand>
{
    constructor(
        private readonly deleteApplicationDatabaseByIdService: AppHealthDeleteApplicationDatabaseByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationDatabaseByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationDatabaseByIdService.main(
            new AppHealthApplicationDatabaseId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
