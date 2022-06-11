import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Injectable()
@Resolver()
export class AppResolver {
  constructor() {}
  @Query(() => String)
  async getRoot(): Promise<string> {
    return 'All Systems Operational.<br/>200 OK';
  }
}