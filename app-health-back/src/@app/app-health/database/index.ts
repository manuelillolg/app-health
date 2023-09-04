// export commands
export { AppHealthCreateDatabaseCommand } from './application/create/app-health-create-database.command';
export { AppHealthCreateDatabasesCommand } from './application/create/app-health-create-databases.command';
export { AppHealthUpdateDatabaseByIdCommand } from './application/update/app-health-update-database-by-id.command';
export { AppHealthUpdateDatabasesCommand } from './application/update/app-health-update-databases.command';
export { AppHealthUpsertDatabaseCommand } from './application/upsert/app-health-upsert-database.command';
export { AppHealthDeleteDatabaseByIdCommand } from './application/delete/app-health-delete-database-by-id.command';
export { AppHealthDeleteDatabasesCommand } from './application/delete/app-health-delete-databases.command';

// export queries
export { AppHealthPaginateDatabasesQuery } from './application/paginate/app-health-paginate-databases.query';
export { AppHealthGetDatabasesQuery } from './application/get/app-health-get-databases.query';
export { AppHealthFindDatabaseQuery } from './application/find/app-health-find-database.query';
export { AppHealthFindDatabaseByIdQuery } from './application/find/app-health-find-database-by-id.query';
export { AppHealthRawSQLDatabasesQuery } from './application/raw-sql/app-health-raw-sql-databases.query';

// export mocks
export { appHealthMockDatabaseData } from './infrastructure/mock/app-health-mock-database.data';
export { AppHealthMockDatabaseSeeder } from './infrastructure/mock/app-health-mock-database.seeder';
export { AppHealthMockDatabaseRepository } from './infrastructure/mock/app-health-mock-database.repository';

// export events
export { AppHealthAddDatabasesContextEvent } from './application/events/app-health-add-databases-context.event';
export { AppHealthCreatedDatabasesEvent } from './application/events/app-health-created-databases.event';
export { AppHealthCreatedDatabaseEvent } from './application/events/app-health-created-database.event';
export { AppHealthDeletedDatabasesEvent } from './application/events/app-health-deleted-databases.event';
export { AppHealthDeletedDatabaseEvent } from './application/events/app-health-deleted-database.event';
export { AppHealthUpdatedDatabasesEvent } from './application/events/app-health-updated-databases.event';
export { AppHealthUpdatedDatabaseEvent } from './application/events/app-health-updated-database.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AppHealthDatabase } from './domain/app-health-database.aggregate';
export { AppHealthDatabaseMapper } from './domain/app-health-database.mapper';
export { AppHealthIDatabaseRepository } from './domain/app-health-database.repository';
export { AppHealthDatabaseResponse } from './domain/app-health-database.response';

// infrastructure
export { AppHealthDatabaseModel } from './infrastructure/sequelize/app-health-sequelize-database.model';
export { AppHealthSequelizeDatabaseRepository } from './infrastructure/sequelize/app-health-sequelize-database.repository';

// sagas
export { AppHealthDatabaseSagas } from './application/sagas/app-health-database.sagas';

// command handlers
import { AppHealthCreateDatabaseCommandHandler } from './application/create/app-health-create-database.command-handler';
import { AppHealthCreateDatabasesCommandHandler } from './application/create/app-health-create-databases.command-handler';
import { AppHealthUpdateDatabaseByIdCommandHandler } from './application/update/app-health-update-database-by-id.command-handler';
import { AppHealthUpdateDatabasesCommandHandler } from './application/update/app-health-update-databases.command-handler';
import { AppHealthUpsertDatabaseCommandHandler } from './application/upsert/app-health-upsert-database.command-handler';
import { AppHealthDeleteDatabaseByIdCommandHandler } from './application/delete/app-health-delete-database-by-id.command-handler';
import { AppHealthDeleteDatabasesCommandHandler } from './application/delete/app-health-delete-databases.command-handler';

