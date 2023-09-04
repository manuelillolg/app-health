/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationViewByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
        example    : '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId?: string;

    @ApiProperty({
        type       : Number,
        description: 'totalViews [input here api field description]',
    })
    totalViews?: number;

    @ApiProperty({
        type       : String,
        description: 'complexity [input here api field description]',
    })
    complexity?: string;

    @ApiProperty({
        type       : Number,
        description: 'description [input here api field description]',
    })
    description?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score?: number;

}
