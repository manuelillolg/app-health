import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';
import { AppHealthApplicationViewId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationViewByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        id: AppHealthApplicationViewId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationView>
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
