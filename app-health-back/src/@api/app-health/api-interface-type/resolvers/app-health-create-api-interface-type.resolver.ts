import { AppHealthCreateApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthCreateApiInterfaceTypeInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApiInterfaceTypeResolver
{
    constructor(
        private readonly handler: AppHealthCreateApiInterfaceTypeHandler,
    ) {}

    @Mutation('appHealthCreateApiInterfaceType')
    async main(
        @Args('payload') payload: AppHealthCreateApiInterfaceTypeInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
