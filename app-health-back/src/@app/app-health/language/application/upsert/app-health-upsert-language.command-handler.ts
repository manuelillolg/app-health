/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertLanguageCommand } from './app-health-upsert-language.command';
import { AppHealthUpsertLanguageService } from './app-health-upsert-language.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertLanguageCommand)
export class AppHealthUpsertLanguageCommandHandler implements ICommandHandler<AppHealthUpsertLanguageCommand>
{
    constructor(
        private readonly upsertLanguageService: AppHealthUpsertLanguageService,
    ) {}

    async execute(command: AppHealthUpsertLanguageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertLanguageService.main(
            {
                id: new AppHealthLanguageId(command.payload.id),
                name: new AppHealthLanguageName(command.payload.name),
                versions: new AppHealthLanguageVersions(command.payload.versions),
            },
            command.cQMetadata,
        );
    }
}
