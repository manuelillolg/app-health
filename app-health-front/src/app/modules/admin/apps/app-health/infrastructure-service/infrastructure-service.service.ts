import { AppHealthCreateInfrastructureService, AppHealthInfrastructureProvider, AppHealthInfrastructureService, AppHealthUpdateInfrastructureServiceById, AppHealthUpdateInfrastructureServices } from '../app-health.types';
import { InfrastructureProviderService } from '../infrastructure-provider/infrastructure-provider.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './infrastructure-service.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InfrastructureServiceService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthInfrastructureService> | null> = new BehaviorSubject(null);
    infrastructureServiceSubject$: BehaviorSubject<AppHealthInfrastructureService | null> = new BehaviorSubject(null);
    infrastructureServicesSubject$: BehaviorSubject<AppHealthInfrastructureService[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly infrastructureProviderService: InfrastructureProviderService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthInfrastructureService>>
    {
        return this.paginationSubject$.asObservable();
    }

    get infrastructureService$(): Observable<AppHealthInfrastructureService>
    {
        return this.infrastructureServiceSubject$.asObservable();
    }

    get infrastructureServices$(): Observable<AppHealthInfrastructureService[]>
    {
        return this.infrastructureServicesSubject$.asObservable();
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
    ): Observable<GridData<AppHealthInfrastructureService>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthInfrastructureService>; }>({
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
        object: AppHealthInfrastructureService;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthInfrastructureService;
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
                    this.infrastructureServiceSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryInfrastructureProviders = {},
            constraintInfrastructureProviders = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryInfrastructureProviders?: QueryStatement;
            constraintInfrastructureProviders?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthInfrastructureService;
        appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthInfrastructureService;
                appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryInfrastructureProviders,
                    constraintInfrastructureProviders,
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
                    this.infrastructureServiceSubject$.next(data.object);
                    this.infrastructureProviderService.infrastructureProvidersSubject$.next(data.appHealthGetInfrastructureProviders);
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
        object: AppHealthInfrastructureService;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthInfrastructureService;
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
                    this.infrastructureServiceSubject$.next(data.object);
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
        objects: AppHealthInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthInfrastructureService[];
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
                    this.infrastructureServicesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryInfrastructureProviders = {},
            constraintInfrastructureProviders = {},
            headers = {},
        }: {
            queryInfrastructureProviders?: QueryStatement;
            constraintInfrastructureProviders?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
            }>({
                query    : getRelations,
                variables: {
                    queryInfrastructureProviders,
                    constraintInfrastructureProviders,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.infrastructureProviderService.infrastructureProvidersSubject$.next(data.appHealthGetInfrastructureProviders);
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
            object?: AppHealthCreateInfrastructureService;
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
            object?: AppHealthUpdateInfrastructureServiceById;
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
            object?: AppHealthUpdateInfrastructureServices;
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