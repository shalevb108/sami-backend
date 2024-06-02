import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { Collection, Db, ObjectId } from 'mongodb';
import { InjectMongoDB } from '../database/injectDatabase.decorator';

@Injectable()
export class UsersService {
  private usersModel: Collection<Omit<User, '_id'>>;
  constructor(@InjectMongoDB() private readonly db: Db) {
    this.usersModel = this.db.collection('users');
  }

  async getAll() {
    try {
      const users = await this.usersModel.find().toArray(); 
      return users;
    } catch (e) {
      throw new Error('Error getting users');
    }
  }

  async findOne(username:string, password:string) {
    console.log('====================================');
    console.log(username, password);
    console.log('====================================');
    try {
      const user = await this.usersModel.findOne({ username: username });
      
      if (!user) {
          console.log('User not found');
          return null;
      }
      
            
      if (password === user.password) {
          console.log('Authentication successful');
          console.log(user); 
          return user; 
      } else {
          console.log('Authentication failed');
          return null;
      }
  } catch (e) {
      throw new Error('Error getting user');
  }
  }

}
