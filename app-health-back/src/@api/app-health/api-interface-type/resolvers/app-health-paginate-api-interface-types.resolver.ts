import { AppHealthPaginateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApiInterfaceTypesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApiInterfaceTypesHandler,
    ) {}

    @Query('appHealthPaginateApiInterfaceTypes')
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
