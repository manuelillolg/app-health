/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationLanguagesCommand } from './app-health-update-application-languages.command';
import { AppHealthUpdateApplicationLanguagesService } from './app-health-update-application-languages.service';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateApplicationLanguagesCommand)
export class AppHealthUpdateApplicationLanguagesCommandHandler implements ICommandHandler<AppHealthUpdateApplicationLanguagesCommand>
{
    constructor(
        private readonly updateApplicationLanguagesService: AppHealthUpdateApplicationLanguagesService,
    ) {}

    async execute(command: AppHealthUpdateApplicationLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationLanguagesService.main(
            {
                id: new AppHealthApplicationLanguageId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationLanguageApplicationId(command.payload.applicationId, { undefinable: true }),
                languageId: new AppHealthApplicationLanguageLanguageId(command.payload.languageId, { undefinable: true }),
                version: new AppHealthApplicationLanguageVersion(command.payload.version, { undefinable: true }),
                score: new AppHealthApplicationLanguageScore(command.payload.score, { undefinable: true }),
                codeQualityScore: new AppHealthApplicationLanguageCodeQualityScore(command.payload.codeQualityScore, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
