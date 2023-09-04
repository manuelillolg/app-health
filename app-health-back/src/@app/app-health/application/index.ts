// export commands
export { AppHealthCreateApplicationCommand } from './application/create/app-health-create-application.command';
export { AppHealthCreateApplicationsCommand } from './application/create/app-health-create-applications.command';
export { AppHealthUpdateApplicationByIdCommand } from './application/update/app-health-update-application-by-id.command';
export { AppHealthUpdateApplicationsCommand } from './application/update/app-health-update-applications.command';
export { AppHealthUpsertApplicationCommand } from './application/upsert/app-health-upsert-application.command';
export { AppHealthDeleteApplicationByIdCommand } from './application/delete/app-health-delete-application-by-id.command';
export { AppHealthDeleteApplicationsCommand } from './application/delete/app-health-delete-applications.command';

// export queries
export { AppHealthPaginateApplicationsQuery } from './application/paginate/app-health-paginate-applications.query';
export { AppHealthGetApplicationsQuery } from './application/get/app-health-get-applications.query';
export { AppHealthFindApplicationQuery } from './application/find/app-health-find-application.query';
export { AppHealthFindApplicationByIdQuery } from './application/find/app-health-find-application-by-id.query';
export { AppHealthRawSQLApplicationsQuery } from './application/raw-sql/app-health-raw-sql-applications.query';

// export mocks
export { appHealthMockApplicationData } from './infrastructure/mock/app-health-mock-application.data';
export { AppHealthMockApplicationSeeder } from './infrastructure/mock/app-health-mock-application.seeder';
export { AppHealthMockApplicationRepository } from './infrastructure/mock/app-health-mock-application.repository';

// export events
export { AppHealthAddApplicationsContextEvent } from './application/events/app-health-add-applications-context.event';
export { AppHealthCreatedApplicationsEvent } from './application/events/app-health-created-applications.event';
export { AppHealthCreatedApplicationEvent } from './application/events/app-health-created-application.event';
export { AppHealthDeletedApplicationsEvent } from './application/events/app-health-deleted-applications.event';
export { AppHealthDeletedApplicationEvent } from './application/events/app-health-deleted-application.event';
export { AppHealthUpdatedApplicationsEvent } from './application/events/app-health-updated-applications.event';
export { AppHealthUpdatedApplicationEvent } from './application/events/app-health-updated-application.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AppHealthApplication } from './domain/app-health-application.aggregate';
export { AppHealthApplicationMapper } from './domain/app-health-application.mapper';
export { AppHealthIApplicationRepository } from './domain/app-health-application.repository';
export { AppHealthApplicationResponse } from './domain/app-health-application.response';

// infrastructure
export { AppHealthApplicationModel } from './infrastructure/sequelize/app-health-sequelize-application.model';
export { AppHealthSequelizeApplicationRepository } from './infrastructure/sequelize/app-health-sequelize-application.repository';

// sagas
export { AppHealthApplicationSagas } from './application/sagas/app-health-application.sagas';

// command handlers
import { AppHealthCreateApplicationCommandHandler } from './application/create/app-health-create-application.command-handler';
import { AppHealthCreateApplicationsCommandHandler } from './application/create/app-health-create-applications.command-handler';
import { AppHealthUpdateApplicationByIdCommandHandler } from './application/update/app-health-update-application-by-id.command-handler';
import { AppHealthUpdateApplicationsCommandHandler } from './application/update/app-health-update-applications.command-handler';
import { AppHealthUpsertApplicationCommandHandler } from './application/upsert/app-health-upsert-application.command-handler';
import { AppHealthDeleteApplicationByIdCommandHandler } from './application/delete/app-health-delete-application-by-id.command-handler';
import { AppHealthDeleteApplicationsCommandHandler } from './application/delete/app-health-delete-applications.command-handler';

