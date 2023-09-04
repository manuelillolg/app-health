import { AppHealthDeleteApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApiInterfaceTypesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApiInterfaceTypesHandler,
    ) {}

    @Mutation('appHealthDeleteApiInterfaceTypes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
