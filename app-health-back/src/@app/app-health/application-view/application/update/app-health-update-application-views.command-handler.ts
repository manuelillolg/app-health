/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationViewsCommand } from './app-health-update-application-views.command';
import { AppHealthUpdateApplicationViewsService } from './app-health-update-application-views.service';
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

@CommandHandler(AppHealthUpdateApplicationViewsCommand)
export class AppHealthUpdateApplicationViewsCommandHandler implements ICommandHandler<AppHealthUpdateApplicationViewsCommand>
{
    constructor(
        private readonly updateApplicationViewsService: AppHealthUpdateApplicationViewsService,
    ) {}

    async execute(command: AppHealthUpdateApplicationViewsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationViewsService.main(
            {
                id: new AppHealthApplicationViewId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationViewApplicationId(command.payload.applicationId, { undefinable: true }),
                totalViews: new AppHealthApplicationViewTotalViews(command.payload.totalViews, { undefinable: true }),
                complexity: new AppHealthApplicationViewComplexity(command.payload.complexity, { undefinable: true }),
                description: new AppHealthApplicationViewDescription(command.payload.description),
                score: new AppHealthApplicationViewScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
