/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateLanguageCommand } from './app-health-create-language.command';
import { AppHealthCreateLanguageService } from './app-health-create-language.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateLanguageCommand)
export class AppHealthCreateLanguageCommandHandler implements ICommandHandler<AppHealthCreateLanguageCommand>
{
    constructor(
        private readonly createLanguageService: AppHealthCreateLanguageService,
    ) {}

    async execute(command: AppHealthCreateLanguageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLanguageService.main(
            {
                id: new AppHealthLanguageId(command.payload.id),
                name: new AppHealthLanguageName(command.payload.name),
                versions: new AppHealthLanguageVersions(command.payload.versions),
            },
            command.cQMetadata,
        );
    }
}
