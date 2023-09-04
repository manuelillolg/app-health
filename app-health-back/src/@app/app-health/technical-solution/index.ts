// export commands
export { AppHealthCreateTechnicalSolutionCommand } from './application/create/app-health-create-technical-solution.command';
export { AppHealthCreateTechnicalSolutionsCommand } from './application/create/app-health-create-technical-solutions.command';
export { AppHealthUpdateTechnicalSolutionByIdCommand } from './application/update/app-health-update-technical-solution-by-id.command';
export { AppHealthUpdateTechnicalSolutionsCommand } from './application/update/app-health-update-technical-solutions.command';
export { AppHealthUpsertTechnicalSolutionCommand } from './application/upsert/app-health-upsert-technical-solution.command';
export { AppHealthDeleteTechnicalSolutionByIdCommand } from './application/delete/app-health-delete-technical-solution-by-id.command';
export { AppHealthDeleteTechnicalSolutionsCommand } from './application/delete/app-health-delete-technical-solutions.command';

// export queries
export { AppHealthPaginateTechnicalSolutionsQuery } from './application/paginate/app-health-paginate-technical-solutions.query';
export { AppHealthGetTechnicalSolutionsQuery } from './application/get/app-health-get-technical-solutions.query';
export { AppHealthFindTechnicalSolutionQuery } from './application/find/app-health-find-technical-solution.query';
export { AppHealthFindTechnicalSolutionByIdQuery } from './application/find/app-health-find-technical-solution-by-id.query';
export { AppHealthRawSQLTechnicalSolutionsQuery } from './application/raw-sql/app-health-raw-sql-technical-solutions.query';

// export mocks
export { appHealthMockTechnicalSolutionData } from './infrastructure/mock/app-health-mock-technical-solution.data';
export { AppHealthMockTechnicalSolutionSeeder } from './infrastructure/mock/app-health-mock-technical-solution.seeder';
export { AppHealthMockTechnicalSolutionRepository } from './infrastructure/mock/app-health-mock-technical-solution.repository';

// export events
export { AppHealthAddTechnicalSolutionsContextEvent } from './application/events/app-health-add-technical-solutions-context.event';
export { AppHealthCreatedTechnicalSolutionsEvent } from './application/events/app-health-created-technical-solutions.event';
export { AppHealthCreatedTechnicalSolutionEvent } from './application/events/app-health-created-technical-solution.event';
export { AppHealthDeletedTechnicalSolutionsEvent } from './application/events/app-health-deleted-technical-solutions.event';
export { AppHealthDeletedTechnicalSolutionEvent } from './application/events/app-health-deleted-technical-solution.event';
export { AppHealthUpdatedTechnicalSolutionsEvent } from './application/events/app-health-updated-technical-solutions.event';
export { AppHealthUpdatedTechnicalSolutionEvent } from './application/events/app-health-updated-technical-solution.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AppHealthTechnicalSolution } from './domain/app-health-technical-solution.aggregate';
export { AppHealthTechnicalSolutionMapper } from './domain/app-health-technical-solution.mapper';
export { AppHealthITechnicalSolutionRepository } from './domain/app-health-technical-solution.repository';
export { AppHealthTechnicalSolutionResponse } from './domain/app-health-technical-solution.response';

// infrastructure
export { AppHealthTechnicalSolutionModel } from './infrastructure/sequelize/app-health-sequelize-technical-solution.model';
export { AppHealthSequelizeTechnicalSolutionRepository } from './infrastructure/sequelize/app-health-sequelize-technical-solution.repository';

// sagas
export { AppHealthTechnicalSolutionSagas } from './application/sagas/app-health-technical-solution.sagas';

// command handlers
import { AppHealthCreateTechnicalSolutionCommandHandler } from './application/create/app-health-create-technical-solution.command-handler';
import { AppHealthCreateTechnicalSolutionsCommandHandler } from './application/create/app-health-create-technical-solutions.command-handler';
import { AppHealthUpdateTechnicalSolutionByIdCommandHandler } from './application/update/app-health-update-technical-solution-by-id.command-handler';
import { AppHealthUpdateTechnicalSolutionsCommandHandler } from './application/update/app-health-update-technical-solutions.command-handler';
import { AppHealthUpsertTechnicalSolutionCommandHandler } from './application/upsert/app-health-upsert-technical-solution.command-handler';
import { AppHealthDeleteTechnicalSolutionByIdCommandHandler } from './application/delete/app-health-delete-technical-solution-by-id.command-handler';
import { AppHealthDeleteTechnicalSolutionsCommandHandler } from './application/delete/app-health-delete-technical-solutions.command-handler';

