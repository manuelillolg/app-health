import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';
import { AppHealthApplicationApiId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationApiByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        id: AppHealthApplicationApiId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationApi>
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
