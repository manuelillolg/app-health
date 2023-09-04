/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationViewByIdCommand } from './app-health-update-application-view-by-id.command';
import { AppHealthUpdateApplicationViewByIdService } from './app-health-update-application-view-by-id.service';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateApplicationViewByIdCommand)
export class AppHealthUpdateApplicationViewByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationViewByIdCommand>
{
    constructor(
        private readonly updateApplicationViewByIdService: AppHealthUpdateApplicationViewByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationViewByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationViewByIdService.main(
            {
                id: new AppHealthApplicationViewId(command.payload.id),
                applicationId: new AppHealthApplicationViewApplicationId(command.payload.applicationId, { undefinable: true }),
                totalViews: new AppHealthApplicationViewTotalViews(command.payload.totalViews, { undefinable: true }),
                complexity: new AppHealthApplicationViewComplexity(command.payload.complexity, { undefinable: true }),
                description: new AppHealthApplicationViewDescription(command.payload.description),
                score: new AppHealthApplicationViewScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
