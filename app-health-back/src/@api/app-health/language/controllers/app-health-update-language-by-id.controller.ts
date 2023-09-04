/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthLanguageDto, AppHealthUpdateLanguageByIdDto, AppHealthUpdateLanguageByIdHandler } from '@api/app-health/language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/language/update')
export class AppHealthUpdateLanguageByIdController
{
    constructor(
        private readonly handler: AppHealthUpdateLanguageByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update language by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthLanguageDto })
    async main(
        @Body() payload: AppHealthUpdateLanguageByIdDto,
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
