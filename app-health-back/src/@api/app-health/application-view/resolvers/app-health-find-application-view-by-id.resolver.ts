import { AppHealthFindApplicationViewByIdHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationViewByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationViewByIdHandler,
    ) {}

    @Query('appHealthFindApplicationViewById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
