import { AppHealthCreateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationLanguagesHandler,
    ) {}

    @Mutation('appHealthCreateApplicationLanguages')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationLanguageInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
