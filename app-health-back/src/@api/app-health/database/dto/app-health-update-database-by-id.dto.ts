/* eslint-disable indent */
import { AppHealthDatabaseType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateDatabaseByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : AppHealthDatabaseType,
        enum       : ['RELATIONAL','NO_SQL','KEY_VALUE','GRAPH'],
        description: 'type [input here api field description]',
    })
    type?: AppHealthDatabaseType;

    @ApiProperty({
        type       : Object,
        description: 'versions [input here api field description]',
    })
    versions?: any;

}
