import { AppHealthCreateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationAuthenticationsResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthenticationsHandler,
    ) {}

    @Mutation('appHealthCreateApplicationAuthentications')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationAuthenticationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
