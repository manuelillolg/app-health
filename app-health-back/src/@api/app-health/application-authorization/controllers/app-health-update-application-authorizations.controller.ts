/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationsDto, AppHealthUpdateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorizations/update')
export class AppHealthUpdateApplicationAuthorizationsController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthorizationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-authorizations' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationAuthorizationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthorizationsDto,
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
