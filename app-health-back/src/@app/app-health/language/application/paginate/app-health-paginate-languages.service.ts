import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';

@Injectable()
export class AppHealthPaginateLanguagesService
{
    constructor(
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthLanguage>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
