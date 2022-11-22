import { SetMetadata } from '@nestjs/common'

export const NoAuth = () => SetMetadata('no-auth', true);

export const NoRootAuth = () => SetMetadata('no-root-auth', true);