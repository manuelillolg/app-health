import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';
import { AppHealthApplicationId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        id: AppHealthApplicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplication>
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
