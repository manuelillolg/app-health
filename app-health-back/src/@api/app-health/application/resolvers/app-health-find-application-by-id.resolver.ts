import { AppHealthFindApplicationByIdHandler } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationByIdHandler,
    ) {}

    @Query('appHealthFindApplicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