// query handlers
import { AppHealthPaginateApplicationsQueryHandler } from './application/paginate/app-health-paginate-applications.query-handler';
import { AppHealthGetApplicationsQueryHandler } from './application/get/app-health-get-applications.query-handler';
import { AppHealthFindApplicationQueryHandler } from './application/find/app-health-find-application.query-handler';
import { AppHealthFindApplicationByIdQueryHandler } from './application/find/app-health-find-application-by-id.query-handler';
import { AppHealthRawSQLApplicationsQueryHandler } from './application/raw-sql/app-health-raw-sql-applications.query-handler';

// event handlers
import { AppHealthCreatedApplicationEventHandler } from './application/events/app-health-created-application.event-handler';
import { AppHealthCreatedApplicationsEventHandler } from './application/events/app-health-created-applications.event-handler';
import { AppHealthUpdatedApplicationEventHandler } from './application/events/app-health-updated-application.event-handler';
import { AppHealthUpdatedApplicationsEventHandler } from './application/events/app-health-updated-applications.event-handler';
import { AppHealthDeletedApplicationEventHandler } from './application/events/app-health-deleted-application.event-handler';
import { AppHealthDeletedApplicationsEventHandler } from './application/events/app-health-deleted-applications.event-handler';

// services
import { AppHealthCreateApplicationService } from './application/create/app-health-create-application.service';
import { AppHealthCreateApplicationsService } from './application/create/app-health-create-applications.service';
import { AppHealthPaginateApplicationsService } from './application/paginate/app-health-paginate-applications.service';
import { AppHealthGetApplicationsService } from './application/get/app-health-get-applications.service';
import { AppHealthFindApplicationService } from './application/find/app-health-find-application.service';
import { AppHealthFindApplicationByIdService } from './application/find/app-health-find-application-by-id.service';
import { AppHealthRawSQLApplicationsService } from './application/raw-sql/app-health-raw-sql-applications.service';
import { AppHealthUpdateApplicationByIdService } from './application/update/app-health-update-application-by-id.service';
import { AppHealthUpdateApplicationsService } from './application/update/app-health-update-applications.service';
import { AppHealthUpsertApplicationService } from './application/upsert/app-health-upsert-application.service';
import { AppHealthDeleteApplicationByIdService } from './application/delete/app-health-delete-application-by-id.service';
import { AppHealthDeleteApplicationsService } from './application/delete/app-health-delete-applications.service';

export const AppHealthApplicationHandlers = [
    // commands
    AppHealthCreateApplicationCommandHandler,
    AppHealthCreateApplicationsCommandHandler,
    AppHealthUpdateApplicationByIdCommandHandler,
    AppHealthUpdateApplicationsCommandHandler,
    AppHealthUpsertApplicationCommandHandler,
    AppHealthDeleteApplicationByIdCommandHandler,
    AppHealthDeleteApplicationsCommandHandler,

    // queries
    AppHealthPaginateApplicationsQueryHandler,
    AppHealthGetApplicationsQueryHandler,
    AppHealthFindApplicationQueryHandler,
    AppHealthFindApplicationByIdQueryHandler,
    AppHealthRawSQLApplicationsQueryHandler,

    // events
    AppHealthCreatedApplicationEventHandler,
    AppHealthCreatedApplicationsEventHandler,
    AppHealthUpdatedApplicationEventHandler,
    AppHealthUpdatedApplicationsEventHandler,
    AppHealthDeletedApplicationEventHandler,
    AppHealthDeletedApplicationsEventHandler,
];

export const AppHealthApplicationServices = [
    AppHealthCreateApplicationService,
    AppHealthCreateApplicationsService,
    AppHealthPaginateApplicationsService,
    AppHealthGetApplicationsService,
    AppHealthFindApplicationService,
    AppHealthFindApplicationByIdService,
    AppHealthRawSQLApplicationsService,
    AppHealthUpdateApplicationByIdService,
    AppHealthUpdateApplicationsService,
    AppHealthUpsertApplicationService,
    AppHealthDeleteApplicationByIdService,
    AppHealthDeleteApplicationsService,
];