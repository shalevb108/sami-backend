import { Inject } from '@nestjs/common';

// export const InjectDB = (collection: string) => Inject('DATABASE_CONNECTION');
export const InjectMongoDB = () => Inject('DATABASE_CONNECTION');
