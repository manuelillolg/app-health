/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationLanguagesCommand } from './app-health-create-application-languages.command';
import { AppHealthCreateApplicationLanguagesService } from './app-health-create-application-languages.service';
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

@CommandHandler(AppHealthCreateApplicationLanguagesCommand)
export class AppHealthCreateApplicationLanguagesCommandHandler implements ICommandHandler<AppHealthCreateApplicationLanguagesCommand>
{
    constructor(
        private readonly createApplicationLanguagesService: AppHealthCreateApplicationLanguagesService,
    ) {}

    async execute(command: AppHealthCreateApplicationLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationLanguagesService.main(
            command.payload
                .map(applicationLanguage =>
                {
                    return {
                        id: new AppHealthApplicationLanguageId(applicationLanguage.id),
                        applicationId: new AppHealthApplicationLanguageApplicationId(applicationLanguage.applicationId),
                        languageId: new AppHealthApplicationLanguageLanguageId(applicationLanguage.languageId),
                        version: new AppHealthApplicationLanguageVersion(applicationLanguage.version),
                        score: new AppHealthApplicationLanguageScore(applicationLanguage.score),
                        codeQualityScore: new AppHealthApplicationLanguageCodeQualityScore(applicationLanguage.codeQualityScore),
                    };
                }),
            command.cQMetadata,
        );
    }
}
