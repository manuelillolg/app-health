/* eslint-disable indent */
import { AppHealthApplicationDto } from '@api/app-health/application';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthApplicationViewDto
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
    applicationId: string;

    @ApiProperty({
        type       : () => AppHealthApplicationDto,
        description: 'AppHealthApplication [input here api field description]',
    })
    application?: AppHealthApplicationDto;

    @ApiProperty({
        type       : Number,
        description: 'totalViews [input here api field description]',
    })
    totalViews: number;

    @ApiProperty({
        type       : String,
        description: 'complexity [input here api field description]',
    })
    complexity: string;

    @ApiProperty({
        type       : Number,
        description: 'description [input here api field description]',
    })
    description?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score: number;

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
