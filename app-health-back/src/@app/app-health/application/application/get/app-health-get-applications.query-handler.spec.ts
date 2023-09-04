import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationsQueryHandler } from './app-health-get-applications.query-handler';
import { AppHealthMockApplicationRepository } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.repository';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import { AppHealthApplicationMapper } from '@app/app-health/application/domain/app-health-application.mapper';
import { AppHealthGetApplicationsQuery } from './app-health-get-applications.query';
import { AppHealthGetApplicationsService } from './app-health-get-applications.service';

describe('GetApplicationsQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationsQueryHandler;
    let service: AppHealthGetApplicationsService;
    let repository: AppHealthMockApplicationRepository;
    let mapper: AppHealthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationsQueryHandler,
                {
                    provide : AppHealthIApplicationRepository,
                    useClass: AppHealthMockApplicationRepository,
                },
                {
                    provide : AppHealthGetApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationsQueryHandler>(AppHealthGetApplicationsQueryHandler);
        service = module.get<AppHealthGetApplicationsService>(AppHealthGetApplicationsService);
        repository = <AppHealthMockApplicationRepository>module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        mapper = new AppHealthApplicationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});