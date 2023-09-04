import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationViewByIdQueryHandler } from './app-health-find-application-view-by-id.query-handler';
import { AppHealthMockApplicationViewRepository } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.repository';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view/domain/app-health-application-view.mapper';
import { AppHealthFindApplicationViewByIdQuery } from './app-health-find-application-view-by-id.query';
import { AppHealthFindApplicationViewByIdService } from './app-health-find-application-view-by-id.service';

describe('AppHealthFindApplicationViewByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationViewByIdQueryHandler;
    let service: AppHealthFindApplicationViewByIdService;
    let repository: AppHealthMockApplicationViewRepository;
    let mapper: AppHealthApplicationViewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationViewByIdQueryHandler,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useClass: AppHealthMockApplicationViewRepository,
                },
                {
                    provide : AppHealthFindApplicationViewByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationViewByIdQueryHandler>(AppHealthFindApplicationViewByIdQueryHandler);
        service = module.get<AppHealthFindApplicationViewByIdService>(AppHealthFindApplicationViewByIdService);
        repository = <AppHealthMockApplicationViewRepository>module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        mapper = new AppHealthApplicationViewMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationViewByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationView founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationViewByIdQuery(
                    appHealthMockApplicationViewData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
