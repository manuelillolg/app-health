import { AppHealthCreateLanguagesHandler } from '@api/app-health/language';
import { AppHealthCreateLanguageInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthCreateLanguagesHandler,
    ) {}

    @Mutation('appHealthCreateLanguages')
    async main(
        @Args('payload') payload: AppHealthCreateLanguageInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
