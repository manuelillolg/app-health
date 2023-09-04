import { AppHealthPaginateApplicationApisHandler } from '@api/app-health/application-api';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationApisResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationApisHandler,
    ) {}

    @Query('appHealthPaginateApplicationApis')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
