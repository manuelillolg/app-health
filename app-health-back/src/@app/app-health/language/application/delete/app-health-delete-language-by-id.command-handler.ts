import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteLanguageByIdCommand } from './app-health-delete-language-by-id.command';
import { AppHealthDeleteLanguageByIdService } from './app-health-delete-language-by-id.service';
import {
    AppHealthLanguageId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteLanguageByIdCommand)
export class AppHealthDeleteLanguageByIdCommandHandler implements ICommandHandler<AppHealthDeleteLanguageByIdCommand>
{
    constructor(
        private readonly deleteLanguageByIdService: AppHealthDeleteLanguageByIdService,
    ) {}

    async execute(command: AppHealthDeleteLanguageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLanguageByIdService.main(
            new AppHealthLanguageId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
