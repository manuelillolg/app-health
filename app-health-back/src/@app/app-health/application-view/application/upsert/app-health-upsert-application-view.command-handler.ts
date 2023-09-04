/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationViewCommand } from './app-health-upsert-application-view.command';
import { AppHealthUpsertApplicationViewService } from './app-health-upsert-application-view.service';
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

@CommandHandler(AppHealthUpsertApplicationViewCommand)
export class AppHealthUpsertApplicationViewCommandHandler implements ICommandHandler<AppHealthUpsertApplicationViewCommand>
{
    constructor(
        private readonly upsertApplicationViewService: AppHealthUpsertApplicationViewService,
    ) {}

    async execute(command: AppHealthUpsertApplicationViewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationViewService.main(
            {
                id: new AppHealthApplicationViewId(command.payload.id),
                applicationId: new AppHealthApplicationViewApplicationId(command.payload.applicationId),
                totalViews: new AppHealthApplicationViewTotalViews(command.payload.totalViews),
                complexity: new AppHealthApplicationViewComplexity(command.payload.complexity),
                description: new AppHealthApplicationViewDescription(command.payload.description),
                score: new AppHealthApplicationViewScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
