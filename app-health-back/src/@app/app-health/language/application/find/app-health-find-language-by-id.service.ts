import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';
import { AppHealthLanguageId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindLanguageByIdService
{
    constructor(
        private readonly repository: AppHealthILanguageRepository,
    ) {}

    async main(
        id: AppHealthLanguageId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthLanguage>
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
