/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypeByIdDto, AppHealthUpdateApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/update')
export class AppHealthUpdateApiInterfaceTypeByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateApiInterfaceTypeByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update api-interface-type by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthApiInterfaceTypeDto })
    async main(
        @Body() payload: AppHealthUpdateApiInterfaceTypeByIdDto,
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
