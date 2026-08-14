import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  TODO = 'To Do',
  DOING = 'Doing',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
  NO_PRIORITY = 'No Priority',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ type: String, enum: TaskPriority, default: TaskPriority.LOW })
  priority: TaskPriority;

  @Prop()
  dueDate?: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  assignees: User[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