// query handlers
import { AppHealthPaginateTechnicalSolutionsQueryHandler } from './application/paginate/app-health-paginate-technical-solutions.query-handler';
import { AppHealthGetTechnicalSolutionsQueryHandler } from './application/get/app-health-get-technical-solutions.query-handler';
import { AppHealthFindTechnicalSolutionQueryHandler } from './application/find/app-health-find-technical-solution.query-handler';
import { AppHealthFindTechnicalSolutionByIdQueryHandler } from './application/find/app-health-find-technical-solution-by-id.query-handler';
import { AppHealthRawSQLTechnicalSolutionsQueryHandler } from './application/raw-sql/app-health-raw-sql-technical-solutions.query-handler';

// event handlers
import { AppHealthCreatedTechnicalSolutionEventHandler } from './application/events/app-health-created-technical-solution.event-handler';
import { AppHealthCreatedTechnicalSolutionsEventHandler } from './application/events/app-health-created-technical-solutions.event-handler';
import { AppHealthUpdatedTechnicalSolutionEventHandler } from './application/events/app-health-updated-technical-solution.event-handler';
import { AppHealthUpdatedTechnicalSolutionsEventHandler } from './application/events/app-health-updated-technical-solutions.event-handler';
import { AppHealthDeletedTechnicalSolutionEventHandler } from './application/events/app-health-deleted-technical-solution.event-handler';
import { AppHealthDeletedTechnicalSolutionsEventHandler } from './application/events/app-health-deleted-technical-solutions.event-handler';

// services
import { AppHealthCreateTechnicalSolutionService } from './application/create/app-health-create-technical-solution.service';
import { AppHealthCreateTechnicalSolutionsService } from './application/create/app-health-create-technical-solutions.service';
import { AppHealthPaginateTechnicalSolutionsService } from './application/paginate/app-health-paginate-technical-solutions.service';
import { AppHealthGetTechnicalSolutionsService } from './application/get/app-health-get-technical-solutions.service';
import { AppHealthFindTechnicalSolutionService } from './application/find/app-health-find-technical-solution.service';
import { AppHealthFindTechnicalSolutionByIdService } from './application/find/app-health-find-technical-solution-by-id.service';
import { AppHealthRawSQLTechnicalSolutionsService } from './application/raw-sql/app-health-raw-sql-technical-solutions.service';
import { AppHealthUpdateTechnicalSolutionByIdService } from './application/update/app-health-update-technical-solution-by-id.service';
import { AppHealthUpdateTechnicalSolutionsService } from './application/update/app-health-update-technical-solutions.service';
import { AppHealthUpsertTechnicalSolutionService } from './application/upsert/app-health-upsert-technical-solution.service';
import { AppHealthDeleteTechnicalSolutionByIdService } from './application/delete/app-health-delete-technical-solution-by-id.service';
import { AppHealthDeleteTechnicalSolutionsService } from './application/delete/app-health-delete-technical-solutions.service';

export const AppHealthTechnicalSolutionHandlers = [
    // commands
    AppHealthCreateTechnicalSolutionCommandHandler,
    AppHealthCreateTechnicalSolutionsCommandHandler,
    AppHealthUpdateTechnicalSolutionByIdCommandHandler,
    AppHealthUpdateTechnicalSolutionsCommandHandler,
    AppHealthUpsertTechnicalSolutionCommandHandler,
    AppHealthDeleteTechnicalSolutionByIdCommandHandler,
    AppHealthDeleteTechnicalSolutionsCommandHandler,

    // queries
    AppHealthPaginateTechnicalSolutionsQueryHandler,
    AppHealthGetTechnicalSolutionsQueryHandler,
    AppHealthFindTechnicalSolutionQueryHandler,
    AppHealthFindTechnicalSolutionByIdQueryHandler,
    AppHealthRawSQLTechnicalSolutionsQueryHandler,

    // events
    AppHealthCreatedTechnicalSolutionEventHandler,
    AppHealthCreatedTechnicalSolutionsEventHandler,
    AppHealthUpdatedTechnicalSolutionEventHandler,
    AppHealthUpdatedTechnicalSolutionsEventHandler,
    AppHealthDeletedTechnicalSolutionEventHandler,
    AppHealthDeletedTechnicalSolutionsEventHandler,
];

export const AppHealthTechnicalSolutionServices = [
    AppHealthCreateTechnicalSolutionService,
    AppHealthCreateTechnicalSolutionsService,
    AppHealthPaginateTechnicalSolutionsService,
    AppHealthGetTechnicalSolutionsService,
    AppHealthFindTechnicalSolutionService,
    AppHealthFindTechnicalSolutionByIdService,
    AppHealthRawSQLTechnicalSolutionsService,
    AppHealthUpdateTechnicalSolutionByIdService,
    AppHealthUpdateTechnicalSolutionsService,
    AppHealthUpsertTechnicalSolutionService,
    AppHealthDeleteTechnicalSolutionByIdService,
    AppHealthDeleteTechnicalSolutionsService,
];