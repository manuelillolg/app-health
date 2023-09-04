import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';

@Injectable()
export class AppHealthGetLanguagesService
{
    constructor(
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthLanguage[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
