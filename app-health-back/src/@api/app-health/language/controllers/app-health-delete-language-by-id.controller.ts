/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteLanguageByIdHandler, AppHealthLanguageDto } from '@api/app-health/language';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] language')
@Controller('app-health/language/delete')
export class AppHealthDeleteLanguageByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteLanguageByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete language by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthLanguageDto })
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
