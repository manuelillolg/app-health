import { AppHealthFindApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApiInterfaceTypeResolver
{
    constructor(
        private readonly handler: AppHealthFindApiInterfaceTypeHandler,
    ) {}

    @Query('appHealthFindApiInterfaceType')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
