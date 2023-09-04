import { AppHealthUpdateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApiInterfaceTypesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApiInterfaceTypesHandler,
    ) {}

    @Mutation('appHealthUpdateApiInterfaceTypes')
    async main(
        @Args('payload') payload: AppHealthUpdateApiInterfaceTypesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
