import { AppHealthFindApplicationApiByIdHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationApiByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationApiByIdHandler,
    ) {}

    @Query('appHealthFindApplicationApiById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