// query handlers
import { AppHealthPaginateDatabasesQueryHandler } from './application/paginate/app-health-paginate-databases.query-handler';
import { AppHealthGetDatabasesQueryHandler } from './application/get/app-health-get-databases.query-handler';
import { AppHealthFindDatabaseQueryHandler } from './application/find/app-health-find-database.query-handler';
import { AppHealthFindDatabaseByIdQueryHandler } from './application/find/app-health-find-database-by-id.query-handler';
import { AppHealthRawSQLDatabasesQueryHandler } from './application/raw-sql/app-health-raw-sql-databases.query-handler';

// event handlers
import { AppHealthCreatedDatabaseEventHandler } from './application/events/app-health-created-database.event-handler';
import { AppHealthCreatedDatabasesEventHandler } from './application/events/app-health-created-databases.event-handler';
import { AppHealthUpdatedDatabaseEventHandler } from './application/events/app-health-updated-database.event-handler';
import { AppHealthUpdatedDatabasesEventHandler } from './application/events/app-health-updated-databases.event-handler';
import { AppHealthDeletedDatabaseEventHandler } from './application/events/app-health-deleted-database.event-handler';
import { AppHealthDeletedDatabasesEventHandler } from './application/events/app-health-deleted-databases.event-handler';

// services
import { AppHealthCreateDatabaseService } from './application/create/app-health-create-database.service';
import { AppHealthCreateDatabasesService } from './application/create/app-health-create-databases.service';
import { AppHealthPaginateDatabasesService } from './application/paginate/app-health-paginate-databases.service';
import { AppHealthGetDatabasesService } from './application/get/app-health-get-databases.service';
import { AppHealthFindDatabaseService } from './application/find/app-health-find-database.service';
import { AppHealthFindDatabaseByIdService } from './application/find/app-health-find-database-by-id.service';
import { AppHealthRawSQLDatabasesService } from './application/raw-sql/app-health-raw-sql-databases.service';
import { AppHealthUpdateDatabaseByIdService } from './application/update/app-health-update-database-by-id.service';
import { AppHealthUpdateDatabasesService } from './application/update/app-health-update-databases.service';
import { AppHealthUpsertDatabaseService } from './application/upsert/app-health-upsert-database.service';
import { AppHealthDeleteDatabaseByIdService } from './application/delete/app-health-delete-database-by-id.service';
import { AppHealthDeleteDatabasesService } from './application/delete/app-health-delete-databases.service';

export const AppHealthDatabaseHandlers = [
    // commands
    AppHealthCreateDatabaseCommandHandler,
    AppHealthCreateDatabasesCommandHandler,
    AppHealthUpdateDatabaseByIdCommandHandler,
    AppHealthUpdateDatabasesCommandHandler,
    AppHealthUpsertDatabaseCommandHandler,
    AppHealthDeleteDatabaseByIdCommandHandler,
    AppHealthDeleteDatabasesCommandHandler,

    // queries
    AppHealthPaginateDatabasesQueryHandler,
    AppHealthGetDatabasesQueryHandler,
    AppHealthFindDatabaseQueryHandler,
    AppHealthFindDatabaseByIdQueryHandler,
    AppHealthRawSQLDatabasesQueryHandler,

    // events
    AppHealthCreatedDatabaseEventHandler,
    AppHealthCreatedDatabasesEventHandler,
    AppHealthUpdatedDatabaseEventHandler,
    AppHealthUpdatedDatabasesEventHandler,
    AppHealthDeletedDatabaseEventHandler,
    AppHealthDeletedDatabasesEventHandler,
];

export const AppHealthDatabaseServices = [
    AppHealthCreateDatabaseService,
    AppHealthCreateDatabasesService,
    AppHealthPaginateDatabasesService,
    AppHealthGetDatabasesService,
    AppHealthFindDatabaseService,
    AppHealthFindDatabaseByIdService,
    AppHealthRawSQLDatabasesService,
    AppHealthUpdateDatabaseByIdService,
    AppHealthUpdateDatabasesService,
    AppHealthUpsertDatabaseService,
    AppHealthDeleteDatabaseByIdService,
    AppHealthDeleteDatabasesService,
];