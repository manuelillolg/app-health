/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateLanguagesCommand } from './app-health-create-languages.command';
import { AppHealthCreateLanguagesService } from './app-health-create-languages.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateLanguagesCommand)
export class AppHealthCreateLanguagesCommandHandler implements ICommandHandler<AppHealthCreateLanguagesCommand>
{
    constructor(
        private readonly createLanguagesService: AppHealthCreateLanguagesService,
    ) {}

    async execute(command: AppHealthCreateLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLanguagesService.main(
            command.payload
                .map(language =>
                {
                    return {
                        id: new AppHealthLanguageId(language.id),
                        name: new AppHealthLanguageName(language.name),
                        versions: new AppHealthLanguageVersions(language.versions),
                    };
                }),
            command.cQMetadata,
        );
    }
}
