import { AppHealthUpdateApplicationByIdHandler } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
