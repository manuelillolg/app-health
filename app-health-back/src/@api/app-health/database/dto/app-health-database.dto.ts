/* eslint-disable indent */
import { AppHealthDatabaseType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthDatabaseDto
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
    name: string;

    @ApiProperty({
        type       : AppHealthDatabaseType,
        enum       : ['RELATIONAL','NO_SQL','KEY_VALUE','GRAPH'],
        description: 'type [input here api field description]',
    })
    type: AppHealthDatabaseType;

    @ApiProperty({
        type       : Object,
        description: 'versions [input here api field description]',
    })
    versions: any;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}
