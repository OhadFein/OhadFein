import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Skip = (): CustomDecorator => SetMetadata('skip', '1');
