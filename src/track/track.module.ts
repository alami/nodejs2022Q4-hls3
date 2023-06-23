import { TracksController } from './tracks.controller';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TrackModule {}
