/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationViewsCommand } from './app-health-create-application-views.command';
import { AppHealthCreateApplicationViewsService } from './app-health-create-application-views.service';
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

@CommandHandler(AppHealthCreateApplicationViewsCommand)
export class AppHealthCreateApplicationViewsCommandHandler implements ICommandHandler<AppHealthCreateApplicationViewsCommand>
{
    constructor(
        private readonly createApplicationViewsService: AppHealthCreateApplicationViewsService,
    ) {}

    async execute(command: AppHealthCreateApplicationViewsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationViewsService.main(
            command.payload
                .map(applicationView =>
                {
                    return {
                        id: new AppHealthApplicationViewId(applicationView.id),
                        applicationId: new AppHealthApplicationViewApplicationId(applicationView.applicationId),
                        totalViews: new AppHealthApplicationViewTotalViews(applicationView.totalViews),
                        complexity: new AppHealthApplicationViewComplexity(applicationView.complexity),
                        description: new AppHealthApplicationViewDescription(applicationView.description),
                        score: new AppHealthApplicationViewScore(applicationView.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
