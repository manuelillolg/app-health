import { AppHealthCreateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { AppHealthCreateApiInterfaceTypeInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApiInterfaceTypesResolver
{
    constructor(
        private readonly handler: AppHealthCreateApiInterfaceTypesHandler,
    ) {}

    @Mutation('appHealthCreateApiInterfaceTypes')
    async main(
        @Args('payload') payload: AppHealthCreateApiInterfaceTypeInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
