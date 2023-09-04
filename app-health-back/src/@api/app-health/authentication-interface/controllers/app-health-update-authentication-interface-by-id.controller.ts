/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthUpdateAuthenticationInterfaceByIdDto, AppHealthUpdateAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interface/update')
export class AppHealthUpdateAuthenticationInterfaceByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateAuthenticationInterfaceByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update authentication-interface by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthAuthenticationInterfaceDto })
    async main(
        @Body() payload: AppHealthUpdateAuthenticationInterfaceByIdDto,
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
