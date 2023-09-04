import { AppHealthCreateApplicationApisHandler } from '@api/app-health/application-api';
import { AppHealthCreateApplicationApiInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationApisResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationApisHandler,
    ) {}

    @Mutation('appHealthCreateApplicationApis')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationApiInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
