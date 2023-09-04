import { AppHealthUpdateApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApiInterfaceTypeByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApiInterfaceTypeByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApiInterfaceTypeById')
    async main(
        @Args('payload') payload: AppHealthUpdateApiInterfaceTypeByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
