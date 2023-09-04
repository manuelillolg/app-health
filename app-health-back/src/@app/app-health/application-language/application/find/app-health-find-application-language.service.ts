import { AppHealthApplicationLanguage, AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationLanguageService
{
    constructor(
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
