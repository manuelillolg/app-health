import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthApplicationLanguage } from '../../domain/app-health-application-language.aggregate';
import { AppHealthApplicationLanguageId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationLanguageByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationLanguageRepository,
    ) {}

    async main(
        id: AppHealthApplicationLanguageId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
