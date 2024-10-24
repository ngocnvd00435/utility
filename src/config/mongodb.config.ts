// src/config/mongodb.config.ts

import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';

export const MongoDbProvider = MongooseModule.forRoot('mongodb://utility:RyB4h8SDSjmd6Gjb@192.168.90.33:27017/utility', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
