import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationLanguageByIdCommand } from './app-health-delete-application-language-by-id.command';
import { AppHealthDeleteApplicationLanguageByIdService } from './app-health-delete-application-language-by-id.service';
import {
    AppHealthApplicationLanguageId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationLanguageByIdCommand)
export class AppHealthDeleteApplicationLanguageByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationLanguageByIdCommand>
{
    constructor(
        private readonly deleteApplicationLanguageByIdService: AppHealthDeleteApplicationLanguageByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationLanguageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationLanguageByIdService.main(
            new AppHealthApplicationLanguageId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
