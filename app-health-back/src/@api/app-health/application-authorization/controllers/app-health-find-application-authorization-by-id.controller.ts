/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthFindApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorization/find')
export class AppHealthFindApplicationAuthorizationByIdController
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthorizationByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-authorization by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthApplicationAuthorizationDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
