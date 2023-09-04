import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetApplicationViewsQueryHandler } from './app-health-get-application-views.query-handler';
import { AppHealthMockApplicationViewRepository } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.repository';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view/domain/app-health-application-view.mapper';
import { AppHealthGetApplicationViewsQuery } from './app-health-get-application-views.query';
import { AppHealthGetApplicationViewsService } from './app-health-get-application-views.service';

describe('GetApplicationViewsQueryHandler', () =>
{
    let queryHandler: AppHealthGetApplicationViewsQueryHandler;
    let service: AppHealthGetApplicationViewsService;
    let repository: AppHealthMockApplicationViewRepository;
    let mapper: AppHealthApplicationViewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetApplicationViewsQueryHandler,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useClass: AppHealthMockApplicationViewRepository,
                },
                {
                    provide : AppHealthGetApplicationViewsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetApplicationViewsQueryHandler>(AppHealthGetApplicationViewsQueryHandler);
        service = module.get<AppHealthGetApplicationViewsService>(AppHealthGetApplicationViewsService);
        repository = <AppHealthMockApplicationViewRepository>module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        mapper = new AppHealthApplicationViewMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationViewsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationViews founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetApplicationViewsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});