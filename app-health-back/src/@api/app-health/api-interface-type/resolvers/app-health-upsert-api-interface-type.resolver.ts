import { AppHealthUpsertApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypeByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApiInterfaceTypeResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApiInterfaceTypeHandler,
    ) {}

    @Mutation('appHealthUpsertApiInterfaceType')
    async main(
        @Args('payload') payload: AppHealthUpdateApiInterfaceTypeByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
