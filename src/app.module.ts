import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { LocalsModule } from './locals/locals.module';
import { PeopleModule } from './people/people.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [UsersModule, ProfilesModule, LocalsModule, PeopleModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
