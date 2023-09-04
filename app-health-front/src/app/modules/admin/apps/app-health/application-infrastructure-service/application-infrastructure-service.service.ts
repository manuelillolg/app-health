import { AppHealthApplication, AppHealthApplicationInfrastructureService, AppHealthCreateApplicationInfrastructureService, AppHealthInfrastructureService, AppHealthUpdateApplicationInfrastructureServiceById, AppHealthUpdateApplicationInfrastuctureServices } from '../app-health.types';
import { ApplicationService } from '../application/application.service';
import { InfrastructureServiceService } from '../infrastructure-service/infrastructure-service.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application-infrastructure-service.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationInfrastructureServiceService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplicationInfrastructureService> | null> = new BehaviorSubject(null);
    applicationInfrastructureServiceSubject$: BehaviorSubject<AppHealthApplicationInfrastructureService | null> = new BehaviorSubject(null);
    applicationInfrastuctureServicesSubject$: BehaviorSubject<AppHealthApplicationInfrastructureService[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly applicationService: ApplicationService,
        private readonly infrastructureServiceService: InfrastructureServiceService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplicationInfrastructureService>>
    {
        return this.paginationSubject$.asObservable();
    }

    get applicationInfrastructureService$(): Observable<AppHealthApplicationInfrastructureService>
    {
        return this.applicationInfrastructureServiceSubject$.asObservable();
    }

    get applicationInfrastuctureServices$(): Observable<AppHealthApplicationInfrastructureService[]>
    {
        return this.applicationInfrastuctureServicesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<AppHealthApplicationInfrastructureService>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplicationInfrastructureService>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationInfrastructureService;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationInfrastructureService;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationInfrastructureServiceSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryApplications = {},
            constraintApplications = {},
            queryInfrastructureServices = {},
            constraintInfrastructureServices = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryInfrastructureServices?: QueryStatement;
            constraintInfrastructureServices?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplicationInfrastructureService;
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetInfrastructureServices: AppHealthInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationInfrastructureService;
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetInfrastructureServices: AppHealthInfrastructureService[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryApplications,
                    constraintApplications,
                    queryInfrastructureServices,
                    constraintInfrastructureServices,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationInfrastructureServiceSubject$.next(data.object);
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.infrastructureServiceService.infrastructureServicesSubject$.next(data.appHealthGetInfrastructureServices);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationInfrastructureService;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationInfrastructureService;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationInfrastructureServiceSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplicationInfrastructureService[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationInfrastuctureServicesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryApplications = {},
            constraintApplications = {},
            queryInfrastructureServices = {},
            constraintInfrastructureServices = {},
            headers = {},
        }: {
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryInfrastructureServices?: QueryStatement;
            constraintInfrastructureServices?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetInfrastructureServices: AppHealthInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetInfrastructureServices: AppHealthInfrastructureService[];
            }>({
                query    : getRelations,
                variables: {
                    queryApplications,
                    constraintApplications,
                    queryInfrastructureServices,
                    constraintInfrastructureServices,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.infrastructureServiceService.infrastructureServicesSubject$.next(data.appHealthGetInfrastructureServices);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthCreateApplicationInfrastructureService;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationInfrastructureServiceById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationInfrastuctureServices;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}