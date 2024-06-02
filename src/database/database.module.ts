import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongoClient } from 'mongodb';
import { databaseProviders } from './database.provider.js';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class MongoDBModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(): Promise<any> {
    const connection = this.moduleRef.get<MongoClient>('DATABASE_CLIENT');
    if (connection) {
      await connection.close();
      console.log('MongoDB connection closed.');
    }
  }
}
