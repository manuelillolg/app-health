/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationsDto, AppHealthUpdateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentications/update')
export class AppHealthUpdateApplicationAuthenticationsController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthenticationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-authentications' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationAuthenticationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthenticationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
