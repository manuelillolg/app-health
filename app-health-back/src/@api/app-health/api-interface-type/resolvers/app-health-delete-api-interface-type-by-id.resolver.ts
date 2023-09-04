import { AppHealthDeleteApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApiInterfaceTypeByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApiInterfaceTypeByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApiInterfaceTypeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
