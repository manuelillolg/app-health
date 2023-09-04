/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthUpdateApplicationAuthorizationByIdDto, AppHealthUpdateApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorization/update')
export class AppHealthUpdateApplicationAuthorizationByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthorizationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-authorization by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApplicationAuthorizationDto })
    async main(
        @Body() payload: AppHealthUpdateApplicationAuthorizationByIdDto,
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
