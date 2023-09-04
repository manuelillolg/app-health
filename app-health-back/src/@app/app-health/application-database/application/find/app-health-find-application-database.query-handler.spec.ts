import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationDatabaseQueryHandler } from './app-health-find-application-database.query-handler';
import { AppHealthMockApplicationDatabaseRepository } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.repository';
import { AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database/domain/app-health-application-database.repository';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database/domain/app-health-application-database.mapper';
import { AppHealthFindApplicationDatabaseQuery } from './app-health-find-application-database.query';
import { AppHealthFindApplicationDatabaseService } from './app-health-find-application-database.service';

describe('AppHealthFindApplicationDatabaseQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationDatabaseQueryHandler;
    let service: AppHealthFindApplicationDatabaseService;
    let repository: AppHealthMockApplicationDatabaseRepository;
    let mapper: AppHealthApplicationDatabaseMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationDatabaseQueryHandler,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useClass: AppHealthMockApplicationDatabaseRepository,
                },
                {
                    provide : AppHealthFindApplicationDatabaseService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationDatabaseQueryHandler>(AppHealthFindApplicationDatabaseQueryHandler);
        service = module.get<AppHealthFindApplicationDatabaseService>(AppHealthFindApplicationDatabaseService);
        repository = <AppHealthMockApplicationDatabaseRepository>module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        mapper = new AppHealthApplicationDatabaseMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationDatabaseQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationDatabase founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationDatabaseQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
