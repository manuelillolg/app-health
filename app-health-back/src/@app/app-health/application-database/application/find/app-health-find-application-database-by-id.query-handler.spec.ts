import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationDatabaseByIdQueryHandler } from './app-health-find-application-database-by-id.query-handler';
import { AppHealthMockApplicationDatabaseRepository } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.repository';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database/domain/app-health-application-database.mapper';
import { AppHealthFindApplicationDatabaseByIdQuery } from './app-health-find-application-database-by-id.query';
import { AppHealthFindApplicationDatabaseByIdService } from './app-health-find-application-database-by-id.service';

describe('AppHealthFindApplicationDatabaseByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationDatabaseByIdQueryHandler;
    let service: AppHealthFindApplicationDatabaseByIdService;
    let repository: AppHealthMockApplicationDatabaseRepository;
    let mapper: AppHealthApplicationDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationDatabaseByIdQueryHandler,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useClass: AppHealthMockApplicationDatabaseRepository,
                },
                {
                    provide : AppHealthFindApplicationDatabaseByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationDatabaseByIdQueryHandler>(AppHealthFindApplicationDatabaseByIdQueryHandler);
        service = module.get<AppHealthFindApplicationDatabaseByIdService>(AppHealthFindApplicationDatabaseByIdService);
        repository = <AppHealthMockApplicationDatabaseRepository>module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        mapper = new AppHealthApplicationDatabaseMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationDatabaseByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationDatabase founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationDatabaseByIdQuery(
                    appHealthMockApplicationDatabaseData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
