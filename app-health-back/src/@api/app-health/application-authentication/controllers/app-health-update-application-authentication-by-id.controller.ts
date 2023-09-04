/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationByIdDto, AppHealthUpdateApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentication/update')
export class AppHealthUpdateApplicationAuthenticationByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthenticationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-authentication by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationAuthenticationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthenticationByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
