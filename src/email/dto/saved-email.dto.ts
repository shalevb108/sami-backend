
import { createZodDto } from 'nestjs-zod';
import { SavedEmail, SavedEmailSchema } from 'src/models/email.model';

export class SavedEmailDto extends createZodDto(
  SavedEmailSchema
) {}
