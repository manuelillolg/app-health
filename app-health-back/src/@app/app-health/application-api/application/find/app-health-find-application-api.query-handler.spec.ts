import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationApiQueryHandler } from './app-health-find-application-api.query-handler';
import { AppHealthMockApplicationApiRepository } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.repository';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api/domain/app-health-application-api.mapper';
import { AppHealthFindApplicationApiQuery } from './app-health-find-application-api.query';
import { AppHealthFindApplicationApiService } from './app-health-find-application-api.service';

describe('AppHealthFindApplicationApiQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationApiQueryHandler;
    let service: AppHealthFindApplicationApiService;
    let repository: AppHealthMockApplicationApiRepository;
    let mapper: AppHealthApplicationApiMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationApiQueryHandler,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useClass: AppHealthMockApplicationApiRepository,
                },
                {
                    provide : AppHealthFindApplicationApiService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationApiQueryHandler>(AppHealthFindApplicationApiQueryHandler);
        service = module.get<AppHealthFindApplicationApiService>(AppHealthFindApplicationApiService);
        repository = <AppHealthMockApplicationApiRepository>module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        mapper = new AppHealthApplicationApiMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationApiQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationApi founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationApiQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
