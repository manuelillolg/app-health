import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteDatabaseByIdCommand } from './app-health-delete-database-by-id.command';
import { AppHealthDeleteDatabaseByIdService } from './app-health-delete-database-by-id.service';
import {
    AppHealthDatabaseId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteDatabaseByIdCommand)
export class AppHealthDeleteDatabaseByIdCommandHandler implements ICommandHandler<AppHealthDeleteDatabaseByIdCommand>
{
    constructor(
        private readonly deleteDatabaseByIdService: AppHealthDeleteDatabaseByIdService,
    ) {}

    async execute(command: AppHealthDeleteDatabaseByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteDatabaseByIdService.main(
            new AppHealthDatabaseId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
