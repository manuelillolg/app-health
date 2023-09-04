import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationViewQueryHandler } from './app-health-find-application-view.query-handler';
import { AppHealthMockApplicationViewRepository } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.repository';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view/domain/app-health-application-view.mapper';
import { AppHealthFindApplicationViewQuery } from './app-health-find-application-view.query';
import { AppHealthFindApplicationViewService } from './app-health-find-application-view.service';

describe('AppHealthFindApplicationViewQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationViewQueryHandler;
    let service: AppHealthFindApplicationViewService;
    let repository: AppHealthMockApplicationViewRepository;
    let mapper: AppHealthApplicationViewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationViewQueryHandler,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useClass: AppHealthMockApplicationViewRepository,
                },
                {
                    provide : AppHealthFindApplicationViewService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationViewQueryHandler>(AppHealthFindApplicationViewQueryHandler);
        service = module.get<AppHealthFindApplicationViewService>(AppHealthFindApplicationViewService);
        repository = <AppHealthMockApplicationViewRepository>module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        mapper = new AppHealthApplicationViewMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationViewQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationView founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationViewQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
