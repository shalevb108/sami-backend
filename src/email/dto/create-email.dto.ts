
import { createZodDto } from 'nestjs-zod';
import { EmailSchema } from 'src/models/email.model';

export class CreateEmailDto extends createZodDto(
  EmailSchema
) {}
