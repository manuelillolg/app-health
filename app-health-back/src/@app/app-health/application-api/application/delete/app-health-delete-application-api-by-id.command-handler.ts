import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationApiByIdCommand } from './app-health-delete-application-api-by-id.command';
import { AppHealthDeleteApplicationApiByIdService } from './app-health-delete-application-api-by-id.service';
import {
    AppHealthApplicationApiId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationApiByIdCommand)
export class AppHealthDeleteApplicationApiByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationApiByIdCommand>
{
    constructor(
        private readonly deleteApplicationApiByIdService: AppHealthDeleteApplicationApiByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationApiByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationApiByIdService.main(
            new AppHealthApplicationApiId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
