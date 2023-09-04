import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthApplicationLanguage } from '../../domain/app-health-application-language.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationLanguagesService
{
    constructor(
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationLanguage[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
