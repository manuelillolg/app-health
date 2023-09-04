import { AppHealthCreateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationAuthorizationsResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthorizationsHandler,
    ) {}

    @Mutation('appHealthCreateApplicationAuthorizations')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationAuthorizationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
