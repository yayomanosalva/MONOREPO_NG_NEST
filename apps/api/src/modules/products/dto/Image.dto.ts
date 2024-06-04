import { IsString, IsBoolean } from 'class-validator';

export class ImageDTO {
  @IsString()
  url: string;

  @IsString()
  alt: string;

  @IsBoolean()
  feature: boolean;
}
