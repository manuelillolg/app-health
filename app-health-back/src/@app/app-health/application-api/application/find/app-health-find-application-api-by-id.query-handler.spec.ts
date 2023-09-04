import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationApiByIdQueryHandler } from './app-health-find-application-api-by-id.query-handler';
import { AppHealthMockApplicationApiRepository } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.repository';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api/domain/app-health-application-api.repository';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api/domain/app-health-application-api.mapper';
import { AppHealthFindApplicationApiByIdQuery } from './app-health-find-application-api-by-id.query';
import { AppHealthFindApplicationApiByIdService } from './app-health-find-application-api-by-id.service';

describe('AppHealthFindApplicationApiByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationApiByIdQueryHandler;
    let service: AppHealthFindApplicationApiByIdService;
    let repository: AppHealthMockApplicationApiRepository;
    let mapper: AppHealthApplicationApiMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationApiByIdQueryHandler,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useClass: AppHealthMockApplicationApiRepository,
                },
                {
                    provide : AppHealthFindApplicationApiByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationApiByIdQueryHandler>(AppHealthFindApplicationApiByIdQueryHandler);
        service = module.get<AppHealthFindApplicationApiByIdService>(AppHealthFindApplicationApiByIdService);
        repository = <AppHealthMockApplicationApiRepository>module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        mapper = new AppHealthApplicationApiMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationApiByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationApi founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationApiByIdQuery(
                    appHealthMockApplicationApiData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
