import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';

@Injectable()
export class AppHealthRawSQLLanguagesService
{
    constructor(
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthLanguage[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
