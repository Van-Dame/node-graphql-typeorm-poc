export type Resolver = (parent: any, args: any, context: any, info: any) => Promise<any> | any;

export interface IResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
