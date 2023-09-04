import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationByIdCommand } from './app-health-delete-application-by-id.command';
import { AppHealthDeleteApplicationByIdService } from './app-health-delete-application-by-id.service';
import {
    AppHealthApplicationId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationByIdCommand)
export class AppHealthDeleteApplicationByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationByIdCommand>
{
    constructor(
        private readonly deleteApplicationByIdService: AppHealthDeleteApplicationByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationByIdService.main(
            new AppHealthApplicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
